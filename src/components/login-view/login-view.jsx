
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setUser, validateInput } from '../../actions/actions';
import { connect } from 'react-redux';

import './login-view.scss';

export function LoginView(props) {

  useEffect(() => {
    setUser({ Username: '', Password: '' });
  }, []);
  // set useState() to empty string. useState returns array of paired values destructured by []
  // useState() creats local state and preserves between render cycles. 

// Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs
const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('*Username Required');
     isReq = false;
    }else if(username.length < 2){
     setUsernameErr('*Username must be 2 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('*Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPasswordErr('*Password must be 6 characters long');
     isReq = false;
    }

    return isReq;
}

  const handleSubmit = (e) => {
    // prevents default behavior of page refresh/reload when button clicked/submited from <button type="submit".
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
    axios.post('https://jordansmyflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    // onLoggedIn passed through prop is called. We grab the "data" becuase we want username AND token.
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }
};

  return (
    <Row className="login-view justify-content-sm-center align-items-center"> 
      <Col sm="auto">
        <Container>
          <Card id="movie-card"> 
            <Card.Body id='card_body'>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" value={username} onChange={e => validateInput(e.target.value, 'Username')} />
                  {/* Display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => validateInput(e.target.value, 'Password')} />
                  {/* Display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button variant="light" type="submit" onClick={handleSubmit}>Submit</Button>
              </Form>
              <Link to={`/register`}>
                <Button id="btn-link" variant="link">Register</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container> 
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  // props object MUST include a movie object. .shape({...}) means object
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { setUser, validateInput })(LoginView);