import React, { useState, useEffect} from 'react'
import { Image, Button } from 'semantic-ui-react'
import { Table, Accordion } from 'react-bootstrap'
import {api} from '../services/api'
import './Cart.css';
import OrderDetail from './OrderDetail'

export default function OrderHistory({ user, allCloths }) {

    const [carts, setCarts] = useState([])
    const [selected, setSelected] = useState('')

    useEffect(() => {
        setCarts(user.carts)
        return () => {
            
        }
    }, [])


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
                        <th className="text-center">Date of Purchase</th>
                        <th className="text-center">Total</th>
                        <th className="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(cart=> <OrderDetail allCloths={allCloths} cart={cart} selected={selected} setSelected={setSelected}/>)}
                </tbody>
            </Table>
            }
        </div>
    )
}
