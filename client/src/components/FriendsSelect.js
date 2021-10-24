import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';
import {Container} from "react-bootstrap";


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

function FriendsSelect(props) {

    const handleChange = (e) => {
        props.setFriends(Array.isArray(e) ? e.map(x => x) : [])
    }

    return (
        <Container>
            <h3>Select friends</h3>
            <Select
                closeMenuOnSelect={false}
                value = {props.allFriends.filter(obj => props.friends.includes(obj))}
                onChange={handleChange}
                isMulti
                options={props.allFriends}
                styles={colourStyles}
            />
        </Container>
    )
}
export default FriendsSelect;