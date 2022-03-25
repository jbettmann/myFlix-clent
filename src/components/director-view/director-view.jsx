import React from 'react';
import {Container, Card, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick, movies } = this.props;

        return (
            <Container >
              <Card id='movie-card'>
                  <Card.Body>
                      <Card.Title>{director.Name}</Card.Title>
                      <Card.Text>
                          <span className="label">Bio: </span>
                          <span className="value">{director.Bio}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="label">Birth: </span>
                          <span className="value">{director.Birth}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="label">Death: </span>
                          <span className="value">{director.Death}</span>
                      </Card.Text>

                      <Button variant="light" onClick={() => { onBackClick(); }}>Back</Button>
                  </Card.Body>
              </Card>
              <Row className="favorite-movie">
                {movies.map(movie => (
                  <Card id="movie-card " className="card-content mt-1" key={movie._id} >
                    <Link to={`/movies/${movie._id}`}> 
                      <Card.Img
                        className="fav-poster"
                        variant="top"
                        src={movie.ImageUrl}
                        crossOrigin="true" />
                    </Link>
                  </Card>
                ))}
              </Row>
            </Container>
        );
    }
}