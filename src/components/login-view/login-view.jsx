
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  // set useState() to empty string. useState returns array of paired values destructured by []
  // useState() creats local state and preserves between render cycles. 
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    // prevents default behavior of page refresh/reload when button clicked/submited from <button type="submit".
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
      <Card>
        <Card.Body id='card_body'>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="light" type="submit" onClick={handleSubmit}>Submit</Button>
          </Form>
          <Button variant="link">Register</Button>
        </Card.Body>
      </Card>
     
  );
}
