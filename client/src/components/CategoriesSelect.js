import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';
import {Container} from "react-bootstrap";
import {categories, revCategories} from "../data/Categories.js"
const randomColor = require('randomcolor');


const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css()
                        : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            fontWeight: 'bold',
            ':active': {
                ...styles[':active'],
                backgroundColor:
                    !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css(),
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
        fontWeight: 'bold'
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white',
        },
    }),
};


function formatCategories(categories) {
    const colors = randomColor({seed: 1, count: Object.keys(categories).length})
    const sortedNames = Object.values(categories).sort()
    const allCategories = sortedNames.map((name, index) => {
        const d = {}
        d['value'] = revCategories[name]
        d['label'] = name
        d['color'] = colors[index]
        return d
    })
    return allCategories
}

function CategoriesSelect(props) {

    const handleChange = (e) => {
        console.log(e)
        props.setSelectedCategories(Array.isArray(e) ? e.map(x => x) : [])
    }

    const allCategories = formatCategories(categories)

    return (
        <Container>
            <h3>Select categories</h3>
            <Select
                closeMenuOnSelect={false}
                value = {props.selectedCategories}
                onChange={handleChange}
                isMulti
                options={allCategories}
                styles={colourStyles}
            />
        </Container>
    )
}
export default CategoriesSelect;