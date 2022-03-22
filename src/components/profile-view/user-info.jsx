
import React from 'react';
import {  Card} from 'react-bootstrap';
import './profile-view.scss';

export function UserInfo(props) {
  return (
    <Card id='movie-card'>
      <h4>Your Info</h4>
      <p>Name: { Name } </p>
      <p>Email: { Email } </p>
    </Card>
    
  )
}
