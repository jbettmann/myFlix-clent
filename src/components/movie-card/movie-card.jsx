
import React from 'react';
import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // movieData is "name of the prop" used in <MovieCard ... /> and onMovieClick is the function from main-view passed as prop
    const { movies } = this.props;
    // use onMovieClick as callback on onClick event listener to change start of main-view
    return (
      <Card id="movie-card" variant="dark">
        <Card.Img variant="top" src={movies.ImageUrl} />
        <Card.Body >
          <Card.Title >{movies.Title}</Card.Title>
          <Card.Text>{movies.Description}</Card.Text>
          <Link to={`/movies/${movies._id}`}>
            <Button id='btn-link' variant="link">Open</Button>
          </Link>       
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  // props object MUST include a movie object. .shape({...}) means object
  movies: PropTypes.shape({
    // props object MAY contain a title key, if it DOES then it MUST be a string
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
    Release: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Actors: PropTypes.array.isRequired
  }).isRequired
  // props object MUST contain onMovieClick and MUST be a function 
};