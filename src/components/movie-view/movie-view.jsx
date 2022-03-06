
import React from 'react';
import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    // movieData is "name of the prop" used in <MovieCard ... />
    const { movieData, onBackClick } = this.props;
    return (
      <Card id="movie-card" variant="dark">
        <Card.Body>
          <div className="movie-poster">
            <img src={movieData.ImageUrl} />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movieData.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movieData.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movieData.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movieData.Director.Name}</span>
          </div>
          <div className="movie-releaseDate">
            <span className="label">Release Date: </span>
            <span className="value">{movieData.Release}</span>
          </div>
          <div className="movie-actors">
            <span className="label">Actors: </span>
            <span className="value">{movieData.Actors}</span>
          </div>
          <div className="movie-featured">
            <span className="label">Featured: </span>
            <span className="value">{movieData.Featured}</span>
          </div>
          {/* button sets selectedMovie to null, allowing MainView to stop rendering MovieView */}
          <Button variant="light" onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    )};

}