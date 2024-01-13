import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

import { supabase } from "../supabase/client";
const SignupPage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include at least one letter and one number";
    }

    // Validate repeat password
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form fields
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Your form submission logic goes here
    // For example, you can make an API call or perform other actions
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });
      if (error) throw error;
      alert("Check your email");
    } catch (error) {
      alert(error);
    }

    // Reset the form fields and errors after submission if needed
    setFormData({
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
    setErrors({ username: "", email: "", password: "", repeatPassword: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm();
  };

  // useEffect(() => {
  //   validateForm();
  // }, [formData]);

  return (
    <div>
      <Container fluid className="p-3 my-5 h-custom">
        <Row>
          <Col col="10" md="6">
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              fluid
              alt="Sample image"
            />
          </Col>

          <Col col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign up with</p>

              <Button variant="primary" className="me-2">
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>

              <Button variant="info" className="me-2">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>

              <Button variant="primary" className="me-2">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Button>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  size="lg"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Password"
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <FormControl
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  size="lg"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                />
                {errors.repeatPassword && (
                  <p className="text-danger">{errors.repeatPassword}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </Form.Group>

              <div className="d-flex justify-content-between mb-4">
                <Form.Check
                  type="checkbox"
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>
              <div className="text-center text-md-start mt-4 pt-2">
                <Button
                  variant="primary"
                  className="mb-0 px-5"
                  size="lg"
                  type="submit"
                >
                  Signup
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="link-danger"
                    onClick={scrollToTop}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>

        {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>

          <div>
            <Button variant="none" className="mx-3" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faFacebookF} size="md" />
            </Button>

            <Button variant="none" className="mx-3" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faTwitter} size="md" />
            </Button>

            <Button variant="none" className="mx-3" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faLinkedinIn} size="md" />
            </Button>
          </div>
        </div> */}
      </Container>
    </div>
  );
};

export default SignupPage;
