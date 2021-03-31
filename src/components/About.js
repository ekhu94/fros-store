import React from 'react';
import { Image, Container, Row } from 'react-bootstrap';

import about from '../assets/about.jpg';
import './About.css';

const About = () => {
    return (
        <div className="px-0">
            <Image src={about} alt="about-image" fluid className="mb-4" />
            <Container>
                <h1 className="text-center">About us</h1>
                <p></p>
            </Container>
        </div>
    );
};

export default About;