import React from 'react';
import {Container} from "react-bootstrap";
import Category from "./Category";


function Categories(props) {
    function createCategory(title, category) {
        return <Category title={title} selected = {category.selected} func={props.setFunc}/>
    }
    let categories = Object.keys(props.categories).map(category => createCategory(category, props.categories[category]))

    return (
        <Container>
            {categories}
        </Container>
    )
}
export default Categories;