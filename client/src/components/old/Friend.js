import React, {useState} from 'react';
import Image from 'react-bootstrap/Image'
import {Button, ButtonGroup, Col, Container, FormControl, InputGroup, Row, ToggleButton} from "react-bootstrap";
import Entry from "./Entry";

function Friend(props) {
    const friendStyle = {
        marginTop: '0.5rem',
        backgroundColor: 'grey'
    }
    function buttonClick() {
        props.setFunc(props.name)
    }
    function getColor() {
        if(!props.selected) {
            return "danger"
        }
        else{
            return "success"
        }
    }
    return (
        <Row key={props.steamid} style={friendStyle}>
            <Col>
                <p>{props.name}</p>
            </Col>
            <Col>
                <img src={props.icon} alt="Steam icon could not be loaded"/>
            </Col>
            <Col>
                <Button variant={getColor()} onClick={buttonClick}>Include</Button>
            </Col>
        </Row>
    )
}
export default Friend;