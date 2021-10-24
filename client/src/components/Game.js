import React from 'react';
import {Col, Row, Card} from "react-bootstrap";
import {categories} from "../data/Categories.js"

function Game(props) {
    const style = {
        marginTop: "0.5rem"
    }
    return (
        <Row style={style} className="justify-content-center">
            <Col xs={10} md={6}>
                <Card className="bg-dark text-white">
                <a href={"https://store.steampowered.com/app/" + props.appID.toString()} target="_blank" rel="noreferrer"><Card.Img src={props.icon} alt="Steam icon could not be loaded" /></a>
                <Card.Footer>
                    <small className="text-muted">{props.categories.map(id => {return categories[id]}).join(", ")}</small>
                </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}
export default Game;