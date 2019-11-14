import React from "react";

const Select = ({ name, label, options, error, width, ...rest }) => {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-2">
          <label className="label-type" htmlFor={name}>{label}</label>
        </div>
        <div className="col">
          <select name={name} id={name} width={width} {...rest} className="form-control">
            <option value="take" />
            {options.map(option => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Select;

