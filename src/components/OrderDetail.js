import React, { useState } from 'react'
import { Collapse, Table, Accordion} from 'react-bootstrap'
import { Button, Icon } from 'semantic-ui-react';
import { api } from '../services/api'
import './OrderDetail.css';

export default function OrderDetail({ cart, selected, setSelected, allCloths, showRemoveModal, setShowRemoveModal}) {
    

    const renderItem = item =>(
        <tr key={item.id} style={{fontSize: '0.9rem'}}>
            <td className='text-center py-4'>{allCloths.find(cloth => cloth.id===item.inventory_id).name}</td>
            <td className='text-center py-4'>{item.quantity}</td>
        </tr>
    )

    const deleteHandle = id =>{
        api.cart.deleteCartRecord(id)
        // .then(r=>{
        //     window.history.pushState({},'','/orders')
        //     window.location.reload()
        // })
        setShowRemoveModal(true)
    }

    const formatDate = date => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = parseInt(date.split('-')[0]);
        const month = parseInt(date.split('-')[1]);
        const day = parseInt(date.split('-')[2]);
        return `${monthNames[month - 1]} ${day}, ${year}`
    }

    return (
        <>
            <tr
                key={cart.id} 
                className="align-middle"
            >
                <td className="text-center py-3">{formatDate(cart.created_at.split('T')[0])}</td>
                <td className="text-center py-3">$ {cart.total.toFixed(2)}</td>
                <td className="text-center py-3">
                    {selected!==cart.id ?
                        <Button 
                            color="black"
                            id="detailsBtn"
                            onClick={()=>{setSelected(cart.id)}}
                        >
                            Details
                        </Button> :
                        <Button 
                            color="black"
                            id="hideBtn"
                            onClick={()=>{setSelected('')}}
                        >
                            Hide
                        </Button> 
                    }   
                </td>
            </tr>
            {selected == cart.id &&
            <>
            <tr className="align-middle" style={{fontSize: '1rem'}}>
                <th className="text-center">Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">

                    <Button id="deleteBtn" className="py-2" animated="vertical" style={{backgroundColor: '#AC3C2F', color: '#fff'}} onClick={()=>deleteHandle(cart.id)}>
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                            <Icon name={"window delete"} />
                        </Button.Content>
                    </Button>
                </th>
            </tr>
                {cart.items.map(item=>renderItem(item))}
            </>
            }
        </>
    )
}
