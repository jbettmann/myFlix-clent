import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateUser, setUser } from "../../actions/actions";

import "./profile-view.scss";
import { Link } from "react-router-dom";

import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Figure,
} from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";

class ProfileView extends React.Component {
  constructor() {
    super();
  }

  // getUser() {
  //     const Username = localStorage.getItem('user');
  //     const token = localStorage.getItem('token');
  //     axios
  //         .get(`https://my-flix-app.vercel.app/users/${Username}`, {
  //             headers: { Authorization: `Bearer ${token}` },
  //         })
  //         .then((response) => {
  //           console.log(response.data)
  //           this.props.setUser({
  //               Username: response.data.Username,
  //               Password: response.data.Password,
  //               Email: response.data.Email,
  //               Birthday: response.data.Birthday,
  //               FavoriteMovies: response.data.FavoriteMovies,
  //           });
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // };
  // Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(this.state);

    axios
      .put(`https://my-flix-app.vercel.app/users/${Username}`, this.state, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;

        this.props.updateUser({
          Username: data.Username,
          Password: data.Password,
          Email: data.Email,
          Birthday: data.Birthday,
        });

        localStorage.setItem("user", this.props.user.Username);
        alert("Profile updated");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete a movie from FavoriteMovies list
  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://my-flix-app.vercel.app/users/${Username}/favorites/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister
  onDeleteUser() {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmation) {
      const Username = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      axios
        .delete(`https://my-flix-app.vercel.app/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          alert("Your account has been deleted");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.open("/", "_self");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { onBackClick, movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.props.user || {};
    console.log(this.props.user);

    return (
      <Container className="profile-view" align="center">
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Card id="user-info">
              <Card.Body id="profile-card" className="user-info">
                <Card.Title id="profile-title">Account Info</Card.Title>
                <Card.Text align="left">
                  <span id="profile-label">Username: </span>
                  <span id="profile-value">{Username}</span>
                </Card.Text>
                <Card.Text align="left">
                  <span id="profile-label">Email: </span>
                  <span id="profile-value">{Email}</span>
                </Card.Text>
                <Card.Text align="left">
                  <span id="profile-label">Birthday: </span>
                  <span id="profile-value">{Birthday}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={8} align="right">
            <Card id="movie-card" className="user-update">
              <Card.Body id="profile-card" align="center">
                <Card.Title>Update Info</Card.Title>
                <Form
                  className="update-form"
                  align="left"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      onChange={(e) => this.setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter New Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <div className="update-delete_button">
                  <Button variant="light" type="submit" onClick={this.editUser}>
                    Update User
                  </Button>
                  <Button
                    className="ml-3"
                    variant="danger"
                    onClick={() => this.onDeleteUser()}
                  >
                    Delete User
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Card id="movie-card">
          <Card.Body>
            <Row>
              <Col xs={12}>
                <h4>Your Favorite Movies</h4>
              </Col>
            </Row>
            <Row>
              {FavoriteMovies != null && FavoriteMovies.length === 0 && (
                <div className="text-center">No Favorite Movies</div>
              )}
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Col
                        xs={12}
                        sm={6}
                        md={6}
                        lg={2}
                        key={movie._id}
                        className="fav-movies"
                      >
                        <Figure>
                          <Link id="noLinkLook" to={`/movies/${movie._id}`}>
                            <Figure.Image
                              src={movie.ImageUrl}
                              crossOrigin="true"
                              alt={movie.Title}
                            />
                            <Figure.Caption>{movie.Title}</Figure.Caption>
                          </Link>
                          <Button
                            size="sm"
                            variant="danger"
                            value={movie._id}
                            onClick={(e) => this.onRemoveFavorite(e, movie)}
                          >
                            Remove
                          </Button>
                        </Figure>
                      </Col>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Card>
        <div className="backButton">
          <Button
            variant="light"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
        <br />
      </Container>
    );
  }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
  getUser: PropTypes.func,
  onBackClick: PropTypes.func,
  setUser: PropTypes.func,
  updateUser: PropTypes.func,
  user: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    movies: state.movies,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
