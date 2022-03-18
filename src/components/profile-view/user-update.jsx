import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function UserUpdate({ handleSubmit, handleUpdate }) {
  return (
    <>
    <h2>Update Profile</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type='text' name='Username' defaultValue={user.Username} placeholder="Enter new username" required onChange={e => handleUpdate(e)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='Password' defaultValue='' placeholder="Your password must be at least 8 characters" minLength="8" required onChange={e => handleUpdate(e)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' name='Email' defaultValue={user.Email} placeholder="Enter new email" onChange={e => handleUpdate(e.target.value)} required />
        </Form.Group>
        <Button id="btn-link" type='submit'>Update</Button>
      </Form>
     </>
  )
}
