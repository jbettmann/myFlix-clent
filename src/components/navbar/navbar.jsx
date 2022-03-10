
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import './nav.scss';

export function NavList({ user }) {

  // logs user out and sets state to null
const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
    };

const isAuth = () => {
  if(typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return false;
  }
};

  return  (
    <Navbar id="nav" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand href="#home" id="logo" className="fs-3">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto Nav-list">
              {isAuth() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
              )}
              {isAuth() && (
              <Button onClick={() => { onLoggedOut() }}>Logout</Button>
              )}
              {!isAuth() && (
              <Nav.Link href="/">Sign-in</Nav.Link>
              )}
              {!isAuth() && (
              <Nav.Link href="/register">Sign-up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}  
