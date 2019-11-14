import React from "react";

const TextArea = ({ name, label, error, width, ...rest }) => {
  return (
    <div className="form-group">
      <textarea id={name} name={name} className="form-control" width={width} {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
