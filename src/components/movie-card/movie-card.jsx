
import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // movieData is "name of the prop" used in <MovieCard ... />
    const { movieData, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
  }
}