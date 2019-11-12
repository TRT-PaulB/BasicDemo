import Form from "../common/form";
import React, { Component } from "react";
import Joi from "joi";
import { getMetadataLinks } from "../services/queryService";


class SearchMetadata extends Form {
  state = {
    data: {
      param1: "",
    },
    errors: {},    
    srchMeta: {
      output: ""
    },
    selectedMetadata: ""
  };

  schema = {
    _id: Joi.string(),
    param1: Joi.string()
      .required()
      .label("CSD Param")
  };

 async queryMetadataForProducts(param1) {
    console.log("about to query the XXX to get metadata links for products which match the input string: " + param1);
    const output = await getMetadataLinks("XXN-MXX1");
    this.setState({srchMeta: {output: output}});
  }

  doReset = (event) => {
    const { param1 } = this.state.data;
    console.log("reseting param1 value '" + param1 + "' ' to blank");
    this.setState({ data: {param1: ""}, srchMeta: {output: ""}  });
  };

  doSubmit = () => {
    const { param1 } = this.state.data;
    this.queryMetadataForProducts(param1);  
  };
  
  render() {
    const { srchMeta } = this.state;
    
    return (
      <React.Fragment>
          <div className="main-content">
            <form onSubmit={this.handleSubmit} >
              <div className="lower-space">
                <h1>Search for Product Metadata Links</h1>
              </div>

              <div className="dataBox">
                  {this.renderInput(
                    "param1",
                    "Param1",
                    true,
                    "700px"
                  )}
                  
                  {this.renderButton("Search", "btn btn-primary m-2")}
                  <button id="reset-btn" type="button" className="btn btn-warning m-2" onClick={this.doReset}>Reset</button>
              </div>
            </form>

          <div className="outputBox">
                {this.renderReadOnlyTextArea(
                "data.output",
                "Output",
                false,
                "200px",
                "10",
                srchMeta.output
              )}

          </div>  
        </div>  
        
      </React.Fragment>
    );
  }
}

export default SearchMetadata;





