import React, { Component } from 'react'
// import { css } from "@emotion/core";
import { BounceLoader } from "react-spinners";
import { Row } from 'react-bootstrap';

// const override = css`
//   display: block;
//   margin: 15% auto;
// `;
 
export default class Spinner extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: true
  //   };
  // }
 
  render() {
    return (
      <div className="sweet-loading spinner-loader">
        <BounceLoader
          size={40}
          color={"blue"}
          loader={true}
          // loading={this.state.loading}
        />
      <Row className="spinner-text">Loading</Row>
      </div>
    );
  }
}