
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

import './nav.scss';

export function NavBar(props) {

  return  (
    <Navbar id="nav">
      <Container>
        <Navbar.Brand href="#home" id="logo" className="fs-3">myFlix</Navbar.Brand>
        <Nav className="me-auto Nav-list">
          <Nav.Link href="#Movies">movies</Nav.Link>
          <Nav.Link href="#Profile">profile</Nav.Link>
          <Nav.Link href="#Favorites">myFavorties</Nav.Link>
          <Button onClick={() => props.onLogoutClick()}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}  