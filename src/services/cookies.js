import React from 'react'
import Cookies from 'js-cookie'

export const getCartCookie = () =>{
    const cartCookie = Cookies.get('cart');
    if (cartCookie === undefined){
        return {};
    } else {
        return JSON.parse(cartCookie);
    }
}

export const setCartCookie = cart =>{
    Cookies.remove('cart');
    Cookies.set('cart', cart, { expires: 14});
}

export const removeCartCookie = () =>{
    Cookies.remove('cart')
}