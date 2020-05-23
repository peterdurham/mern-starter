import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import isEmpty from "../server/validation/is-empty";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

function Register(props) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post("/api/users/register", newUser);
      const data = response.data;
      setErrors({});
      setEmail("");
      setPassword("");
      props.history.push("/");
    } catch (e) {
      setErrors(e.response.data);
    }
  };

  return (
    <div>
      <h3>Register: </h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && (
            <span style={{ color: "#b90e0a" }}>{errors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && (
            <span style={{ color: "#b90e0a" }}>{errors.password}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
