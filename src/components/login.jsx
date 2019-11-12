import React from "react";
import Joi from "joi";
import Form from "../common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"), 
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        
        // put the error against the username field only
        errors.username = e.response.data; 
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", false, "300px", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;

