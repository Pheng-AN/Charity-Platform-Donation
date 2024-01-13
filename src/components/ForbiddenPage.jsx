import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const goBack = () => {
    window.history.back();
  };
  const navigate = useNavigate();
  const navigateToLogin = () => {
    // Navigate to the login page
    // window.location.href = "/login";

    navigate("/login");
  };
  const navigateToHome = () => {
    // window.location.href = "/";

    navigate("/");
  };
  return (
    <div>
      <div className="bg-dark text-white py-5">
        <Container className="py-5">
          <Row>
            <Col md={2} className="text-center">
              <p>
                <i className="fa fa-exclamation-triangle fa-5x"></i>
                <br />
                Status Code: 403
              </p>
            </Col>
            <Col md={10}>
              <h3>OPPSSS!!!! Sorry...</h3>
              <p>
                Sorry, your access is refused due to security reasons of our
                server and also our sensitive data.
                <br />
                Please go back to the previous page to continue browsing.
              </p>
              <div className="d-flex gap-2">
                <Button variant="danger" onClick={navigateToHome}>
                  Go Back
                </Button>
                <Button variant="primary" onClick={navigateToLogin}>
                  Login or Signup
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <div id="footer" className="text-center">
          Ich verstehe nicht
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
