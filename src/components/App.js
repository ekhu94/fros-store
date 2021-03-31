import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import { api } from '../services/api';
import Cookies from 'js-cookie'
import './App.css';

import Login from './Login';
import MainNav from './MainNav';
import Signup from './Signup';
import HomePage from './HomePage';
import Loader from './Loader';
import ClothingContainer from './ClothingContainer'
import ClothCard from './ClothCard'
import Cart from './Cart'

const App = () => {

    const [onView, setOnView] = useState('')
    const [allCloths, setAllCloths] = useState([])
    const [auth, setAuth] = useState({ user: {} });

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
                    username: data.user.username
                }
            })
        )}
    }, []);

    const onLogin = (data, routerProps) => {
        //! authorization to make sure this is a user
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                user: {
                    id: data.id,
                    username: data.username
                }
            });
            routerProps.history.push('/');
        } else {
            alert(`${data.message}`);
        }
    };
//! onLogin && onSignup can potentially combined into one function
    const onSignup = ( data, routerProps ) => {
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                user: {
                    id: data.id,
                    username: data.username
                }
            });
            routerProps.history.push('/');
        } else {
            alert(`${data.error}`);
        }
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        Cookies.remove('cart')
        setAuth({...auth, user: {}});
    };

    const renderClothesOnLoad = (view=null) => {
        if (!allCloths.length) {
            return <Loader />
        }
        return <ClothingContainer cloth={allCloths} onView={view} />
    };

    return (
        <div className="container-fluid p-0">
            <MainNav onLogout={onLogout} />
            <div className="main-container">
                <Route path='/show/:id' render={(routerProps)=> {
                    return <ClothCard clothId={routerProps.match.params.id} />}
                    } 
                />
                <Route exact path="/show" render={() => renderClothesOnLoad()} />
                {/* <Route path="/show" render={()=> <ClothingContainer cloth={allCloths} />} /> */}
                {/*  There's proplly a better way to render these */}
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
                <Route path="/signup" render={routerProps => <Signup onSignup={onSignup} routerProps={routerProps} />} />
                <Route path="/login" render={routerProps => <Login onLogin={onLogin} routerProps={routerProps} />} />
                <Route exact path="/" render={() => <HomePage clothes={allCloths} />} />
            </div>
        </div>
    );
};

export default App;