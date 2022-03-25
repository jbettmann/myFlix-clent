import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import { setUser, updateUser } from '../../actions/actions';
>>>>>>> main

import './profile-view.scss';
import { Link } from 'react-router-dom';

import { Container, Card, Button, Row, Col, Form, Figure } from 'react-bootstrap';
import { SpinnerView } from '../spinner/spinner';

<<<<<<< HEAD
import { setUser, validateInput } from '../../actions/actions';

export function ProfileView({ user, movies, setUser, validateInput }) {
  const Username = localStorage.getItem('user'); // real username to make axios requests
  const token = localStorage.getItem('token'); // jwt token to make axios requests

  //objects that include error messages as a result of validateChanges:
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  //array of movie objects of user's favorite movies:
  const [favorites, setFavorites] = useState([]);
=======
export class ProfileView extends React.Component {
    constructor() {
        super();
        
    }
    
    componentDidMount() {
        this.getUser();
    }
>>>>>>> main


<<<<<<< HEAD
  useEffect(() => {
      axios
        .get(`https://jordansmyflix.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              let userData = {
                ...response.data,
                Birthday: response.data.Birthday.substring(0, 10),
              };
              setUser(userData);
=======
    getUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios
            .get(`https://jordansmyflix.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              this.props.setUser({
                  Username: response.data.Username,
                  Password: response.data.Password,
                  Email: response.data.Email,
                  Birthday: response.data.Birthday,
                  FavoriteMovies: response.data.FavoriteMovies,
              });
>>>>>>> main
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    // useEffect(() => {
    //   filterMovies(user.FavoriteMovies);
    // }, []);
  
    // const filterMovies = (favMovieIds) => {
      
    //   let filteredMovies = [];
    //   movies.forEach((movie) => {
    //     favMovieIds
    //     ? filteredMovies.push(movie)
    //     : filteredMovies;
    // });
    //   setFavorites(filteredMovies);
     
    // };

    // Allow user to edit or update profile
   const editUser = (e) => {
      let isValid = validateChanges();
        e.preventDefault();
<<<<<<< HEAD
      if(isValid) {
        axios
            .put(
                `https://jordansmyflix.herokuapp.com/users/${Username}`,
                {
                    Username: user.Username,
                    Password: user.Password,
                    Email: user.Email,
                    Birthday: user.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
              let userData = {
                ...response.data,
                Birthday: response.data.Birthday.substring(0, 10),
              };
              setUser(userData);
              localStorage.setItem('user', userData.Username);
              alert("Profile updated");
              window.open('/profile', '_self');
=======
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://jordansmyflix.herokuapp.com/users/${Username}`,
                this.state,
                { headers: { Authorization: `Bearer ${token}` } 
              })
              .then(response => {
                const data = response.data;
          
                this.props.updateUser({
                  Username: data.Username,
                  Password: data.Password,
                  Email: data.Email,
                  Birthday: data.Birthday
                });

                localStorage.setItem('user', this.props.user.Username);
                alert("Profile updated");
                window.open('/profile', '_self');
>>>>>>> main
            })
            .catch(function (error) {
                console.log(error);
            });
    }};

    // Delete a movie from FavoriteMovies list
    onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        axios
            .delete(
                `https://jordansmyflix.herokuapp.com/users/${Username}/favorites/${movie._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Movie removed");
                filterMovies(response.data.FavoriteMovies);;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Deregister
<<<<<<< HEAD
  onDeleteUser = (e) => {
    e.preventDefault();
    console.log('onDeleteUser');
=======
    onDeleteUser() {
      const confirmation = window.confirm('Are you sure you want to delete your account?');

      if (confirmation) {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

>>>>>>> main
        axios
            .delete(`https://jordansmyflix.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert("Your account has been deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
<<<<<<< HEAD
    };
  

  // function validates inputs in profile form:
  const validateChanges = () => {
    let isValid = true;

    if (user.Username.length < 4) {
      setUsernameError('Username must have at least 4 characters.');
      isValid = false;
=======
    }
  }
    setUsername(value) {
        this.setState({
            Username: value,
        });
>>>>>>> main
    }

    if (user.Password.length < 6) {
      setPasswordError('Password must have at least 6 characters.');
      isValid = false;
    }

    if (user.Email.indexOf('@') === -1) {
      setEmailError('Email is not valid.');
      isValid = false;
    }

    if (!user.Birthday) {
      setBirthdayError('Please enter your birthday.');
      isValid = false;
    }

<<<<<<< HEAD
    return isValid;
  };

=======
    render() {
        const { onBackClick } = this.props;
        const { FavoriteMovies, Username, Email, Birthday, movies} = this.props.user || {};

        if (Username === null) {
            return <SpinnerView />
        }
>>>>>>> main

    return (
        <Container className="profile-view" align="center">
          <Row>
              <Col>
                  <Card id="movie-card">
                      <Card.Body >
                          <Card.Title>Profile</Card.Title>
                          <Form 
                              className="update-form">
                              <Form.Group>
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control
                                      type="text"
                                      name="Username"
                                      placeholder="New Username"
                                      value={Username}
                                      onChange={(e) => validateInput(e.target.value, 'Username')}
                                      />
                                      <div className="profile-text">
                                        {usernameError && <p> {usernameError}</p>}
                                      </div>
                              </Form.Group>

                              <Form.Group>
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                      type="password"
                                      name="Password"
                                      placeholder="New Password"
                                      value={""}
                                      onChange={(e) => validateInput(e.target.value, 'Password')}
                                    />
                                    <div className="profile-text">
                                      {passwordError && <p> {passwordError}</p>}
                                    </div>
                              </Form.Group>

                              <Form.Group>
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                      type="email"
                                      name="Email"
                                      placeholder="Enter Email"
                                      value={user.Email}
                                      onChange={(e) => validateInput(e.target.value, 'Email')}
                                  />
                                  <div className="profile-text">
                                    {emailError && <p> {emailError}</p>}
                                  </div>
                              </Form.Group>

                              <Form.Group>
                                  <Form.Label>Birthday</Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="Birthday"
                                    value={Username.Birthday}
                                    onChange={(e) => validateInput(e.target.value, 'Birthday')}
                                  />
                                  <div className="profile-text">
                                    {birthdayError && <p> {birthdayError}</p>}
                                  </div>
                              </Form.Group>
                          </Form>
                          <div className="update-delete_button">
                              <Button variant="light" type="submit" onClick={editUser}>Update User</Button>
                              <Button className="ml-3" variant="danger" onClick={() => onDeleteUser()}>Delete User</Button>
                          </div>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12} >
                    <h4>Your Favorite Movies</h4>
                </Col>
              </Row>
              <Row>
                {favorites.length === 0 && (
                  <div className="text-center">No Favorite Movies</div>
                  )}
                {favorites.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      favorites.find((fav) => fav === movie._id)
                  ) {
                  return (
                    <Col xs={12} sm={6} md={6} lg={3} key={movie._id} className='fav-movies'>
                      <Figure>
                      <Link to={`/movies/${movie._id}`}>
                        <Figure.Image src={movie.ImageUrl} crossOrigin="true" alt={movie.Title}/>
                        <Figure.Caption>
                          {movie.Title}
                        </Figure.Caption>
                      </Link>
                      <Button size="sm" variant="danger" value={movie._id} onClick={(e) => onRemoveFavorite(e, movie)}>Remove</Button>
                      </Figure>
                    </Col>
                  );
                  }
                })}
              </Row>
            </Card.Body>
          </Card>
          <div className="backButton">
              <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
          </div>
          <br />
        </Container>
    );
}


// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired,
      }).isRequired,
  })).isRequired,
<<<<<<< HEAD
  onBackClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setUser, validateInput })(ProfileView);
=======
  onBackClick: PropTypes.func.isRequired,
  getUser: PropTypes.func,
  onBackClick: PropTypes.func,
  setUser: PropTypes.func,
  updateUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
>>>>>>> main
