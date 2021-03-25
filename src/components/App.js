import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

const App = () => {
    return (
        <div className="ui container">
            <Route path="/" />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/login" render={() => <Login />} />
        </div>
    );
};

export default App;