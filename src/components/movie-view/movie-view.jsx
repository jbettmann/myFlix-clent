
import React from 'react';

export class MovieView extends React.Component {
  render() {
    // movieData is "name of the prop" used in <MovieCard ... />
    const { movieData, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movieData.Director}</span>
        </div>
        <div className="movie-actors">
          <span className="label">Actors: </span>
          <span className="value">{movieData.Actors}</span>
        </div>
        <div className="movie-releaseDate">
          <span className="label">Release Date: </span>
          <span className="value">{movieData.Release}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    )}
}