import React from 'react';

const Login = () => {
    return (
        <div>
            <form className="ui form">
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