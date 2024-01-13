import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Style/LoginSignUp.css";

const LoginSignUp = () => {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div>
      {values.map((v, idx) => (
        <Button
          key={idx}
          className="me-2 mb-2 square rounded-pill"
          onClick={() => handleShow(v)}
        >
          Login / Sign Up
          {typeof v === "string" && `below ${v.split("-")[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/000/401/986/non_2x/vector-people-volunteering-and-donating-money-and-items-to-a-charitable-cause.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="login template">
            <div className=" p-5 rounded bg-white">
              <h3 className="text-center">Sign In</h3>
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  type="checkbox"
                  className="custom-control custom-checkbox"
                  id="check"
                />
                <label htmlFor="check" className="custom-input-label ms-2">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Sign In</button>
              </div>
              {/* //do sth here */}
              <p>
                Forgot<a href="">Password?</a>
                <a href="" className="ms-2">
                  Sign up
                </a>{" "}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginSignUp;
