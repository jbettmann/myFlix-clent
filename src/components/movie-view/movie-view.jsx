import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

    render() {
        // movieData is "name of the prop" used in <MovieCard ... />
        const { movie, onBackClick, addFavoriteMovie } = this.props;
        return (
            <Card id="movie-card" variant="dark">
              <Card.Img src={movie.ImageUrl} className="movie-poster" />
                <Card.Body>
                  <Card.Title className="movie-title" >{movie.Title}</Card.Title>
                  <Card.Text >
                    <div className="movie-view-div" >
                      <span className="label"> Description: </span>
                      <span className="value"> {movie.Description} </span>
                    </div>
                    <div className="movie-view-div">
                      <span className="label">Genre: </span>
                      <Link id="noLinkLook" to={`/genres/${movie.Genre.Name}`}> {movie.Genre.Name}</Link>
                    </div>
                    <div className="movie-view-div">
                      <span className="label">Director:</span>
                      <Link id="noLinkLook" to={`/directors/${movie.Director.Name}`}> {movie.Director.Name}</Link>
                    </div >
                    <div className="movie-view-div">
                      <span className="label">Release Date: </span>
                      <span className="value">{movie.Release}</span>
                    </div>
                    <div className="movie-view-div">
                      <span className="label">Actors: </span>
                      <span className="value">{movie.Actors}</span>
                    </div>
                    <div className="movie-view-div">
                      <span className="label">Featured: </span>
                      <span className="value">{movie.Featured}</span>
                    </div>
                  </Card.Text>
                    {/* button sets selectedMovie to null, allowing MainView to stop rendering MovieView */}
                    <Button variant="light" onClick={() => { onBackClick(); }}>Back</Button>
                    <Button id='btn-link' variant="link" onClick={(e) => addFavoriteMovie(e, movie)} >Add To Favorites</Button>     
                </Card.Body>
            </Card>
        )
    }
}

// <Card id="movie-card" variant="dark">
// <Card.Img variant="top" src={movieData.ImageUrl} />
// <Card.Body >
//   <Card.Title >{movieData.Title}</Card.Title>
//   <Card.Text>{movieData.Description}</Card.Text>
//   <Link to={`/movies/${movieData._id}`}>
//     <Button id='btn-link' variant="link" addFavoriteMovie={(e) => { this.addFavorite(e, movieData) }}>Open</Button>
//   </Link>  
//     <Button id='btn-link' variant="link" value={movieData._id} onClick={(e) => this.addFavorite(e, movieData)} >Add To Favorites</Button>      
// </Card.Body>
// </Card>