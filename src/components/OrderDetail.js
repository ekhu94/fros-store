import React, { useState } from 'react'
import { Collapse, Table , Button, Accordion} from 'react-bootstrap'
import { api } from '../services/api'

export default function OrderDetail({ cart, selected, setSelected, allCloths}) {

    const renderItem = item =>(
        <>
            <tr key={item.id}>
                <td className='text-center py-4'>{allCloths.find(cloth => cloth.id===item.inventory_id).name}</td>
                <td className='text-center py-4'>{item.quantity}</td>
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
            <tr
                key={cart.id} 
                className="align-middle"
            >
                <td className="text-center py-3">{cart.created_at.split('T')[0]}</td>
                <td className="text-center py-3">$ {cart.total}</td>
                <td className="text-center py-3">
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
            </tr>
            {selected == cart.id &&
            <>
            <tr className="align-middle">
                <th className="text-center">Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">
                    <Button
                    onClick={()=>deleteHandle(cart.id)}
                    size='sm'
                    variant="danger"
                >
                    delete
                </Button>
                </th>
            {/* <div style={{transform:'translateY(50%)'}}>
                
            </div> */}
            </tr>
                {cart.items.map(item=>renderItem(item))}
            </>
            }
    </>
    )
}
