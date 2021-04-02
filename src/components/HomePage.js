import React, { useState, useEffect } from 'react'
import HomeCarousel from './HomeCarousel'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Button, CardGroup, Card } from 'react-bootstrap';

import { api } from '../services/api';
import './HomePage.css';

export default function HomePage({ cloth, idxs, showAlert, renderAlert }) {
    const [fourCloths, setFourCloths] = useState([])

    useEffect(() => {
        api.cloths.getCloths()
        .then(data => {
            const cards = data.filter(d => idxs.includes(data.indexOf(d)))
            setFourCloths(cards)
        });
        
    }, [])

    const renderCards = () => {
            return fourCloths.map(card => {
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
        <div>
            {showAlert && renderAlert()}
            <HomeCarousel />
            <div className="container-fluid pt-4">
                <Row className="justify-content-center my-4">
                    <h2 className="col-12 col-sm-8 col-md-6 text-center">Ready to free your soul?</h2>
                </Row>
                <Row className="justify-content-center my-5">
                    <LinkContainer to="/all" exact>
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
                <h3 className="text-center mb-4 mb-md-3" style={{letterSpacing: '0.2rem'}}>Featured Selection</h3>
                <Row className="justify-content-center mb-5">
                    <CardGroup>
                        {renderCards()}
                    </CardGroup>
                </Row>
            </div>
        </div>
    )
}
