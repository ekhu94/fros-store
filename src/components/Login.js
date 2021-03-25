import React from 'react';
import { api } from '../services/api';

const Login = () => {

    const onFormSubmit = e => {
        e.preventDefault();
        
    }

    return (
        <div>
            <form
                className="ui form"
                onSubmit = {onFormSubmit}
            >
                <div className="field">
                    <input type="text" name="email" placeholder="Email Address" />
                </div>
                <div className="field">
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button className="ui button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;