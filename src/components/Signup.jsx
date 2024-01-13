import React from "react";

const Signup = () => {
  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <h3 className="text-center">Sign Up</h3>
        <div className="mb-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="form-control"
          />
        </div>
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

        <div className="d-grid">
          <button className="btn btn-primary">Sign Up</button>
        </div>

        {/* //do sth here */}
        <p>
          <a href="" className="ms-2">
            Sign up
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signup;
