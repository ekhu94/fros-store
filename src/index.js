import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

// TODO implement Provider component from redux....maybe?

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#root')
);