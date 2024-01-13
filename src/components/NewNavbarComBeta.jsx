import React, { useState } from "react";
import "./Style/Navbar.css";

import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import LoginSignUp from "./LoginSignUp";

const NewNavbarComBeta = ({ token, setToken }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showNavbarCollapse, setShowNavbarCollapse] = useState(false);

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
    setShowNavbarCollapse(false);
  };

  let navigate = useNavigate();
  function handleLogout() {
    // Display a confirmation alert
    const userConfirmed = window.confirm("Are you sure you want to logout?");

    // If the user confirms, proceed with logout
    if (userConfirmed) {
      sessionStorage.removeItem("token");
      setToken(null); // Assuming null represents no token
      navigate("/");
      // Close offcanvas
      closeOffcanvas();
    }
    // If the user cancels, do nothing or handle it accordingly
  }

  // function handleLogout() {
  //   sessionStorage.removeItem("token");
  //   setToken(null); // Assuming null represents no token
  //   navigate("/");
  //   // Close offcanvas
  //   closeOffcanvas();
  // }

  return (
    <div>
      <div>
        {/* <Container fluid> */}
        {["xl"].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            // bg-body-tertiary
            className=" rounded"
            style={{ backgroundColor: "#B6D7A8" }}
          >
            <Navbar.Brand as={Link} to="/" className="ml-auto p-4">
              KhmerDonor&nbsp;<i class="fa-solid fa-heart-circle-check"></i>
            </Navbar.Brand>

            <div className="m-auto">
              <Form inline>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                    />
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="ml-auto p-4">
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                onClick={() => {
                  setShowOffcanvas(!showOffcanvas);
                  setShowNavbarCollapse(true);
                }}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={showOffcanvas}
                onHide={closeOffcanvas}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <Navbar.Brand
                      as={Link}
                      to="/"
                      className="ml-auto p-4"
                      onClick={closeOffcanvas}
                    >
                      CharityWorld
                    </Navbar.Brand>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Navbar.Collapse
                    id="basic-navbar-nav"
                    in={showNavbarCollapse}
                  >
                    <Nav className="justify-content-end">
                      <Nav.Link
                        as={Link}
                        to="/discover"
                        className="nav-links px-3"
                        onClick={closeOffcanvas}
                      >
                        DISCOVER
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/raisefunds"
                        className="nav-links px-3"
                        onClick={closeOffcanvas}
                      >
                        RAISE FUNDS
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/feeds"
                        className="nav-links px-3"
                        onClick={closeOffcanvas}
                      >
                        FEEDS
                      </Nav.Link>

                      <Nav.Link    
                          as={Link}
                          to="/aboutus"
                          className="nav-links px-3"
                          onClick={closeOffcanvas}
                        >
                          ABOUT US
                      </Nav.Link>

                      <Nav.Link
                        as={Link}
                        to="/profile"
                        className="nav-links px-3"
                        onClick={closeOffcanvas}
                      >
                        PROFILE
                      </Nav.Link>

                      {token ? (
                        // If token exists, render logout button
                        <Button
                          variant="primary"
                          className="nav-links px-3"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      ) : (
                        // If no token, render login button
                        <Button
                          as={Link}
                          to="/login"
                          variant="primary"
                          className="nav-links px-3"
                          onClick={closeOffcanvas}
                        >
                          Login
                        </Button>
                      )}
                      {/* <div className="px-3">
                      <LoginSignUp />
                    </div> */}
                    </Nav>
                  </Navbar.Collapse>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Navbar>
        ))}
        {/* </Container> */}
      </div>
    </div>
  );
};

export default NewNavbarComBeta;
