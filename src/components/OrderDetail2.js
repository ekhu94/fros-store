import React, { useState } from 'react'
import { Collapse, Table , Button, Accordion} from 'react-bootstrap'
import { api } from '../services/api'

export default function OrderDetail({ cart, selected, setSelected, allCloths}) {

    const renderItem = item =>(
        <>
            <tr>
                <td className='text-center'>{allCloths.find(cloth => cloth.id===item.inventory_id).name}</td>
                <td className='text-center'>{item.quantity}</td>
            </tr>
        </>
    )

    const deleteHandle = id =>{
        api.cart.deleteCartRecord(id)
        .then(r=>{
            alert(r.message)
            window.history.pushState({},'','/orders')
            window.location.reload()
        })
    }

    return (
        <>
            <Accordion.Toggle
                as={'tr'} 
                key={cart.id} 
                className="align-middle"
            >
                <td className="text-center">{cart.created_at.split('T')[0]}</td>
                <td className="text-center">$ {cart.total}</td>
                <td className="text-center">
                    {selected!==cart.id ?
                        <Button 
                            variant="dark"
                            onClick={()=>{setSelected(cart.id)}}
                        >
                            Details
                        </Button> :
                        <Button 
                            variant="dark"
                            onClick={()=>{setSelected('')}}
                        >
                            Hide
                        </Button> 
                    }   
                </td>
            </Accordion.Toggle>
            <Accordion.Collapse in={selected===cart.id}>
                <div className='d-flex me-auto justify-content-evenly'>
                <tr>
                    <th className="text-center">Name</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center"></th>
                    {cart.items.map(item=>renderItem(item))}
                </tr>
                <div style={{transform:'translateY(50%)'}}>
                    <Button
                        onClick={()=>deleteHandle(cart.id)}
                        size='md'
                        variant="dark"
                    >
                        Delete
                    </Button>
                </div>
                </div>
            </Accordion.Collapse>
            
        </>
    )
}
