import React, { useState,useEffect } from 'react'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import './ClothCard.css'
import * as cookie from '../services/cookies'

import AddModal from './AddModal'

export default function ClothCard({clothId}) {

    const [front, setFront] = useState(true)
    const [show, setShow] = useState(null)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        api.cloths.getOneCloth(clothId)
        .then(data => setShow(data))
    }, [])

    const addCartHandle = id => {
        let cart = cookie.getCartCookie()
        if (Object.keys(cart).includes(JSON.stringify(id))){
            cart[id]++
        } else {
            cart[id]=1
        }
        cookie.setCartCookie(cart)
        // console.log(cookie.getCartCookie())
        setShowModal(true)
    }

    const renderCard = cloth => (
        <Container className="py-5">
            <Row className="justify-content-center pt-1">
                <Image 
                    size='large'
                    alt={cloth.name}
                    src={front ? cloth.front_URL : cloth.back_URL}
                    className="col-10 col-sm-4 col-lg-4"
                />
                <div className="col-10 col-sm-6 col-lg-6">
                    <div className="row justify-content-center justify-content-lg-start">
                        <div className="col-0 col-lg-2"></div>
                        <div className="col-12 col-lg-10">
                            <h1 className="mt-5 mt-lg-0 mb-lg-4 text-center text-lg-start">{cloth.name}</h1>
                            <h3 className="mt-4 mt-lg-0 text-center text-lg-start">${cloth.price}</h3>
                            <h4 className="mt-4 text-center text-lg-start">One size fits most</h4>
                        </div>
                    </div>
                    <div className="row justify-content-center my-5">
                        <Image 
                            size='tiny'
                            style={{maxHeight: '140px'}}
                            src={cloth.front_URL}
                            alt={cloth.name}
                            onClick={()=>setFront(true)}
                        />
                        <Image
                            size='tiny'
                            style={{maxHeight: '140px'}}
                            src={cloth.back_URL}
                            alt={cloth.name}
                            onClick={()=>setFront(false)}
                        />
                    </div>
                    
                    <div className="row my-5 justify-content-center align-items-center">
                        <Button
                            onClick={()=>addCartHandle(cloth.id)}
                            icon
                            id="addBtn"
                            color="black"
                            labelPosition='right'
                            className="col-6 col-sm-6 col-md-6 col-lg-5 col-xl-4 mb-4"
                        >
                            Add <span className="d-none d-lg-inline-flex">to Cart</span>
                            <Icon name='cart plus'/>
                        </Button>
                        <div className="col-0 col-lg-1"></div>
                        <Button
                            onClick={()=>window.history.back()}
                            icon labelPosition='right'
                            basic
                            id="backBtn"
                            color="red"
                            className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4"
                        >
                            Back
                            <Icon name='undo' />
                        </Button>
                    </div>
                </div>
            </Row>
            <AddModal showModal={showModal} setShowModal={setShowModal}/>
        </Container>
    )

    // <h1>{cloth.name}</h1>
    //     <Grid stackable columns={3}>
    //         <Grid.Column width={1} >
    //             <Image 
    //                 size='mini'
    //                 src={cloth.front_URL}
    //                 onClick={()=>setFront(true)}
    //             />
    //             <Image
    //                 size='mini'
    //                 src={cloth.back_URL}
    //                 onClick={()=>setFront(false)}
    //             />
    //         </Grid.Column>
    //         <Grid.Column width={6}>
    //             <Image 
    //                 size='big'
    //                 src={front ? cloth.front_URL : cloth.back_URL}
    //             />
    //         </Grid.Column>
    //         <Grid.Column>
    //             <p>${cloth.price}</p>
    //             <Button 
    //                 onClick={()=>addCartHandle(cloth.id)}
    //                 icon 
    //                 labelPosition='right'>
    //                 Add to cart
    //                 <Icon name='cart plus'/>
    //             </Button>
    //             <Link to='/show'>
    //             <Button icon labelPosition='right'>
    //                 Back as link because how the route was set up it's not working as well
    //                 <Icon name='undo' />
    //             </Button>
    //             </Link>
    //             <Button onClick={()=>window.history.back()} icon labelPosition='right'>
    //                 Back using window.history.back I also like this better
    //                 <Icon name='undo' />
    //             </Button>
    //         </Grid.Column>
    //     </Grid>

    return (
        <div>
           {show && renderCard(show)}
        </div>
    )
}
