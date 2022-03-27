import React, { useEffect, useState } from 'react';
import {Container, Card, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DirectorView = ({directorName, onBackClick, movies}) => {

        // const { directorName, onBackClick, movies } = props;

        const [d, setDirector] = useState({})
        useEffect(() => {
           let token = localStorage.getItem('token');
           console.log('directorName', directorName)
           if (token) {
             axios.get(`https://jordansmyflix.herokuapp.com/movies/directors/${directorName}`, {
               headers: {authorization: `Bearer ${token}`}
             }).then(response => {
               setDirector({
                 Name: response.data[0].Name,
                 Birth: response.data[0].Birth,
                 Death: response.data[0].Death,
                 Bio: response.data[0].Bio
               })
               console.log(response.data[0].Name)
             }).catch(error => {
               console.log('error:', error)
             })
           }
        }, [])

        return (
            <Container >
              <Card id='movie-card'>
                  <Card.Body>
                      <Card.Title>{d.Name}</Card.Title>
                      <Card.Text>
                          <span className="label">Bio: </span>
                          <span className="value">{d.Bio}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="label">Birth: </span>
                          <span className="value">{d.Birth}</span>
                      </Card.Text>
                      <Card.Text>
                          <span className="label">Death: </span>
                          <span className="value">{d.Death}</span>
                      </Card.Text>

                      <Button variant="light" onClick={() => { onBackClick(); }}>Back</Button>
                  </Card.Body>
              </Card>
              <Row className="favorite-movie">
                {/* {movies.map(movie => (
                  <Card id="movie-card " className="card-content mt-1" key={movie._id} >
                    <Link to={`/movies/${movie._id}`}> 
                      <Card.Img
                        className="fav-poster"
                        variant="top"
                        src={movie.ImageUrl}
                        crossOrigin="true" />
                    </Link>
                  </Card>
                ))} */}
              </Row>
            </Container>
        );
}