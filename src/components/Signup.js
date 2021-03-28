import React from 'react';
import { api } from '../services/api';

const Signup = () => {

    const onFormSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: e.target.username.value,
            email_address: e.target.email.value,
            password: e.target.password.value,
            password_confirmation: e.target.passwordConfirmation.value
        }
        //! move this to /services/api eventually && use axios instead
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            })
        })
        .then(r => r.json())
        .then(e.target.reset()) 
    };

    return (
        <div>
            <form
                className="ui form"
                onSubmit={onFormSubmit}
            >
                <div className="field">
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div className="field">
                    <input type="text" name="email" placeholder="Email Address" />
                </div>
                <div className="field">
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="field">
                    <input type="password" name="passwordConfirmation" placeholder="Confirm Password" />
                </div>
                <button className="ui button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;