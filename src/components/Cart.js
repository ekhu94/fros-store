import React, { useState, useEffect, useRef } from 'react'
import Checkout from './Checkout'
import * as cookie from '../services/cookies'
import './Cart.css';

// import { Link } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react'
import { Table } from 'react-bootstrap'
import COModal from './COModal'
import PurchaseModal from './PurchaseModal'

export default function Cart({allCloths, user}) {

    const [itemObj, setItemObj] = useState({...cookie.getCartCookie()})
    const [itemsInCart, setItemsInCart] = useState([])
    const [total, setTotal] = useState(0.00)
    const itemIDs = Object.keys(itemObj)
    const [checkout, setCheckout] = useState(false);
    const [showCOModal, setShowCOModal] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false)

    //? Probably don't need this anymore
    const checkoutBtn = useRef();

    useEffect(() => {
        const items = [];
        allCloths.map(item => itemIDs.map(id=> item.id==id && items.push(item)));
        setItemsInCart(items);
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
        if (parseFloat(total) > 0 && user.id) {
            setCheckout(true);
        } else if (parseFloat(total) > 0 && !user.id){
            setShowCOModal(true)
        }
        else {
            window.history.pushState({}, '', '/all');
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
                        style={{ border: 'none', borderRadius: '6px' }}
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
            {!itemsInCart.length ?
                <>
                    <h4 className="text-center pt-5">
                        Your cart is currently empty
                    </h4>
                    <div className="row justify-content-center">
                    <Button
                        id="checkoutBtn"
                        ref={checkoutBtn}
                        className="mt-4 col-8 col-sm-6 col-md-4 col-lg-3"
                        secondary onClick={onCheckoutClick}
                    >
                        Continue Shopping
                    </Button>
                    </div>
                </>
            :
            <Table responsive className="mt-5">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th className="d-none d-sm-table-cell"></th>
                        <th>Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center d-table-cell d-md-none">Update</th>
                        <th className="text-center d-none d-md-table-cell">Update Qty</th>
                        <th className="text-center">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsInCart.map(item=> renderRow(item))}
                </tbody>
            </Table>
            }

            <div className="row justify-content-center justify-content-md-end my-4">
                {checkout || !itemsInCart.length ? null :
                <>
                    <h2 className="col-10 col-md-4 col-lg-3 text-center text-sm-right">{`Total: $${total}`}</h2>
                    <Button
                        id="checkoutBtn"
                        ref={checkoutBtn}
                        className=" col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3 mt-1"
                        secondary onClick={onCheckoutClick}

                    >
                        Checkout
                    </Button>
                </>
                }
            </div>
            { checkout && user && parseFloat(total) > 0 ? <Checkout showPurchaseModal={showPurchaseModal} setShowPurchaseModal={setShowPurchaseModal} itemObj={itemObj} setItemObj={setItemObj} itemsInCart={itemsInCart} total={total} user={user} /> : null }    
            <COModal showCOModal={showCOModal} setShowCOModal={setShowCOModal} />
            <PurchaseModal showPurchaseModal={showPurchaseModal} setShowPurchaseModal={setShowPurchaseModal}/>
        </div>
    )
}
