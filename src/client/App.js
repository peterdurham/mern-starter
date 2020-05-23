import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import isEmpty from "../server/validation/is-empty";
import setAuthToken from "./utils/setAuthToken";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import { Switch, Route, Link, withRouter } from "react-router-dom";
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

  const logoutUser = () => {
    localStorage.removeItem("jwtToken");
    setAuth({ isAuthenticated: false, user: {} });
  };

  return (
    <div id="container">
      <div id="nav">
        <div>
          <Link to="/">MERN Starter</Link>
        </div>
        <nav id="nav-links">
          {auth.isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            </>
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

      <div style={{ width: "840px", margin: "0 auto", display: "flex" }}></div>
      <Switch>
        <Route exact path="/">
          <div style={{ width: "420px" }}>
            <Posts />
          </div>
          <div>component would go here</div>
        </Route>
        <Route path="/register">
          <Register auth={auth} setAuth={setAuth} history={props.history} />
        </Route>
        <Route path="/login">
          <Login
            auth={auth}
            setAuth={setAuth}
            setAuthToken={setAuthToken}
            history={props.history}
          />{" "}
        </Route>
        <Route path="/dashboard">
          <div>
            <h2>Dashboard</h2>

            {username ? (
              <h1>{`Hello ${username}`}</h1>
            ) : (
              <h1>Loading.. please wait!</h1>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
