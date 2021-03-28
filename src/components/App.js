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
    const [user, setUser] = useState({});

    useEffect(()=>{
        //! this replaces prior loadAll function, need to check
        api.cloths.getCloths();
    },[]);

    const onLogin = data => {
        localStorage.setItem("token", data.jwt);
    };

    const onSignup = data => {

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