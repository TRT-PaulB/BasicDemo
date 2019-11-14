import Form from "../common/form";
import React, { Component } from "react";
import Joi from "joi";
import { getMetadataLinks, getProductMetadata } from "../services/queryService";

class SearchMetadata extends Form {

  state = {
    data: {
      param1: "",
      searchTypeChoice: "General Search"
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
    searchTypeChoice: Joi.string()
    .required()
  };

 async queryMetadataForProducts(srchParam) {
    const output = await getMetadataLinks("XXN-MXX1");
    this.setState({srchMeta: {output: output}});
  }

  async queryProductMetadata(metaLink) {
    const output = await getProductMetadata(metaLink);
    this.setState({srchMeta: {output: output}});
  }

  doReset = (event) => {
    this.setState({ data: {param1: "", searchTypeChoice: "General Search"}, srchMeta: {output: ""}  });
  };

  doSubmit = () => {
    const { param1, searchTypeChoice } = this.state.data;
    if (searchTypeChoice === "General Search") {
      this.queryMetadataForProducts(param1);  
    } else if (searchTypeChoice === "Specific Product Metadata") {
      this.queryProductMetadata(param1);   
    }
  };

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

              <div className="data-box">
                 <div className="sub-title">
                    <h4>Build Query</h4>
                 </div>
                 {this.renderSelect("searchTypeChoice", "Search Type", false, srchTypeData, "900px", "General Search")}
                 {this.renderInput("param1", "Param1", true, "700px")}

                 <div className="btn-group">
                    {this.renderButton("Search", "btn btn-primary m-2")}
                    <button id="reset-btn" type="button" className="btn btn-warning m-2" onClick={this.doReset}>Reset</button>
                 </div>
                 
              </div>
            </form>

            <div className="vertical-spacer"></div> 

            <div className="output-box">
                <div className="sub-title">
                    <h4>Output</h4>
                </div>
                {this.renderReadOnlyTextArea(
                  "data.output",
                  "Output",
                  false,
                  "",
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






