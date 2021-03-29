import React, { useState, useEffect } from 'react'
import * as cookie from '../services/cookies'

import { Grid, Image, Button } from 'semantic-ui-react'

export default function Cart({allCloths}) {

    const [itemsInCart, setItemInCart] = useState(null)
    const [total, setTotal] = useState(0.00)

    useEffect(() => {
        setItemInCart(items)
        return () => {
        }
    }, [])

    const itemObj = {...cookie.getCartCookie()}
    const itemIDs = Object.keys(itemObj)
    const items = []
    allCloths.map(item => itemIDs.map(id=> item.id==id && items.push(item)))

    const renderRow = item =>{
        return(
            <Grid.Row>
                <Grid.Column>
                    <Image src={item.front_URL} />
                </Grid.Column>
                <Grid.Column>
                    <p>{item.name}</p>
                </Grid.Column>
                <Grid.Column>
                    <p>{item.price}</p>
                </Grid.Column>
                <Grid.Column>
                    {/* //! quantity */}
                    <p>{itemObj[item.id]}</p>
                </Grid.Column>
                <Grid.Column>
                    <Button>Remove</Button>
                </Grid.Column>
            </Grid.Row>
        )
    }

    return (
        <div className='ui container'>
            <Grid>
                {itemsInCart && itemsInCart.map(item=> renderRow(item))}
                <Grid.Row>
                    <Grid.Column >
                        <h1>Total: ${total}</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
