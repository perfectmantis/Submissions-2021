import React, { Component, useState } from 'react';
import './index.css'



class FourthSection extends Component {
  constructor(props) {
    super(props);

  }
  playVideo() {
  }
  render() {

    return (
      <div className="FourthSection">
        <div className="container FourthSectionInner col-lg-10 col-md-12 col-sm-12 col-12">
          <div className="fourth-left col-lg-9">
            <div className="Forth-Heading-1 text-white wow fadeInDown" data-wow-duration="1s" data-wow-delay="1s">
              Download our app
            </div>
            <p className="forth-sub-heading text-white wow fadeInDown" data-wow-duration="1s" data-wow-delay="1s">
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua.Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi
            </p>
            <div className="row">
              <img width="150px" className="wow fadeInDown" data-wow-duration="1s" data-wow-delay="1s" style={{ marginRight: 10 }} src={require("../../assets/image/gp-footer.png")} />
              <img width="150px" className="wow fadeInDown" data-wow-duration="1s" data-wow-delay="1s" src={require("../../assets/image/app-footer.png")} />
            </div>
          </div>
          <img width="400px" style={{marginLeft:-200,zIndex:2}} src={require("../../assets/image/bg-05.png")} />
        </div>
      </div>
    )
  }
}

export default FourthSection;