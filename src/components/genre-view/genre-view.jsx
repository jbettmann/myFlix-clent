import React from 'react'
import PropTypes from 'prop-types';
import { Row, Card, Button, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './genre-view.scss';

export function GenreView ({genre, onBackClick, movies}) {
 
    return (
      <Container>
        <Row>
          <Col>
            <Card id="movie-card" variant="dark">
                <Card.Body>
                    <Card.Title >{genre.Name}</Card.Title>
                    <Card.Text>
                        <span className="label">Description: </span>
                        <span className="value">{genre.Description}</span>
                    </Card.Text>

                    <Button variant="light" onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
          </Col>
        </Row>
        <br></br>
       
          <Row id="favorite-movie">
            {movies.map(movie => (
              <Col md={3} sm={4} xs={6} className="mt-1" key={movie._id} >   
                  <Link to={`/movies/${movie._id}`}>  
                    <Card.Img
                        className="fav-poster"
                        variant="top"
                        src={movie.ImageUrl}
                        crossOrigin="true" />
                  </Link>     
              </Col>
            ))} 
          </Row> 
          
      </Container>
    );
  }



GenreView.proptypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};