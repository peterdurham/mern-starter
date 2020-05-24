import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import isEmpty from "../server/validation/is-empty";
import axios from "axios";
import PropTypes from "prop-types";
import setAuthToken from "./utils/setAuthToken";

function Register({ history, setAuth }) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post("/api/users/register", newUser);

      const loginResponse = await axios.post("/api/users/login", userData);
      const loginData = await loginResponse.data;

      const { token } = loginData;
      await localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);

      setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded,
      });

      setErrors({});
      setEmail("");
      setPassword("");
      history.push("/");
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
          {errors.email && <span className="red">{errors.email}</span>}
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
          {errors.password && <span className="red">{errors.password}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
Register.propTypes = {
  setAuth: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Register;
