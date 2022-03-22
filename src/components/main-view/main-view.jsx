
// Requirment to create component
import React from 'react';
import axios from 'axios'; // Ajax operations 
import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"; // BrowserRouter used to implement state-based routing. HashRouter used for hash-based routing.
import {  Col, Row, Container, Button } from 'react-bootstrap'; 
import { LoginView } from '../login-view/login-view';
// ** import { MovieCard } from '../movie-card/movie-card'; "removed when creating store for Redux"
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavList } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';





import './main-view.scss';


// React.Component is like a template or blueprint for creating new components 
// export "exposes" MainView, making it available for use by other components, modules and files. aka, youll be able import it into other files
// creates MainView component. "class" states class component, oppposed to function component

// ** later date ** removed "export" for Redux use
class MainView extends React.Component { //with extends, basiclly saying "create new MainView using React.Component template"

  // React uses constructor method to create component
  constructor() {
      // OOP, call the constructor of parent class. Initializes component state. Without, Error occurs with this.state
      super();
      // starting value of MainView state.  The place to initialize a state’s values since component hasnt been rendered yet. 
      this.state = {
          // movies: [], "** removed for Redux use"
          // user: null //default is logged out.
      };
  }

  componentDidMount() {
    // Checks if user is logged in when page is loaded. gets token from local stroage 
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser({
        user: localStorage.getItem('user')
      });
      // if token is pressent, getMovies method is called which makes a GET request to 'movies' endpoint
      this.getMovies(accessToken)
    }
  }

  // When a user successfully logs in, this function updates the `user` property in state to that particular user. 
  onLoggedIn(authData) {
    console.log(authData);
    // ** Removed for Redux use
    // this.setState({
    //   user: authData.user.Username // username saved in user state
    this.props.setUser({
      user: authData.user.Username
    });
    // auth info recieved from handleSubmit method on LoginView is saved to localStorage. 
    // localStorage has setItem method taking two arguments: key and value. 
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    // gets movies once user is logged in. 'this' refers to object itself, aka MainView class. 
    this.getMovies(authData.token);
  }

  // getMovies helps with refactoring, to not repeat ourself. Executes a GET request to 'movies' endpoint. 
  getMovies(token) {
    axios.get('https://jordansmyflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state

      // ** Below removed for Redux
      // this.setState({
      //   movies: response.data

      this.props.setMovies(response.data); // ** Added for Redux
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // logs user out and sets state to null
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser({
      user: null
    });
  }

  addFavorite(e, movie) {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
        .post(
            `https://jordansmyflix.herokuapp.com/users/${Username}/favorites/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
            console.log(response);
            alert("Movie add to your Favorties!");
            this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error);
        });
};
    
  // renders what will be displayed on the screen. The visual representation of component.
  render() {
    // const { user } = this.state; ** Removed for Redux use
    const { movies,  user  } = this.props; // ** movies and user removed from this.state and now extracted from this.prop for Redux

    // load spinner if no list loads 

    return (
      <Router>
        <NavList user={user} />  
        <Container>
          <Row className="justify-content-sm-center" id="main-view">
            
              {/* Route tells React your route. Each Route has a path(that expresses what it should match) and render()(what to redner if match with URL) prop */}
              <Route exact path="/" render={() => {
                    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView.
                    
                if (!user) {
                  return <Redirect to="/login" />
                }


                return (
                    <MoviesList movies={movies} addFavoriteMovies={(e) => this.addFavorite(e, movies)} />
                    //** Below removed for Redux */
                    // { movies.map(movie => (
                    //   <Col md={4} sm={6} id="movie-card__main" key={movie._id}>
                    //     <MovieCard movieData={movie} addFavoriteMovie={(e) => this.addFavorite(e, movie)} />
                    //   </Col>
                    // ))} 
                  
                )
              }} />

              <Route path="/login" render={() => {
                  if (user) {
                    return <Redirect to="/" />;
                  }
                  return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
              }} /> 

              <Route path="/register" render={() => {
                if (user) {
                  return <Redirect to="/" />
                }
                return (
                  <Col xs={12} sm={9} md={6} className="justify-content-sm-center" >
                    <RegistrationView />
                  </Col>
              )}} />

              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) {
                  return <Redirect to="/login" />
                }
                return ( 
                  <Col sm="auto" md={8} id="movie-view">
                    {/* .goback() is build-in function to go to previous page */}
                    <MovieView 
                      movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
                  </Col>
              )}} />

              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) {
                  return <Redirect to="/login" />
                }
                // getting movies async or returns if movies havent been added
                return (
                  <Col sm={12} md={8} id="movie-view">
                    {/* Loop through genre names in movies array and returns movie with Genre without .Genre at end. When added .Genre will return genre info */}
                    <GenreView 
                      movies={movies.filter(movie => movie.Genre.Name === match.params.name)} 
                      genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()} />
                  </Col>
              )}}/>

              <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) {
                  return <Redirect to="/login" />
                }
                return (
                  <Col sm={12} md={8}>
                    <DirectorView 
                      movies={movies.filter(movie => movie.Director.Name === match.params.name)} 
                      director={movies.find(m => m.Director.Name === match.params.name).Director} 
                      onBackClick={() => history.goBack()}/>
                  </Col>
              )}}/>

              <Route path={`/users/${user}`} render={({ match, history }) => {
                if (!user){ 
                  return <Redirect to="/login" />
                  }
                return (
                  <Col sm={12} md={10}>
                    <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                  </Col>
              )}}/>
          </Row>
        </Container>
      </Router>
    )
  }
}
// ** Added for Redux
// maps state of store to the props being passed into component. 
let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user 
  };
}

// ** Added for Redux
// MainView no longer carries its own state. We pass the action, setMovies, as a prop into MainView
// { setMovies } passed to the props vis connect() and wrapped into the dispatch() function of store ( a way for the store to know that action has been called). 
export default connect(mapStateToProps, { setMovies, setUser } )(MainView);