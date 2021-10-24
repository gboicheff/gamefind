import React from 'react';
import Image from 'react-bootstrap/Image'
import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import Entry from "./Entry";
import Friend from "./Friend";

function Friends(props) {
    function createFriend(friend) {
        return <Friend name={friend.name} steamid = {friend.steamid} icon = {friend.icon} selected = {friend.selected} setFunc = {props.setFunc}/>
    }
    let friends = Object.values(props.friends).map(friend => createFriend(friend))
    return (
        <Container>
            {friends}
        </Container>
    )
}
export default Friends;