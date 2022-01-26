import { Container , Navbar, Nav, NavDropdown, Image} from 'react-bootstrap';
import {withRouter} from "react-router"
import {NavLink} from "react-router-dom"
import GithubIcon from "../imgs/GitHub-Mark-Light-32px.png"
import SteamIcon from "../imgs/steam_login.png"
import React, {useState, useEffect} from 'react';

function NavBar(props) {
    const imageStyle = {
        width: "32px",
        height: "32px"
    }

    const navbarStyle = {
        marginBottom: "10vh"
    }


    return (
        <div className="Nav" style={navbarStyle}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/find-games">gamefind</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav activeKey={props.location.pathname} className="me-auto">
                        <Nav.Link href="https://github.com/gboicheff"><Image style={imageStyle} src={GithubIcon} fluid/></Nav.Link>
                    </Nav>
                        <Nav>
                            {props.account 
                            ? 
                            // <Nav.Link href="/account"><Image src={props.account.photos[0].value} fluid/></Nav.Link>
                            <NavDropdown title={<Image src={props.account.photos[0].value} fluid roundedCircle/>} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/steam/logout" style={{color: "red"}}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            : 
                            <Nav.Link href="/auth/steam"><Image src={SteamIcon} fluid/></Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
const NavR = withRouter(NavBar)

export default NavR;
