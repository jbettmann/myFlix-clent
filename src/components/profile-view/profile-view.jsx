import { userInfo } from 'os';
import React from 'react';
import UserInfo from './user-info';
import UserUpdate from './user-update';
import  FavoriteMoviesList  from './favorite-movies';
import { Card, Container, Row } from 'react-bootstrap';

export function ProfileView(props) {

  const favoriteMoviesList = {};


  return (
    <Container> 
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserUpdate handleSubmit={ handleSubmit } handleUpdate={ handleUpdate } />
            </Card.Body>
          </Card>
        </Col>
        <FavoriteMoviesList favoriteMoviesList={favoriteMoviesList}/>
      </Row>
    </Container>

  )
}
