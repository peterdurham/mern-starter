import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import isEmpty from "../server/validation/is-empty";
import setAuthToken from "./utils/setAuthToken";
import Posts from "./Posts";
import Register from "./Register";
import Login from "./Login";
import "./styles.css";

function App() {
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
    <div>
      <div style={{ width: "420px", margin: "60px auto" }}>
        <h1>MERN Starter</h1>
        {username ? (
          <h1>{`Hello ${username}`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        {auth.isAuthenticated ? (
          <div>
            LOGGED IN<button onClick={logoutUser}>Logout</button>
          </div>
        ) : (
          <div>NOT LOGGED IN</div>
        )}
      </div>
      <div style={{ width: "840px", margin: "0 auto", display: "flex" }}>
        <div style={{ width: "420px" }}>
          <h2>CRUD Example</h2>
          <Posts />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "480px" }}
        >
          {" "}
          <h2>AUTH Example</h2>
          <Register auth={auth} setAuth={setAuth} />
          <Login auth={auth} setAuth={setAuth} setAuthToken={setAuthToken} />
        </div>
      </div>
    </div>
  );
}

export default App;
