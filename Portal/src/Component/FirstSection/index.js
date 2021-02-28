import React, { Component, useState } from 'react';
import './FirstSection.css'

class FirstSection extends Component {
  constructor(props) {
    super(props);

  }
  playVideo() {
  }
  render() {

    return (
      <div className="FirstSection">
        <div className="container leftSide col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="Heading-1 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
          Crime Management System
          </div>
          <p className="sub-heading-1 text-white wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
          It is an era of computerization and data security. To combat with increasing rate of crimes and criminals (CRAPF) is introduce
          </p>
          <div className="row">
            <button className="btn btn-red-round wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">Login</button>
            
            <button className="btn btn-border-round wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">Singup</button>
          </div>
        </div>
        {/* <div className="rightSide col-lg-7 col-md-12 col-sm-12 col-12">
          <div className="yellow-box-outer">
            <div className="yellow-box">
              <img width="100px" src={Delivery} />
              <h5 className="font-bold text-white mt-2">DELIVERY</h5>
            </div>
          </div>
          <div className="blue-box-outer">
            <div className="blue-box">
              <img width="100px" src={TRAVELASSISTANT} />
              <h5 className="font-bold text-white mt-2">TRAVEL ASSISTANT</h5>
            </div>
          </div>
          <div className="green-box-outer">
            <div className="green-box">
              <img width="100px" src={TRAVELBUDDY} />
              <h5 className="font-bold text-white mt-2">TRAVEL BUDDY</h5>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default FirstSection;