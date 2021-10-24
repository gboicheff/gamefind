import React from 'react';
import Image from 'react-bootstrap/Image'
import {Col, Row} from "react-bootstrap";

function Entry(props) {
    const rowStyle = {
        backgroundColor: '#A9A9A9',
        borderRadius: '15px',
    }
    const imageStyle = {
        borderRadius: '5px'
    }

    return (
        <Row className="align-items-center" style={rowStyle}>
            <Col><Image src={props.food_image} style={imageStyle} fluid/></Col>
            <Col><p>{props.expires_date}</p></Col>
        </Row>
    )
}
export default Entry;