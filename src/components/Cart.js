import React, { useState, useEffect, useRef } from 'react'
import Checkout from './Checkout'
import * as cookie from '../services/cookies'

// import { Link } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react'
import { Table } from 'react-bootstrap'

export default function Cart({allCloths, user}) {

    const [itemObj, setItemObj] = useState({...cookie.getCartCookie()})
    const [itemsInCart, setItemInCart] = useState([])
    const [total, setTotal] = useState(0.00)
    const itemIDs = Object.keys(itemObj)

    //TODO use this boolean to begin checkout process...maybe
    const [checkout, setCheckout] = useState(false);

    const checkoutBtn = useRef();

    useEffect(() => {
        const items = [];
        allCloths.map(item => itemIDs.map(id=> item.id==id && items.push(item)));
        setItemInCart(items);
        return () => {
        }
    }, [itemObj, allCloths])

    useEffect(() => {
        const newTotal = itemsInCart.map(item => itemObj[item.id]*item.price).reduce((a,b)=>a+b, 0).toFixed(2);
        setTotal(newTotal);
        cookie.setCartCookie(itemObj)
        return () => {
        };
    }, [itemsInCart, itemObj])

    const handleQuantity = (e, item) =>{
        if(e.target.innerText==='-'){
            console.log('hello')
            setItemObj({...itemObj,[item.id]:itemObj[item.id]-1})
        } else if (e.target.innerText==='+'){
            setItemObj({...itemObj,[item.id]:itemObj[item.id]+1})
        }
    }

    const removeHandle = item =>{
        let updateObj = {...itemObj}
        delete updateObj[item.id]
        setItemObj(updateObj)
        if (parseFloat(total) <= 0) {
            setCheckout(false);
            checkoutBtn.current.classList.remove('disabled');
        }
    }

    const onCheckoutClick = () => {
        if (parseFloat(total) > 0) {
            setCheckout(true);
        } else {
            window.history.pushState({}, '', '/show');
            window.location.reload();
        }
    }

    const renderRow = item =>{
        return(
            <tr key={item.id} className="align-middle">
                <td className="d-none d-sm-table-cell">
                    
                    <Image src={item.front_URL} alt={item.name} size='mini' />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td className="text-center">{itemObj[item.id]}</td>
                <td className="text-center">
                    <Button.Group>
                        {itemObj[item.id]<=1 ?
                        <Button disabled color="black" compact>
                            -
                        </Button> :
                        <Button 
                            color="black"
                            onClick={(e)=>handleQuantity(e, item)}
                            compact
                        >
                            -
                        </Button>}
                        <Button
                            color="black"
                            onClick={(e)=>handleQuantity(e, item)}
                            compact
                        >
                            +
                        </Button>
                    </Button.Group>
                </td>
                <td className="text-center">
                    <div
                        className="btn btn-outline-danger"
                        style={{ border:'none', borderRadius: '6px' }}
                        onClick={()=>removeHandle(item)}
                    >
                        <i className="cart arrow down icon"></i>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <div className='ui container'>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th className="d-none d-sm-table-cell"></th>
                        <th>Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="d-table-cell d-md-none"></th>
                        <th className="text-center d-none d-md-table-cell">Change Qty</th>
                        <th className="text-center">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsInCart.map(item=> renderRow(item))}
                </tbody>
            </Table>

            <div className="row justify-content-center justify-content-md-end my-4">
                {checkout ? null :
                <>
                    <h2 className="col-10 col-md-4 col-lg-3 text-center text-sm-right">{parseFloat(total) > 0 ? `Total: $${total}` : 'Your shopping cart is empty'}</h2>
                    <Button
                        ref={checkoutBtn}
                        className=" col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3 mt-1"
                        secondary onClick={onCheckoutClick}

                    >
                        { parseFloat(total) > 0 ? 'Checkout' : 'Keep Shopping' }
                    </Button>
                </>
                }
            </div>
            { checkout && user && parseFloat(total) > 0 ? <Checkout itemObj={itemObj} itemsInCart={itemsInCart} total={total} user={user} /> : null }
        </div>
    )
}
