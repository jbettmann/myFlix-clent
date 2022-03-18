import React from 'react';
import {Container, Card, Button, Row} from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick, movies } = this.props;

        return (
            <Container >
              <Card id='movie-card'>
                  <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text>
                          <span className="label">Name: </span>
                          <span className="value">{director.Name}</span>
                      </Card.Text>
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
              <Card>
                <Card.Body>
                  <Row>
                    {movies.map(movie => (
                      <Card className="favorite-movie card-content" key={movie._id} >
                        <Card.Img
                          className="fav-poster"
                          variant="top"
                          src={movie.ImageUrl} />
                        <Card.Body>
                          <Card.Title className="movie_title">
                            {movie.Title}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Container>
        );
    }
}