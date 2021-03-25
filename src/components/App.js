import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';

const App = () => {
    return (
        <div className="ui container">
            <Route path="/" />
            <Route path="/login" render={() => <Login />} />
        </div>
    );
};

export default App;