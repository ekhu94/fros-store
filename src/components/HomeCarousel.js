import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './HomeCarousel.css'
import car1 from '../assets/carousel1.jpg';
import car2 from '../assets/carousel2.jpg';
import car3 from '../assets/carousel3.jpg';

const HomeCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            nextLabel=""
            prevLabel=""
        >
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car1}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3 className="display-4">RockYalTent</h3>
            <p className="display-6">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car2}
            alt="Second slide"
            />

            <Carousel.Caption>
            <h3 className="display-4">Second slide label</h3>
            <p className="display-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car3}
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3 className="display-4">Third slide label</h3>
            <p className="display-6">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;