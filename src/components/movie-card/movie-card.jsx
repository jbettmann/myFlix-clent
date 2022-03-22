
import React from 'react';
import axios from 'axios'; 
import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

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
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  render() {
    // movieData is "name of the prop" used in <MovieCard ... /> and onMovieClick is the function from main-view passed as prop
    const { movieData } = this.props;
    // use onMovieClick as callback on onClick event listener to change start of main-view
    return (
      <Card id="movie-card" variant="dark">
        <Card.Img variant="top" src={movieData.ImageUrl} />
        <Card.Body >
          <Card.Title >{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/movies/${movieData._id}`}>
            <Button id='btn-link' variant="link" addFavoriteMovie={(e) => { this.addFavorite(e, movieData) }}>Open</Button>
          </Link>  
            <Button id='btn-link' variant="link" value={movieData._id} onClick={(e) => this.addFavorite(e, movieData)} >Add To Favorites</Button>      
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  // props object MUST include a movie object. .shape({...}) means object
  movieData: PropTypes.shape({
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