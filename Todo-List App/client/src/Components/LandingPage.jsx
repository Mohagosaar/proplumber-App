import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Container>
        <Row
          className="justify-content-center align-items-center text-center"
          style={{ minHeight: "100vh" }}
        >
          <Col md={8}>
            <h1 className="display-4">Welcome to Your To-Do List App</h1>
            <p className="lead">
              Manage your tasks efficiently and never miss a deadline.
            </p>
            {/* <Button
              href="/todo-app"
              variant="primary"
              size="lg"
              className="m-2"
            >
              Get Started
            </Button> */}
            <Button
              href="/login"
              variant="outline-primary"
              size="lg"
              className="m-2"
            >
              Login
            </Button>
            <Button
              href="/register"
              variant="outline-secondary"
              size="lg"
              className="m-2"
            >
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
