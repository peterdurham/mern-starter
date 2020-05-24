import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../server/validation/is-empty";
import setAuthToken from "./utils/setAuthToken";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import "./styles.css";

function App(props) {
  const [username, setUsername] = useState(null);
  const [auth, setAuth] = useState({ isAuthenticated: false, user: {} });

  useEffect(() => {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((data) => setUsername(data.username));

    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);

      setAuth({
        ...auth,
        user: decoded,
        isAuthenticated: !isEmpty(decoded),
      });

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logoutUser();
        setAuthToken(false);
      }
    }
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("jwtToken");
    setAuth({ isAuthenticated: false, user: {} });
    setAuthToken(false);
  };

  return (
    <div id="container">
      <div id="nav">
        <div>
          <Link to="/">{username}&apos;s MERN Starter</Link>
        </div>

        <nav id="nav-links">
          {auth.isAuthenticated ? (
            <li>
              <button id="logout" onClick={logoutUser}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </nav>
      </div>

      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>
        <Route path="/register">
          <Register setAuth={setAuth} history={props.history} />
        </Route>
        <Route path="/login">
          <Login setAuth={setAuth} history={props.history} />{" "}
        </Route>
      </Switch>
    </div>
  );
}
App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
