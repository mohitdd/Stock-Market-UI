import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import App from "../App";

class Login extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/stocks/">Stocks</Link>
          <Route
            path="/:Mohit"
            exact
            render={({ match }) => {
              return <h1>Welcome User {match.params.Mohit}</h1>;
            }}
          />
          <Route path="/stocks/" exact strict component={App} />
        </div>
      </Router>
    );
  }
}

export default Login;
