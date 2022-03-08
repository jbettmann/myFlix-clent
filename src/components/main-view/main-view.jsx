
// Requirment to create component
import React from 'react';
import axios from 'axios'; // Ajax operations 
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from "react-router-dom"; // BrowserRouter used to implement state-based routing. HashRouter used for hash-based routing.
import { Spinner, Col, Row, Container, Button} from 'react-bootstrap'; 
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavBar } from '../navbar/nav-full';
import { RegistrationView } from '../registration-view/registration-view';


import './main-view.scss';


// React.Component is like a template or blueprint for creating new components 
// export "exposes" MainView, making it available for use by other components, modules and files. aka, youll be able import it into other files
// creates MainView component. "class" states class component, oppposed to function component
export default class MainView extends React.Component { //with extends, basiclly saying "create new MainView using React.Component template"

  // React uses constructor method to create component
  constructor() {
      // OOP, call the constructor of parent class. Initializes component state. Without, Error occurs with this.state
      super();
      // starting value of MainView state.  The place to initialize a state’s values since component hasnt been rendered yet. 
      this.state = {
          movies: [],
          user: null //default is logged out.
      };
  }

  // When a user successfully logs in, this function updates the `user` property in state to that particular user. 
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username //username saved in user state
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
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // logs user out and sets state to null
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
    
  // renders what will be displayed on the screen. The visual representation of component.
  render() {
    const { movies, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView.
    if (!user) 
      return (
        <Row  className="login-view justify-content-sm-center align-items-center">
          <Col  sm="auto">
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
        </Row>
        )

    // load spinner if no list loads 
    if (movies.length === 0) 
      return (
          <Row className="login-view justify-content-sm-center align-items-center"> 
            <Col sm="auto">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        ) 

    return (
      <Container>
        <NavBar onLogoutClick={() => {this.onLoggedOut()}} />
        <Router>
        <Row className="justify-content-md-center" id="main-view">
          {/* Route tells React your route. Each Route has a path(that expresses what it should match) and render()(what to redner if match with URL) prop */}
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={4} sm={6} id="movie-card__main" key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            return ( 
              <Col sm="auto" id="movie-view">
                {/* .goback() is build-in function to go to previous page */}
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
              </Col>
          )}} />
          <Route exact path="/genres/:name" render={({ match }) => {
            // getting movies async or returns if movies havent been added
            if (movies.length === 0) return <Row className="justify-content-md-center" id="main-view" />;
            return (
              <Col sm="auto" id="movie-view">
                {/* Loop through genre names in movies array and returns movie with Genre without .Genre at end. When added .Genre will return genre info */}
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
              </Col>
          )}}/>
          <Route exact path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <Row className="justify-content-md-center" id="main-view" />;
            return (
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              </Col>
          )}}/>
        </Row>
      </Router>
      </Container>
  );
}


    //   <Container>
    //     <NavBar onLogoutClick={() => {this.onLoggedOut()}} />
    //     <Container>
    //       <Row className="justify-content-md-center" id="main-view">
    //       {selectedMovie 
    //       ? (
    //         <Col sm="auto" id="movie-view">
    //         {/* md={8} makes MovieView take up 8 columns out of 12 when screen larger then 768px */}
    //           <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
    //         </Col>
    //       )      
    //       : movies.map(movie => (
    //         // onMovieClick function gets passed as a prop to MovieCard because,the only component that can directly change a state is the component that owns that state
    //         // Function sets state to that movie.
    //         // onClick event attribute only works as an event listener with React elements 
    //         <Col md={4} sm={6} id="movie-card__main">
    //           <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
    //         </Col>  
    //         ))
    //       }
    //       </Row>
    //     </Container>
    //   </Container>
    //   );
    // }

    componentDidMount(){
      // Checks if user is logged in when page is loaded. gets token from local stroage 
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        // if token is pressent, getMovies method is called which makes a GET request to 'movies' endpoint
        this.getMovies(accessToken)
      }
    }

      //setting movies array state to load data from myFlix API
    //   axios.get('https://jordansmyflix.herokuapp.com/movies')
    //   .then(response => {
    //     this.setState({ 
    //       movies: response.data
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }
}

LoginView.propTypes = {
  // props object MUST include a movie object. .shape({...}) means object
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};