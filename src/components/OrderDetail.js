import React, { useState } from 'react'
import { Collapse, Table , Button} from 'react-bootstrap'
import './OrderDetail.css'

export default function OrderDetail({ cart, selected, setSelected, allCloths}) {

    const renderItem = item =>(
        <>
            <tr>
                <td className='text-center'>{allCloths.find(cloth => cloth.id===item.inventory_id).name}</td>
                <td className='text-center'>{item.quantity}</td>
            </tr>
        </>
    )

    return (
        <>
            <tr 
                key={cart.id} 
                className="align-middle"
            >
                <td className="text-center">{cart.created_at.split('T')[0]}</td>
                <td className="text-center">$ {cart.total}</td>
                <td className="text-center">
                    <Button 
                        variant="dark"
                        onClick={()=>{setSelected(cart.id)}}
                    >
                        Show details
                    </Button>{' '}
                </td>
            </tr>
            <Collapse in={selected==cart.id}>
                <div className='justify-content-center'>
                <div >
                    <th className="text-center">Name</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center"></th>
                    {cart.items.map(item=>renderItem(item))}
                </div>
                <Button variant="dark">Dark</Button>{' '}
                </div>
            </Collapse>
            
        </>
    )
}
