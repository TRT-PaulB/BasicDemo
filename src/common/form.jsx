import React, { Component } from "react";
import Joi from "joi";
import Input from "./input";
import Select from "./select";
import TextArea from "./textArea";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  
  validateWithJoi = () => {
    // params:  binding object, validation definition
    const option = { abortEarly: false }; // ie do not terminate validation as soon as Joi finds an error
    const result = Joi.validate(this.state.data, this.schema, option);

    if (!result.error) return null; // no Joi error

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path] = item.message; // creates an errors map / array of different paths (ie. property names)
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; // name of input property supplied dynamically
    const schema = { [name]: this.schema[name] };

    // note we want to abort early, so as not to display all errors at once
    const { error } = Joi.validate(obj, schema); 
    
    // if there is an error on this input component, return the first error details string
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateWithJoi();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  renderButton = (label, classname = "btn btn-primary") => {
    return (
      <button disabled={this.validateWithJoi()} className={classname}>
        {label}
      </button>
    );
  };

  renderInput = (propName, label, autoFocus, width, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={propName}
        label={label}
        width={width}
        value={data[propName]} 
        onChange={this.handleChange}
        error={errors[propName]} 
        autoFocus={autoFocus}
      />
    );
  };

  renderReadOnlyTextArea = (propName, label, autoFocus, width, rows, value) => {
    return (
      <TextArea
        name={propName}
        label={label}
        onChange={this.handleChange}
        autoFocus={autoFocus}
        width={width}
        rows={rows}
        value={value}
      />
    );
  };

  renderSelect = (propName, label, autoFocus, options, width, defaultVal) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={propName}
        width={width}
        label={label}
        defaultVal={defaultVal}
        value={data[propName]} 
        autoFocus={autoFocus}
        options={options}
        error={errors[propName]} 
        onChange={this.handleChange} 
      />
    );
  };
}

export default Form;
