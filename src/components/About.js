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
                <div className="mx-3 mx-md-4 mx-lg-5 text-center">
                    <p>For Real Ominous Souls is a fashion brand on the West Coast specializing in black and ebony clothing. There is great artistry and subdued simplicity, and we strive to reflect that in our products.</p>
                </div>
            </Container>
        </div>
    );
};

export default About;