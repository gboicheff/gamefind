import React, {useState} from 'react';
import {Button} from "react-bootstrap";

function Category(props) {
    function buttonClick() {
        props.func(props.title)
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
        <Button onClick={buttonClick} variant={getColor()}>{props.title}</Button>
    )
}
export default Category;