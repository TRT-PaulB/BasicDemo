import Form from "../common/form";
import React, { Component } from "react";
import Joi from "joi";
import { getMetadataLinks, getProductMetadata } from "../services/queryService";

class SearchMetadata extends Form {

  state = {
    data: {
      param1: "",
      searchTypeChoice: ""
    },
    errors: {},    
    srchMeta: {
      output: ""
    },
    searchTypes: ["General Search", "Specific Product Metadata"],
  };

  schema = {
    _id: Joi.string(),
    param1: Joi.string()
      .required(),
      //.label("Search Param"),
    searchTypeChoice: Joi.string()
    .required()
    //.label("Search Param"),  
  };

 async queryMetadataForProducts(srchParam) {
    console.log("query the XXX to get metadata links for products which match the input string: " + srchParam);
    const output = await getMetadataLinks("XXN-MXX1");
    this.setState({srchMeta: {output: output}});
  }

  async queryProductMetadata(metaLink) {
    console.log("query the XXX to get the metadata for a particular product: " + metaLink);
    const output = await getProductMetadata(metaLink);
    this.setState({srchMeta: {output: output}});
  }

  doReset = (event) => {
    const { param1 } = this.state.data;
    console.log("reseting param1 value '" + param1 + "' ' to blank");
    this.setState({ data: {param1: ""}, srchMeta: {output: ""}  });
  };

  doSubmit = () => {
    const { param1, searchTypeChoice } = this.state.data;
    if (searchTypeChoice === "General Search") {
      this.queryMetadataForProducts(param1);  
    } else if (searchTypeChoice === "Specific Product Metadata") {
      this.queryProductMetadata(param1);   
    }
  };

  manageComboChange(comboId) {
    if (comboId === "searchTypeChoice") {
        console.log("combo has changed value..." + comboId);
    }
  }

  render() {
    const { srchMeta, searchTypes } = this.state;
    
    const srchTypeData = searchTypes.map((s)=> { 
      return { _id: s, name: s }; 
    }); 

    return (
      <React.Fragment>
          <div className="main-content">
            <form onSubmit={this.handleSubmit} >
              <div className="page-title">
                <h1>Search Product Metadata</h1>
              </div>

              <div className="dataBox">
                 <div className="sub-title">
                    <h4>Build Query</h4>
                 </div>
                 {this.renderSelect("searchTypeChoice", "Search Type", false, srchTypeData, "900px")}
                 {this.renderInput("param1", "Param1", true, "700px")}

                 <div className="btn-group">
                    {this.renderButton("Search", "btn btn-primary m-2")}
                    <button id="reset-btn" type="button" className="btn btn-warning m-2" onClick={this.doReset}>Reset</button>
                 </div>
                 
              </div>
            </form>

          <div className="outputBox">

              <div className="sub-title">
                  <h4>Output</h4>
              </div>
           
                {this.renderReadOnlyTextArea(
                  "data.output",
                  "Output",
                  false,
                  "90%",
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

// state = {
//   data: {
//     start: "",
//     destination: ""
//   },


// schema = {
//   _id: Joi.string(),
//   start: Joi.string()
//     .required()
//     .label("Start"),
//   destination: Joi.string()
//     .required()
//     .label("Destination"),
// };

// {this.renderSelect(
//   "searchType",
//   "Serch Type",
//   false,
//   stations,
//   "300px"
// )}









