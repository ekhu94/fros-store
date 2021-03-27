import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios'

import Login from './Login';
import MainNav from './MainNav';
import Signup from './Signup';
import ClothingContainer from './ClothingContainer'
//! I know i know moving to api.js soon
const ALL_CLOTHING_URL = 'http://localhost:3000/api/v1/inventories'

const App = () => {

    const [onView, setOnView] = useState([])
    const [allCloth, setAllCloth] = useState([])

    useEffect(()=>{
        loadAll()
    },[])
//!This as well ok b?
    const loadAll = async() =>{
        await axios(ALL_CLOTHING_URL)
        .then(r => setAllCloth(r.data))
    }

    const setMens = () =>{
        setOnView(allCloth.filter( item => item.mens ))
    }

    const setWomens = () =>{
        setOnView(allCloth.filter( item => !item.mens ))
    }

    return (
        <div>
            <Router>
                <MainNav setMens={setMens} setWomens={setWomens}/>
                <div className="ui container">
                    <Route path="/show" render={()=> <ClothingContainer onView={allCloth}/>} />
                    <Route path="/mens" render={()=> <ClothingContainer onView={onView} />} />
                    <Route path="/womens" render={()=> <ClothingContainer onView={onView} />} />
                    <Route path="/signup" render={() => <Signup />} />
                    <Route path="/login" render={() => <Login />} />
                </div>
            </Router>
        </div>
    );
};

export default App;