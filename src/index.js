import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
//* Bootstrap Dependencies
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#root')
);