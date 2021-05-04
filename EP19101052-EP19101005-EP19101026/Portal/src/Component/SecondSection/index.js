import React, { Component, useState } from 'react';
import './index.css'



class SecondSection extends Component {
  constructor(props) {
    super(props);

  }
  playVideo() {
  }
  render() {

    return (
      <div className="SecondSection">
        <div className="container col-lg-10 col-md-12 col-sm-12 col-12">
          <div className="blackcolor Heading-1 widthsecond wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            Services
          </div>
          <div>
            <p className="sub-heading-1 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            This App allows user to file complaints or missing reports and keep a track of it</p>
          </div>

          <div className="display-flex-row">
            <div className="box wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1.5s">
              <img width="80px" height="80px" src={require("../../assets/img/crime.png")} />
              <p className="font-bold">Crime</p>
              <p className="box-inner-sub-text">A crime is an unlawful act punishable by a state or other authority</p>
              <div className="row">
                <p className="red-round">ADD</p>
                <p className="red-round">REPORT</p>
                <p className="red-round">DELETE</p>
              </div>
              <button className="btn btn-red">Crime Report</button>
            </div>
            <div className="box wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1.5s">
              <img width="80px" height="80px" src={require("../../assets/img/compaints.png")} />
              <p className="font-bold">Complaints</p>
              <p className="box-inner-sub-text">A complaints statement that something is unsatisfactory or unacceptable</p>
              <div className="row">
              <p className="red-round">ADD</p>
                <p className="red-round">REPORT</p>
                <p className="red-round">DELETE</p>
              </div>
              <button className="btn btn-yellow">Complaints Report</button>
            </div>
            <div className="box wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1.5s">
              <img width="80px" height="80px" src={require("../../assets/img/missing.png")} />
              <p className="font-bold">Missing</p>
              <p className="box-inner-sub-text">A thing not able to be found because it is not in its expected place</p>
              <div className="row">
              <p className="red-round">ADD</p>
                <p className="red-round">REPORT</p>
                <p className="red-round">DELETE</p>
              </div>
              <button className="btn btn-blue">Missing Report</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SecondSection;