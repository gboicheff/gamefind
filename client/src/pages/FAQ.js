import {useEffect, useState} from "react";
import axios from 'axios';
import GamesList from "../components/GamesList";
import {useParams} from "react-router-dom";
import NoListMsg from "../components/NoListMsg";
import {Container, Row, Col, Image} from "react-bootstrap";

function FAQ() {

    return (
        <div className="FAQ">
            <Container>
                <Row>
                    <Col style={{marginTop: "10vh"}}><h2><b>How do I find my SteamID?</b></h2></Col>
                </Row>
                <Row>
                    <Col style={{marginTop: "2vh", fontSize: "18px"}}>
                        <p>Check out the guide <a href="https://www.businessinsider.com/how-to-find-steam-id">here</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginTop: "4vh"}}><h2><b>How long do the lists last?</b></h2></Col>
                </Row>
                <Row>
                    <Col style={{marginTop: "2vh", fontSize: "18px"}}>
                        <p>Shared game lists last for 24 hours.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FAQ;
