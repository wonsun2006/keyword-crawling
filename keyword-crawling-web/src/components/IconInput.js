import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { BsPencil } from "react-icons/bs";

const IconInput = ({ icon, type, value, onChange, placeholder }) => {
  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>{icon || <BsPencil />}</InputGroup.Text>
            <FormControl
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default IconInput;
