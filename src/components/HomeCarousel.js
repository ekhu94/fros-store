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
            {/* <Carousel.Caption>
                <div id="caption1">
                    <h3>Bl&#923;ck Soul <span>- Winter Collection</span></h3>
                    <div id="caption-p1">
                        <p className="my-4">Find your depth.</p>
                        <p>Serenity in artistry</p>
                    </div>
                </div>
            </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car2}
            alt="Second slide"
            />

            {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p className="display-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={car3}
            alt="Third slide"
            />

            {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p className="display-6">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            </Carousel.Caption> */}
        </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;