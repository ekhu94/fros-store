import React from 'react';
import { Image, Container, Row } from 'react-bootstrap';

import about from '../assets/about.jpg';
import './About.css';

const About = () => {
    return (
        <div className="px-0">
            <Image src={about} alt="about-image" fluid className="mb-4" />
            <Container>
                <Row className="justify-content-center text-center">
                    <blockquote className="blockquote col-12 col-sm-10 col-lg-8">
                        <p>“I love black because it affirms, designs and styles. A woman in a black dress is a pencil stroke.”</p>
                        <footer className="blockquote-footer">Yves Saint Laurent</footer>
                    </blockquote>
                </Row>
                <h1 className="text-center">About us</h1>
                <div id="pars" className="mx-3 mx-md-4 mx-lg-5 text-left">
                    <p className="mt-3 mt-md-4 mt-lg-5">For Real Ominous Souls is a fashion brand located on the West Coast. Founded in 2020, FROS specializes in manufacturing dark clothing and outfits. We believe there is great artistry in subdued simplicity, and strive to reflect that in all our product lines.</p>
                    <p className="mt-3 mt-md-4 mt-lg-5">Our 2021 BlɅck Soul line was inspired by the countless struggles and endeavours of people around the world during this turbulent time. Be sure to check out our award-winning Winter Collection consisting of contemporary outerwear, tops, and bottoms for any occasion.</p>
                    {/*  added padding on this last paragraph to stretch screen down but feel free to change for footer */}
                    <p id="last-par" className="mt-3 mt-md-4 mt-lg-5">All of our clothes are designed and manufactured in the US with the highest quality material. A purchase from any of our lines is meant to last forever. Discover your true complexity with FROS today!</p>
                </div>
            </Container>
        </div>
    );
};

export default About;