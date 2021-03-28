import React, { useState } from 'react';
import { api } from '../services/api';

const Login = ({ onLogin }) => {
    const [error, setError] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        const newUser = {
            email_address: emailAddress,
            password
        };
        api.auth.login(newUser)
            .then(res => onLogin(res));
    }

    return (
        <div>
            <form
                className="ui form"
                onSubmit = {onFormSubmit}
            >
                <div className="field">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={emailAddress}
                        onChange={e => setEmailAddress(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="ui button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;