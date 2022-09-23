import React from "react";
import { Star } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { addFavoriteMovie } from "../add-favorite-function/add-favorite-function";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    // movieData is "name of the prop" used in <MovieCard ... /> and onMovieClick is the function from main-view passed as prop
    const { movieData } = this.props;
    const image = document.querySelector("img");
    let width = image.clientWidth;
    let height = image.clientHeight;

    // use onMovieClick as callback on onClick event listener to change start of main-view
    return (
      // <Card id="movie-card" variant="dark">
      <div className="movie-card__content">
        <Link className="movie-card" to={`/movies/${movieData._id}`}>
          <div
            style={{
              width: width ? `${width}px` : 0,
              height: height ? `${height}px` : 0,
            }}
          ></div>
          <Card.Img
            className="movie-img"
            variant="top"
            src={movieData.ImageUrl}
            crossOrigin="true"
          />

          {/* <Card.Body className="movie-card-body" id="movie-body-card"> */}

          <h5 className="movie-title" align="center">
            {movieData.Title}
          </h5>

          <Star
            size={20}
            className="star"
            value={movieData._id}
            onClick={(e) => addFavoriteMovie(e, movieData)}
          />

          {/* </Card.Body> */}
        </Link>
      </div>
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
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Release: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Actors: PropTypes.array.isRequired,
  }).isRequired,
  // props object MUST contain onMovieClick and MUST be a function
};
