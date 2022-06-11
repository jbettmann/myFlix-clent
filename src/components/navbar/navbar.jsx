import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { connect } from "react-redux";

import { setUser } from "../../actions/actions";

import "./nav.scss";

export function NavList({ visibilityFilter }) {
  const user = localStorage.getItem("user");
  // console.log(user);

  // logs user out and sets state to null
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar id="nav" sticky="top" expand="md">
      <Container>
        <Navbar.Brand as={Link} to={`/`} id="logo" className="fs-3">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-flex-end"
        >
          <Nav className="Nav-list align-items-center" align="right">
            {isAuth() && (
              <>
                <VisibilityFilterInput
                  className="nav__item"
                  visibilityFilter={visibilityFilter}
                />
                <Nav.Link className="nav__item" as={Link} to={`/users/${user}`}>
                  Profile
                </Nav.Link>
                <Button
                  id="logout-button"
                  className="nav__item"
                  variant="outline-light"
                  md={1}
                  onClick={() => {
                    onLoggedOut();
                  }}
                >
                  Logout
                </Button>
              </>
            )}
            {!isAuth() && (
              <>
                <Nav.Link href="/">Sign-in</Nav.Link>
                <Nav.Link href="/register">Sign-up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

// ** Added for Redux
// MainView no longer carries its own state. We pass the action, setMovies, as a prop into MainView
// { setMovies } passed to the props vis connect() and wrapped into the dispatch() function of store ( a way for the store to know that action has been called).
export default connect(mapStateToProps, { setUser })(NavList);
