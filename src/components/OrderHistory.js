import React, { useState, useEffect} from 'react'
import { Image, Button } from 'semantic-ui-react'
import { Table } from 'react-bootstrap'
import {api} from '../services/api'
import './Cart.css';

export default function OrderHistory({user}) {

    const [carts, setCarts] = useState([])

    useEffect(() => {
        setCarts(user.carts)
        return () => {
            
        }
    }, [])


    const renderCart = cart =>{
        return (
            <tr key={cart.id} className="align-middle">
                <td className="text-center">{cart.total}</td>
                <td className="text-center">{cart.created_at.split('T')[0]}</td>
            </tr>
        )
    }

return (
<div className='ui container'>
    {!carts.length ?
        <>
            <h4 className="text-center pt-5">
                You haven't made any order yet
            </h4>
            <div className="row justify-content-center">
            <Button
                id="checkoutBtn"
                className="mt-4 col-8 col-sm-6 col-md-4 col-lg-3"
                secondary onClick={()=>{
                    window.history.pushState({}, '', '/show');
                    window.location.reload();
                }}
            >
                Start Shopping
            </Button>
            </div>
        </>
    :
    <Table responsive className="mt-3">
        <thead >
            <tr>
                <th className="text-center">Total</th>
                <th className="text-center">Date of Purchase</th>
            </tr>
        </thead>
        <tbody>
            {carts.map(cart=> renderCart(cart))}
        </tbody>
    </Table>
    }

        <div className="row justify-content-center justify-content-md-end my-4">
        </div>
    </div>
    )
}
