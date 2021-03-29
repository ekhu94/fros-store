import React, { useState } from 'react';
import { api } from '../services/api';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        const newUser = {
            username,
            email_address: emailAddress,
            password,
            password_confirmation: passwordConfirm
        }
        //! move this to /services/api eventually && use axios instead
        api.auth.signup(newUser)
            .then(res => onSignup(res))
    };

    return (
        <div>
            <form
                className="ui form"
                onSubmit={onFormSubmit}
            >
                <div className="field">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
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
                <div className="field">
                    <input
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button className="ui button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;