import React, { Component, useState } from 'react';
import './index.css'



class SixthSection extends Component {
  constructor(props) {
    super(props);

  }
  playVideo() {
  }
  render() {

    return (
      <div className="SixthSection">
        <div className="container SixthSectionInner col-lg-12 col-md-12 col-sm-12 col-12">
          <h4 className="font-bold wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">The Amazing Team</h4>
          <p className="center-text wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus.</p>
          <div className="display-flex">
            <div className="team-div wow fadeInDown" data-wow-duration="2s" data-wow-delay="0.5s">
              <img width="140px" style={{ borderRadius: 70, boxShadow: "0px 0px 20px -6px rgba(0,0,0,0.50)", marginBottom: 20 }} src={require("../../assets/image/james.jpg")} />
              <p className="font-bold text-grey mv-0">Ryan Tompson</p>
              <p className="text-grey font-12 mv-0">Web Developer</p>
              <div className="row mt-20">
                <i href="#" style={{ color: "#fff" }} class="fa fa-twitter round-orange"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-facebook round-orange"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-linkedin round-orange"></i>
              </div>
            </div>
            <div className="team-div wow fadeInDown" data-wow-duration="2s" data-wow-delay="0.5s">
              <img  width="140px" style={{ borderRadius: 70, boxShadow: "0px 0px 20px -6px rgba(0,0,0,0.50)", marginBottom: 20 }} src={require("../../assets/image/james.jpg")} />
              <p className="font-bold text-grey mv-0">Ryan Tompson</p>
              <p className="text-grey font-12 mv-0">Web Developer</p>
              <div className="row mt-20">
                <i href="#" style={{ color: "#fff" }} class="fa fa-twitter round-blue"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-facebook round-blue"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-linkedin round-blue"></i>
              </div>
            </div>
            <div className="team-div wow fadeInDown" data-wow-duration="2s" data-wow-delay="0.5s">
              <img  width="140px" style={{ borderRadius: 70, boxShadow: "0px 0px 20px -6px rgba(0,0,0,0.50)", marginBottom: 20 }} src={require("../../assets/image/james.jpg")} />
              <p className="font-bold text-grey mv-0">Ryan Tompson</p>
              <p className="text-grey font-12 mv-0">Web Developer</p>
              <div className="row mt-20">
                <i href="#" style={{ color: "#fff" }} class="fa fa-twitter round-lightblue"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-facebook round-lightblue"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-linkedin round-lightblue"></i>
              </div>
            </div>
            <div className="team-div wow fadeInDown" data-wow-duration="2s" data-wow-delay="0.5s">
              <img  width="140px" style={{ borderRadius: 70, boxShadow: "0px 0px 20px -6px rgba(0,0,0,0.50)", marginBottom: 20 }} src={require("../../assets/image/james.jpg")} />
              <p className="font-bold text-grey mv-0">Ryan Tompson</p>
              <p className="text-grey font-12 mv-0">Web Developer</p>
              <div className="row mt-20">
                <i href="#" style={{ color: "#fff" }} class="fa fa-twitter round-green"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-facebook round-green"></i>
                <i href="#" style={{ color: "#fff" }} class="fa fa-linkedin round-green"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SixthSection;