
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
  // set useState() to empty string. useState returns array of paired values destructured by []
  // useState() creats local state and preserves between render cycles. 
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');


  // Declare hook for each input
  // Could also do [values, setValues] = useState({nameErr: '', usernameErr: '', etc...})
  const [ nameErr, setnameErr ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if(!name){
      setNameErr('Your name is required');
      isReq = false;

    } else if(username.length < 5){
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }

    if(!username){
      setUsernameErr('Username required');
      isReq = false;

    } else if(username.length < 5){
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }

    if(!password){
      setPasswordErr('Password Required');
      isReq = false;

    } else if(password.length < 6){
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }

    if(!email){
      setEmailErr('Email Required');
      isReq = false;
  
    } else if(email.indexOf('@', '.') === -1){
      setEmailErr('You must enter a valid email address');
      isReq = false;
    }

    if(!birthday){
      setBirthdayErr('Your birthday is required');
      isReq = false;
  
    } else if(birthday !== 'Date'){
      setBirthdayErr('You must add a vaild birthday. ie. DD-MM-YYYY');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    // prevents default behavior of page refresh/reload when button clicked/submited from <button type="submit".
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post ('https://jordansmyflix.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert(`You have succesfully registarted ${data.Name}, please login!` )

        window.open('/', '_self'); // '_self' so page opens in current tap
      })
      .catch(response => {
        const data = response.data;
        console.error(data);
        alert(`Opps ${data.Name}, somethings when wrong. Unable to register`);
      });
    }
  };

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder='First and Last required' value={name} onChange={e => setName(e.target.value)} />
            {/* Display validation error */}
            {nameErr && <p>{nameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder='Enter username (required)' value={username} onChange={e => setUsername(e.target.value)} />
            {/* Display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder='Enter password (required)' value={password} onChange={e => setPassword(e.target.value)} />
            {/* Display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder='Enter email (required)' value={email} onChange={e => setEmail(e.target.value)} />
            {/* Display validation error */}
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" placeholder='Enter birthday (required)' value={birthday} onChange={e => setBirthday(e.target.value)} />
            {/* Display validation error */}
            {birthdayErr && <p>{birthdayErr}</p>}
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
          <p></p>
          <p><Link to={'/'}>Already Registered?</Link></p>
        </Form>
      </Col>
    </Row>
    
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.number.isRequired
  })
};