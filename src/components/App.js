import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import { api } from '../services/api';
import Cookies, { set } from 'js-cookie'
import './App.css';

import About from './About';
import Login from './Login';
import MainNav from './MainNav';
import Signup from './Signup';
import HomePage from './HomePage';
import Loader from './Loader';
import ClothingContainer from './ClothingContainer'
import ClothCard from './ClothCard'
import Cart from './Cart'
import OrderHistory from './OrderHistory';
import Footer from './Footer'
import AlertMessage from './AlertMessage';
import ScrollToTop from './ScrollToTop'

const App = () => {

    const [onView, setOnView] = useState('');
    const [allCloths, setAllCloths] = useState([]);
    const [auth, setAuth] = useState({ user: { carts : []} });
    const [showAlert, setShowAlert] = useState(false)
    const [alertObj, setAlertObj] = useState({variant:'', message:''})

    useEffect(() => {
        api.cloths.getCloths()
        .then(data=>setAllCloths(data))
        ;

         //! authentication to make sure you can access
        const token = localStorage.token;
        if (token) {
            api.auth.getCurrentUser()
            .then(data => setAuth({
                user: {
                    id: data.user.id,
                    username: data.user.username,
                    carts: data.user.carts
                }
            })
        )}
    }, []);

    useEffect(()=>{
        let delay = alertObj.variant==='danger' ? 10000 : 5000
        let timer = setTimeout(() => setShowAlert(false),delay)
        return ()=>{
            clearTimeout(timer)
        }
    },[alertObj]);

    const onLogin = (data, routerProps) => {
        //! authorization to make sure this is a user
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                user: {
                    id: data.user.id,
                    username: data.user.username,
                    carts: data.user.carts
                }
            });
            setAlertObj({
                variant: 'success',
                message: `Welcome back, ${data.user.username}!`
            })
            setShowAlert(true)
            routerProps.history.push('/');
        } else {
            setAlertObj({
                variant: 'danger',
                message: data.message
            })
            setShowAlert(true)
        }
    };

    const onSignup = ( data, routerProps ) => {
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                user: {
                    id: data.id,
                    username: data.username,
                    carts:[]
                }
            });
            setAlertObj({
                variant: 'success',
                message: 'Thanks for signing up. Welcome to FROS!'
            })
            setShowAlert(true)
            routerProps.history.push('/');
        } else {
            setAlertObj({
                variant: 'danger',
                message: data.error
            })
            setShowAlert(true)
        }
    };

    const onLogout = () => {
        setAlertObj({
            variant: 'success',
            message: 'User has successfully logged out.'
        })
        setShowAlert(true)
        localStorage.removeItem('token');
        Cookies.remove('cart')
        setAuth({...auth, user: {}});
        window.history.pushState({}, '', '/');
        window.location.reload();
    };

    const renderClothesOnLoad = (view=null) => {
        if (!allCloths.length) {
            return <Loader />
        }
        return <ClothingContainer cloth={allCloths} onView={view} />
    };

    const renderFourIdxs = () => {
        const idxs = [];
        while (idxs.length < 4) {
            let rand = Math.floor(Math.random() * 60)
            if (!idxs.includes(rand)) idxs.push(rand)
        }
        return idxs
    };

    const renderAlert = () =>{
        return <AlertMessage variant={alertObj.variant} message={alertObj.message} />
    }

    return (
        <div className="container-fluid p-0 custom-height">
            <ScrollToTop />
            <MainNav onLogout={onLogout} auth={auth} />
            <div className="main-container">
                <Route path='/about' render={() => <About />} />
                <Route path='/show/:id' render={(routerProps)=> {
                    return <ClothCard clothId={routerProps.match.params.id} />}
                    } 
                />
                <Route exact path="/all" render={() => renderClothesOnLoad()} />
                <Route path="/mens" render={()=> {
                    setOnView('mens')
                    return renderClothesOnLoad(onView)}
                    }
                />
                <Route path="/womens" render={()=>{
                    setOnView('womens')
                    return renderClothesOnLoad(onView)}
                    }
                />
                <Route path='/cart' render={()=> allCloths.length ? <Cart allCloths={allCloths} user={auth.user} /> : <Loader />} />
                <Route path='/orders' render={()=> allCloths.length ? <OrderHistory allCloths={allCloths} user={auth.user}/> : <Loader />} />
                <Route path="/signup" render={routerProps => <Signup onSignup={onSignup} routerProps={routerProps} showAlert={showAlert} renderAlert={renderAlert} />} />
                <Route path="/login" render={routerProps => <Login onLogin={onLogin} routerProps={routerProps} showAlert={showAlert} renderAlert={renderAlert} />} />
                <Route exact path="/" render={() => allCloths.length ? <HomePage idxs={renderFourIdxs()} cloth={allCloths} showAlert={showAlert} renderAlert={renderAlert} /> : <Loader />} />
            </div>
            <Footer />
        </div>
    );
};

export default App;