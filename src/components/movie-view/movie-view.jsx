import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

    render() {
        // movieData is "name of the prop" used in <MovieCard ... />
        const { movie, onBackClick } = this.props;
        return (
            <Card id="movie-card" variant="dark">
                <Card.Body>
                    <div className="movie-poster">
                      <img src={movie.ImageUrl} />
                    </div>
                    <div className="movie-title">
                      <span className="label">Title: </span>
                      <span className="value">{movie.Title}</span>
                    </div>
                    <div className="movie-description">
                      <span className="label">Description: </span>
                      <span className="value">{movie.Description}</span>
                    </div>
                    <div className="movie-genre">
                      <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button id="noLinkLook" variant="link">{movie.Genre.Name}</Button>
                    </Link>
                    </div>
                    <div className="movie-director">
                      <span className="label">Director: </span>
                    <Link  to={`/directors/${movie.Director.Name}`}>
                        <Button id="noLinkLook" variant="link">{movie.Director.Name}</Button>
                    </Link>
                    </div>
                    <div className="movie-releaseDate">
                      <span className="label">Release Date: </span>
                      <span className="value">{movie.Release}</span>
                    </div>
                    <div className="movie-actors">
                      <span className="label">Actors: </span>
                      <span className="value">{movie.Actors}</span>
                    </div>
                    <div className="movie-featured">
                      <span className="label">Featured: </span>
                      <span className="value">{movie.Featured}</span>
                    </div>
                    {/* button sets selectedMovie to null, allowing MainView to stop rendering MovieView */}
                    <Button variant="light" onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        )
    }
}
