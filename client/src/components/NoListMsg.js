import React from 'react';
import {Button, Row, Col} from "react-bootstrap";


function NoListMsg() {
    return (
        <div>
            <Row><h1>No List Found...</h1></Row>
            <Row className="justify-content-center" style={{marginTop: "60vh"}}>
                <Col xs={6}>
                    <Button href="/find-games" variant="primary" style={{width: "100%"}}><h3>Take me back</h3></Button>
                </Col>
            </Row>
        </div>
    )
}
export default NoListMsg;