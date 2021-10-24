import React from 'react';
import Image from 'react-bootstrap/Image'
import {Col, Container, Row} from "react-bootstrap";
import Entry from "./Entry";

function Table(props) {
    function createEntry(entry) {
        return <Entry food_image={entry.food_image} expires_date={entry.expires_date}/>
    }
    let entries = props.entries.map((entry) => createEntry(entry))
    return (
        <Container>
            {entries}
        </Container>
    )
}
export default Table;