import React, {useState} from 'react';
import {Button, FormControl, InputGroup, OverlayTrigger, Tooltip} from "react-bootstrap";


function IDInput(props) {
    const [formID, setFormID] = useState(0)
      
    return (
        <div>
            <label htmlFor="basic-url"><h3>Enter your SteamID</h3></label>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        https://steamcommunity.com/profiles/
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={e => setFormID(e.target.value)}/>
                <Button variant="primary" onClick={() => props.buttonFunc(formID)}>Submit</Button>
            </InputGroup>
        </div>
    )
}
export default IDInput;