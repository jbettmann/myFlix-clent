import { remove } from 'immutable'
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Col, Figure, Row } from 'react-bootstrap'; 
import './profile-view.scss'

export function FavoriteMovies( {favoriteMoviesList} ) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12} >
            <h2>Favortie Movies</h2>
          </Col>
        </Row>
        <Row>
            {favoriteMoviesList.map(({ Title, ImageUrl, _id} ) => {
              return(
                <Col xs={12} sm={6} md={6} lg={3} key={_id} id='fav-movies'>
                  <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImageUrl} crossOrigin="true" alt={Title}/>
                    <Figure.Caption>
                      {Title}
                    </Figure.Caption>
                  </Link>
                  </Figure>
                  <Button variant="secondary"  onClick={() => remove.fav(_id)}>Remove from list</Button>
                </Col>
                )
              })
            }
        </Row>  
      </Card.Body>
    </Card>
  )
}
