import React, { useState } from 'react';
import { api } from '../services/api';
import { Form, Row, Button } from 'react-bootstrap';

const Login = ({ onLogin, routerProps }) => {
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
            .then(res => onLogin(res, routerProps));
    }

    return (
        <div className="container pt-5">
            <h1 className="mb-5 text-center" style={{letterSpacing: '0.5rem'}}>Login</h1>
            <Form onSubmit={onFormSubmit}>
                <Row className="justify-content-center align-items-center">
                    <div className="col-10 col-sm-5 col-lg-3 my-3">
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={e => setEmailAddress(e.target.value)}
                        />
                    </div>
                    <div className="col-10 col-sm-5 col-lg-3 my-3">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="dark"
                        size="lg"
                        block
                        style={{ borderRadius: '8px' }}
                        className="col-5 col-sm-4 col-lg-2 mt-4 mt-lg-3 mb-3"
                        type="submit"
                    >
                        Login
                    </Button>
                </Row>
            </Form>
        </div>



        // <div>
        //     <form
        //         className="ui form"
        //         onSubmit = {onFormSubmit}
        //     >
        //         <div className="field">
        //             <input
        //                 type="text"
        //                 name="email"
        //                 placeholder="Email Address"
        //                 value={emailAddress}
        //                 onChange={e => setEmailAddress(e.target.value)}
        //             />
        //         </div>
        //         <div className="field">
        //             <input
        //                 type="password"
        //                 name="password"
        //                 placeholder="Password"
        //                 value={password}
        //                 onChange={e => setPassword(e.target.value)}
        //             />
        //         </div>
        //         <button className="ui button" type="submit">Login</button>
        //     </form>
        // </div>
    );
};

export default Login;