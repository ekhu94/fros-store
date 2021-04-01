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
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car2}
            alt="Second slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car3}
            alt="Third slide"
            />
        </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;