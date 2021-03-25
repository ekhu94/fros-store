import React from 'react';
import { api } from '../services/api';

const Signup = () => {

    const onFormSubmit = e => {
        e.preventDefault();
    };

    return (
        <div>
            <form
                className="ui form"
                onSubmit = {onFormSubmit}
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
                    <input type="password" name="password-confirmation" placeholder="Confirm Password" />
                </div>
                <button className="ui button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;