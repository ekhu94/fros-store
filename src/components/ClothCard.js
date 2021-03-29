import React, { useState } from 'react'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as cookie from '../services/cookies'

export default function ClothCard({cloth}) {

    const [front, setFront] = useState(true)

    const addCartHandle = id => {
        let cart = cookie.getCartCookie()
        console.log(Object.keys(cart).includes(JSON.stringify(id)))
        console.log(id)
        if (Object.keys(cart).includes(JSON.stringify(id))){
            cart[id]++
        } else {
            cart[id]=1
        }
        cookie.setCartCookie(cart)
        console.log(cookie.getCartCookie())
    }
    return (
        <div>
            {console.log(cloth)}
        <h1>{cloth.name}</h1>
        <Grid stackable columns={3}>
            <Grid.Column width={1} >
                <Image 
                    size='mini'
                    src={cloth.front_URL}
                    onClick={()=>setFront(true)}
                />
                <Image
                    size='mini'
                    src={cloth.back_URL}
                    onClick={()=>setFront(false)}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <Image 
                    size='big'
                    src={front ? cloth.front_URL : cloth.back_URL}
                />
            </Grid.Column>
            <Grid.Column>
                <p>${cloth.price}</p>
                <Button 
                    onClick={()=>addCartHandle(cloth.id)}
                    icon 
                    labelPosition='right'>
                    Add to cart
                    <Icon name='cart plus'/>
                </Button>
                <Link to='/show'>
                <Button icon labelPosition='right'>
                    Back as link because how the route was set up it's not working as well
                    <Icon name='undo' />
                </Button>
                </Link>
                <Button onClick={()=>window.history.back()} icon labelPosition='right'>
                    Back using window.history.back I also like this better
                    <Icon name='undo' />
                </Button>
            </Grid.Column>
        </Grid>
        </div>
    )
}
