
import React from 'react';
import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // movieData is "name of the prop" used in <MovieCard ... />
    const { movieData, onMovieClick } = this.props;
<<<<<<< Updated upstream
    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
=======
    // use onMovieClick as callback on onClick event listener to change start of main-view
    return (
      <Card id="movie-card" variant="dark">
        <Card.Img variant="top" src={movieData.ImageUrl} />
        <Card.Body >
          <Card.Title >{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button id="btn-link" onClick={() => onMovieClick(movieData)} variant="link">Open</Button>        
        </Card.Body>
      </Card>
    );
>>>>>>> Stashed changes
  }
}

MovieCard.propTypes = {
  // props object MUST include a movie object. .shape({...}) means object
  movieData: PropTypes.shape({
    // props object MAY contain a title key, if it DOES then it MUST be a string
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImageUrl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Release: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Actors: PropTypes.array.isRequired
  }).isRequired,
  // props object MUST contain onMovieClick and MUST be a function 
  onMovieClick: PropTypes.func.isRequired
};