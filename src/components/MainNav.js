import React from "react";
import { Link } from 'react-router-dom'

export default function MainNav({setMens}) {
  return (
    <div className="ui tiny menu">
        <div className='header item'>
            App title goes here
        </div>
        <a className='item'>
            Home
        </a>
        <div className='ui simple item dropdown'>
            Shop
            <div className='menu'>
                <Link to='/show' className='item'>All Clothing</Link>
                <Link to='#' className='item'>Women's</Link>
                <Link to='/mens' onClick={()=>setMens()} className='item'>Men's</Link>
            </div>
        </div>
        <a className='item'>
            Contact Us
        </a>
        <div className='ui text right menu'>
            <Link className="item" to='/login'>
                Login
            </Link>
            <Link className='item' to='/signup'>
                Signup
            </Link>
        </div>
    </div>
  );
}
