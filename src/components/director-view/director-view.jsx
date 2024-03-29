import React, { useEffect, useState } from 'react';
import {Container, Card, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DirectorView = ({directorName, onBackClick, movies}) => {

        // const { directorName, onBackClick, movies } = props;

        const [director, setDirector] = useState([])
        
        useEffect(() => {
           let token = localStorage.getItem('token');
           console.log('directorName', directorName)
           if (token) {
             axios.get(`https://my-flix-app.vercel.app/movies/directors/${directorName}`, {
               headers: {authorization: `Bearer ${token}`}
             }).then(response => {
               setDirector(response.data)
             }).catch(error => {
               console.log('error:', error)
             })
           }
        }, [])

      console.log(movies);

        return (
            <Container > 
              <Card id='movie-card'>
               {director.map((d, i) => {
                 if (d.Name === directorName) {
                  return (
                    <Card.Body key={i}>   
                        <Card.Title >{d.Name}</Card.Title>
                        <Card.Text align="left">
                            <span className="label">Bio: </span>
                            <span className="value">{d.Bio}</span>
                        </Card.Text>
                        <Card.Text align="left">
                            <span className="label">Birth: </span>
                            <span className="value">{d.Birth}</span>
                        </Card.Text>
                        <Card.Text align="left">
                            <span className="label">Death: </span>
                            <span className="value">{d.Death}</span>
                        </Card.Text>  
                        <Button variant="light" onClick={() => { onBackClick(); }}>Back</Button>  
                    </Card.Body>
                  )}
               })}
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