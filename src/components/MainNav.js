import React from "react";
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function MainNav({onLogout}) {

  return (

    <Menu stackable borderless>
        <Menu.Item header>RockYalTent</Menu.Item>
        <Link 
            to={'/'}
            exact="true"
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
        {localStorage.token && localStorage.token !== "undefined" ?
            <Menu.Menu
                secondary="true"
                position='right'
            >
                <Link
                    to='/cart'
                    className='ui item'
                >
                    <i className="shopping cart icon"></i>
                </Link>
                <Button
                    className='ui item'
                    onClick={()=>{
                        alert('User Logout Successful')
                        onLogout()
                    }}
                >
                    Logout
                </Button>
            </Menu.Menu> :
            <Menu.Menu
                secondary
                position='right'
            >
                <Link
                    to='/cart'
                    className='ui item'
                >
                    <i className="shopping cart icon"></i>
                </Link>
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
        }
            
    </Menu>
  );
}
