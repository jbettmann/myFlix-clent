import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { addFavoriteMovie } from "../add-favorite-function/add-favorite-function";

export class MovieView extends React.Component {
  render() {
    // movieData is "name of the prop" used in <MovieCard ... />
    const { movie, onBackClick } = this.props;
    return (
      <Card id="movie-card" variant="dark">
        <Card.Img
          src={movie.ImageUrl}
          className="movie-poster"
          crossOrigin="true"
        />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text>
            <div className="movie-view-div">
              <span className="label"> Description: </span>
              <span className="value"> {movie.Description} </span>
            </div>
            <div className="movie-view-div">
              <span className="label">Genre: </span>
              <Link id="noLinkLook" to={`/genres/${movie.Genre.Name}`}>
                {" "}
                {movie.Genre.Name}
              </Link>
            </div>
            <div className="movie-view-div">
              <span className="label">Director:</span>
              {movie.Director.map((Director, i) => (
                <Link
                  id="noLinkLook"
                  to={`/directors/${Director.Name}`}
                  key={i}
                >
                  {Director.Name}
                </Link>
              )).reduce((prev, curr) => [prev, ", ", curr])}
            </div>
            <div className="movie-view-div">
              <span className="label">Release Date: </span>
              <span className="value">{movie.Release}</span>
            </div>
            <div className="movie-view-div">
              <span className="label">Actors: </span>
              {movie.Actors.map((actors, i) => (
                <span className="value" key={i}>
                  {actors}
                </span>
              )).reduce((prev, curr) => [prev, ", ", curr])}
            </div>
            <div className="movie-view-div">
              <span className="label">Featured: </span>
              <span className="value">{movie.Featured}</span>
            </div>
          </Card.Text>
          {/* button sets selectedMovie to null, allowing MainView to stop rendering MovieView */}
          <Button
            variant="light"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
          <Button
            id="btn-link"
            variant="link"
            onClick={(e) => addFavoriteMovie(e, movie)}
          >
            Add To Favorites
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Release: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Actors: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  addFavoriteMovie: PropTypes.func,
};
