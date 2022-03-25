
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setUser } from '../../actions/actions';

import './nav.scss';

export function NavList() {
  const user = localStorage.getItem('user');
  console.log(user);

  // logs user out and sets state to null
  const onLoggedOut = () => {
    setUser( {
      Username: '',
      Email: '',
      Password: '',
      Birthday: '',
      FavoriteMovies: [], 
    });
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
        <Navbar.Brand href="/" id="logo" className="fs-3">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto Nav-list align-items-end" align="right">
              {isAuth() && (
              <Nav.Link  href={`/users/${user}`}>Profile</Nav.Link>
              )}
              {isAuth() && (
              <Button id="logout-button" md={1} onClick={() => { onLoggedOut() }}>Logout</Button>
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

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user 
  };
}

// ** Added for Redux
// MainView no longer carries its own state. We pass the action, setMovies, as a prop into MainView
// { setMovies } passed to the props vis connect() and wrapped into the dispatch() function of store ( a way for the store to know that action has been called). 
export default connect(mapStateToProps, {  setUser } )(NavList);