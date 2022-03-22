import React from "react";
import {  Row, Col, Spinner } from 'react-bootstrap';

export function SpinnerView() {
  return (
    <Row className="login-view justify-content-sm-center align-items-center"> 
      <Col sm="auto">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  )
}