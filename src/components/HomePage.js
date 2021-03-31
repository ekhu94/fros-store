import React, { useState, useEffect } from 'react'
import HomeCarousel from './HomeCarousel'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Button, CardGroup, Card } from 'react-bootstrap';

import './HomePage.css';

export default function HomePage({ clothes }) {

    useEffect(() => {
        console.log(getFourCloths())
    }, [])

    const getFourCloths = () => {
        const output = [];
        while (output.length < 4) {
            let rand = Math.floor(Math.random() * 60);
            let cloth = clothes.find(c => clothes.indexOf(c) == rand);
            if (cloth && !output.find(c => c.id == cloth.id)) output.push(cloth)
        }
        return output;
    };

    const renderCards = () => {
        return getFourCloths().map(card => {
            return (
                <Link
                    to={`/show/${card.id}`}
                    className="col-6 col-md-3 mt-3"
                    key={card.id}
                    style={{textDecoration: 'none', cursor: 'pointer'}}
                >
                    <Card border="light">
                        <div className='ui slide masked reveal image'>
                            <img src={card.front_URL} alt={card.name} className='visible content'/>
                            <img src={card.back_URL} alt={card.name} className='hidden content' />
                        </div>
                        <Card.Body className="text-center">
                            <Card.Title>
                                {card.name}
                            </Card.Title>
                            <Card.Text>
                                {`$${card.price}`}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            );
        });
    };

    return (
        <div className="pt-5 pt-lg-0">
            <HomeCarousel />
            <div className="container-fluid pt-5">
                <Row className="justify-content-center my-4">
                    <h2 className="col-10 col-md-6 text-center">Ready to free your soul?</h2>
                </Row>
                <Row className="justify-content-center my-5">
                    <LinkContainer to="/show" exact>
                        <Button
                            variant="dark"
                            size="lg"
                            block
                            id="startShopBtn"
                            className="col-7 col-sm-6 col-md-5 py-3"
                        >
                            Start Shopping
                        </Button>
                    </LinkContainer>
                </Row>
                <Row className="justify-content-center mb-5">
                    <CardGroup>
                        {/* {renderCards()} */}
                    </CardGroup>
                </Row>
            </div>
        </div>
    )
}
