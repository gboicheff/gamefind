import React from 'react';
import {Container, Image, Navbar, Nav} from "react-bootstrap";
import GithubIcon from "../imgs/GitHub-Mark-Light-32px.png"

function IDInput() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="http://localhost:3000/find-games"><b>Shared Game Finder</b></Navbar.Brand>
                <Nav>
                    <Nav.Link href="https://github.com/gboicheff"><Image src={GithubIcon} fluid/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default IDInput;