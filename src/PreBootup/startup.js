import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import App from "../App";
import SignIn from "../Login/SignIn";
import SignUp from "../Register/SignUp";

class Startup extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={SignIn} />
          <Route path="/stocks/" exact strict component={App} />
          <Route path="/signUp" exact strict component={SignUp} />
        </div>
      </Router>
    );
  }
}

export default Startup;
