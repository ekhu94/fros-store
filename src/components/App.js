import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import { api } from '../services/api';
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
                ...auth,
                user: {
                    id: data.id,
                    username: data.username
                }
            }))
        }
    }, []);

    const onLogin = data => {
        //! authorization to make sure this is a user
        localStorage.setItem("token", data.jwt);
        setAuth({
            ...auth,
            user: {
                id: data.id,
                username: data.username
            }
        });
    };

    const onSignup = data => {
        localStorage.setItem("token", data.jwt);
        setAuth({
            ...auth,
            user: {
                id: data.id,
                username: data.username
            }
        });
    };

    const onLogout = () => {
        localStorage.removeItem('token');
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
                <Route path='/cart' render={()=> allCloths.length ? <Cart allCloths={allCloths}/> : <Loader />} />
                <Route path="/signup" render={routerProps => <Signup onSignup={onSignup} routerProps={routerProps} />} />
                <Route path="/login" render={routerProps => <Login onLogin={onLogin} routerProps={routerProps} />} />
                <Route exact path="/" render={() => <HomePage />} />
            </div>
        </div>
    );
};

export default App;