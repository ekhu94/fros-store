import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Paypal from './Paypal';
import PurchaseModal from './PurchaseModal';
import { api } from '../services/api'
import Cookies from 'js-cookie';

const Checkout = ({ itemObj, itemsInCart, setItemObj, total, user, showPurchaseModal, setShowPurchaseModal }) => {


    const onPaySubmit = async e => {
        e.preventDefault();
        const newCartRecord = {
            cart:{
                user_id: user.id,
                total
            }
        }
        let cartId;
        //! some axios to create cart
        await api.cart.createCartRecord(newCartRecord).then(data => cartId = data.id)
        for(let item of itemsInCart){
            //! a shit ton of axios
            const newItemRecord = {
                item:{
                    cart_id: cartId,
                    inventory_id: item.id,
                    quantity: itemObj[item.id]
                }
            };
            await api.item.createItemRecord(newItemRecord)
        }
        //! Message, redirect, clear cookies and carts,
        setItemObj({})
        setShowPurchaseModal(true)
    };

    return (
        <div className="container" onSubmit={onPaySubmit}>
            <h1 className="text-center">Shipping Information</h1>
            <Form>
                <div className="row justify-content-center mt-1">
                    <Form.Group controlId="formFirstName" className="col-10 col-md-6">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="col-10 col-md-6">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" />
                    </Form.Group>
                </div>
                <div className="row justify-content-center mt-1">
                    <Form.Group controlId="formCompany" className="col-10 col-md-12">
                        <Form.Label>Company (optional)</Form.Label>
                        <Form.Control type="text" name="company" />
                    </Form.Group>
                </div>
                <div className="row justify-content-center mt-1">
                    <Form.Group controlId="formAddress1" className="col-10 col-md-6">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address1" />
                    </Form.Group>
                    <Form.Group controlId="formAddress2" className="col-10 col-md-6">
                        <Form.Label>Apartment, suite, etc. (optional)</Form.Label>
                        <Form.Control type="text" name="address2" />
                    </Form.Group>
                </div>
                <div className="row justify-content-center mt-1">
                    <Form.Group controlId="formCity" className="col-10 col-md-4">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" />
                    </Form.Group>
                    <Form.Group controlId="formState" className="col-5 col-md-4">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formZipcode" className="col-5 col-md-4">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control type="text" name="zipcode" />
                    </Form.Group>
                </div>
                <div className="row justify-content-center mt-1">
                    <Form.Group controlId="formCreditCard" className="col-4 col-md-6">
                        <Form.Label>Credit/Debit</Form.Label>
                        <Form.Control type="text" name="cardNumber" placeholder="Card number" />
                    </Form.Group>
                    <Form.Group controlId="formExpDate" className="col-3">
                        <Form.Label>Exp Date</Form.Label>
                        <Form.Control type="text" name="expDate" placeholder="MM/YY" />
                    </Form.Group>
                    <Form.Group controlId="formCVC" className="col-3">
                        <Form.Label>CVC</Form.Label>
                        <Form.Control type="password" name="CVC" />
                    </Form.Group>
                </div>
                <div className="row justify-content-center align-items-center my-5">
                    <h3 className="col-10 col-md-5 text-center mb-4 mb-md-0">Your total is <span style={{fontWeight: 'bold'}}>${total}</span>. Place order?</h3>
                    <Button className="col-7 col-md-4 py-3" style={{fontWeight: 'bold', borderRadius: '8px'}} variant="dark" type="submit" >
                        Confirm
                    </Button>
                </div>
                <div className="row justify-content-center my-5">
                    <h3 className="col-10 text-center">Pay with PayPal?</h3>
                    <div className="col-10 text-center my-3">
                        <Paypal total={total} />
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default Checkout;