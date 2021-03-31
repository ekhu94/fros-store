import React from 'react'

export default function OrderHistory({user}) {

    const renderHistory = carts =>{
        return carts.map(cart => <div><p>{cart.total}  {cart.created_at}</p></div>)
    }
    return (
        <div>
            <h1>Hello {user.username}</h1>
            {renderHistory(user.carts)}
        </div>
    )
}
