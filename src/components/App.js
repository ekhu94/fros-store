import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import { api } from '../services/api';

import Login from './Login';
import MainNav from './MainNav';
import Signup from './Signup';
import ClothingContainer from './ClothingContainer'
import ClothCard from './ClothCard'


const App = () => {

    const [onView, setOnView] = useState([])
    const [allCloths, setAllCloths] = useState([])
    const [auth, setAuth] = useState({ user: {} });

    useEffect(() => {
        //! this replaces prior loadAll function, need to check
        api.cloths.getCloths();

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
            }));
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

    return (
        <div>
            <MainNav />
            <div className="ui container">
                <Route exact path="/show" render={()=> <ClothingContainer cloth={allCloths} />} />
                {/*  There's proplly a better way to render these */}
                <Route path="/mens" render={()=> {
                    setOnView('mens')
                    return <ClothingContainer cloth={allCloths} onView={onView}/>}
                    }
                />
                <Route path="/womens" render={()=>{
                    setOnView('womens')
                    return <ClothingContainer cloth={allCloths} onView={onView} />}
                    }
                />
                <Route path='/show/:id' render={(routerProps)=> {
                    let cloth = allCloths.find(cloth => cloth.id == routerProps.match.params.id)
                    console.log(allCloths)
                    console.log(routerProps)
                    return <ClothCard cloth={cloth} />}
                    } 
                />
                <Route path="/signup" render={() => <Signup onSignup={onSignup} />} />
                <Route path="/login" render={() => <Login onLogin={onLogin} />} />
            </div>
        </div>
    );
};

export default App;