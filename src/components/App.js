import React, { useState, useEffect } from 'react';
import {  Route } from 'react-router-dom';

import axios from 'axios'

import Login from './Login';
import MainNav from './MainNav';
import Signup from './Signup';
import ClothingContainer from './ClothingContainer'
import ClothCard from './ClothCard'
//! I know i know moving to api.js soon
const ALL_CLOTHING_URL = 'http://localhost:3000/api/v1/inventories'

const App = () => {

    const [onView, setOnView] = useState([])
    const [allCloths, setAllCloths] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{
        loadAll()
    },[])
//!This as well ok b?
    const loadAll = async() =>{
        await axios(ALL_CLOTHING_URL)
        .then(r => setAllCloths(r.data))
    }


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
                <Route path="/signup" render={() => <Signup setUser={setUser}/>} />
                <Route path="/login" render={() => <Login />} />
            </div>
        </div>
    );
};

export default App;