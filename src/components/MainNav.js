import React from "react";
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function MainNav() {

  return (

    <Menu stackable borderless>
        <Menu.Item header>RockYalTent</Menu.Item>
        <Link 
            to={'/'}
            className= 'ui item'
        >
            Home
        </Link>
        <Dropdown item text='Shop'>
            <Dropdown.Menu>
                <Link
                    className='ui item'
                    to='/show'
                >
                    All
                </Link>
                <Link
                    className='ui item'
                    to='/mens'
                >
                    Mens
                </Link>
                <Link
                    className='ui item'
                    to='/womens'
                >
                    Womens
                </Link>
            </Dropdown.Menu>
        </Dropdown>
        <Link
            to='/about'
            className='ui item'
        >
            About
        </Link>
        <Link to='/cart' className='ui item'>Cart-no functionality yet</Link>
        <Menu.Menu
            secondary
            position='right'
        >
            <Link 
                to='/login'
                className='ui item'
            >
                Login
            </Link>
            <Link 
                to='/signup'
                className='ui item'
            >
                Signup
            </Link>
        </Menu.Menu>
            
    </Menu>
  );
}
