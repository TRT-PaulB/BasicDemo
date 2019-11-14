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
      .required(),
    password: Joi.string()
      .required()
  };

  doSubmit = async () => {
    try {
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data; 
        this.setState({ errors });
      }
    }
  };

  doReset = (event) => {
    this.setState({ data: {username: "", password: ""}});
  };

  render() {
    return (
      <React.Fragment>
          <div className="main-content">
            <form onSubmit={this.handleSubmit} >
              <div className="page-title">
                <h1>Search Product Metadata</h1>
              </div>

              <div className="external-data-box">
                <div className="sub-title">
                    <h4>Login</h4>
                </div>
                
                {this.renderInput("username", "Username", true, "700px")}
                {this.renderInput("password", "Password", true, "700px", "password")}

                <div className="btn-group">
                    {this.renderButton("Login", "btn btn-primary m-2")}
                    <button id="reset-btn" type="button" className="btn btn-warning m-2" onClick={this.doReset}>Reset</button>
                </div>
                
              </div>
            </form>  
          </div>  
      </React.Fragment>
    );
  }
}

export default LoginForm;

