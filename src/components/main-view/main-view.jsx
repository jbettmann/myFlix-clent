
// Requirment to create component
import React from 'react';
import axios from 'axios'; // Ajax operations 
import PropTypes from 'prop-types';
import { Spinner, Col, Row, Container, Navbar, Nav } from 'react-bootstrap'; 
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavBar } from '../navbar/nav-full';

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
          movies: [ ],
          selectedMovie: null, // this tells app no movie cards were clicked
          user: null //default is logged out.
      };
  }

  // When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie. 
  // This method(this.setState) ALWAYS takes an object and that object contains new value to assign state in form of key:value pair
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // When a user successfully logs in, this function updates the `user` property in state to that particular user. 
  onLoggedIn(user) {
    this.setState({
      user
    });
  }
    
  // renders what will be displayed on the screen. The visual representation of component.
  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView.
    if (!user) 
      return (
        <Row className="login-view justify-content-sm-center align-items-center"> 
          <Col sm="auto">
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
        <NavBar />
        <Container>
          <Row className="justify-content-md-center" id="main-view">
          {selectedMovie 
          ? (
            <Col sm="auto" id="movie-view">
            {/* md={8} makes MovieView take up 8 columns out of 12 when screen larger then 768px */}
              <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          )      
          : movies.map(movie => (
            // onMovieClick function gets passed as a prop to MovieCard because,the only component that can directly change a state is the component that owns that state
            // Function sets state to that movie.
            // onClick event attribute only works as an event listener with React elements 
            <Col md={4} sm={6} id="movie-card__main">
              <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            </Col>  
            ))
          }
          </Row>
        </Container>
      </Container>
      );
    }

    componentDidMount(){
      //setting movies array state to load data from myFlix API
      axios.get('https://jordansmyflix.herokuapp.com/movies')
      .then(response => {
        this.setState({ 
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
}

LoginView.propTypes = {
  // props object MUST include a movie object. .shape({...}) means object
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};