import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./common/navbar";
import LoginForm from "./components/login";
import SearchMetadata from "./components/search-metadata";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import auth from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
      const user = auth.getCurentUser();
      this.setState({ user });  
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/search-metadata" exact component={SearchMetadata} />
            <Redirect from="/" exact to="/search-metadata" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
