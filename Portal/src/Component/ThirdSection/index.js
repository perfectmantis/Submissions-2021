import React, { Component, useState } from 'react';
import './index.css'
import card1 from '../../assets/img/thirdsec1.png'
import card2 from '../../assets/img/thirdsec2.png'
import card3 from '../../assets/img/thirdsec3.png'
import card4 from '../../assets/img/thirdsec4.png'
import card5 from '../../assets/img/thirdsec5.png'
import card6 from '../../assets/img/thirdsec6.png'



class ThirdSection extends Component {
  constructor(props) {
    super(props);

  }
  playVideo() {
  }
  render() {

    const cardWidth = {
      width: '100%'
    }

    return (
      <div className="ThirdSection">
        <div className="container col-lg-10 col-md-12 col-sm-12 col-12">

           <div className="blackcolor Heading-1 widthsecond wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            Recent Reports
          </div>
          <div>
            <p className="sub-heading-1 wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div> 



      
          <div className="display-flex-row">

            <div className="third-left col-lg-4">
              <div className="card" style={cardWidth}>
                <img className="card-img-top" src={card1} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Crime Report</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" classclassName="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>


            <div className="third-left col-lg-4">
              <div className="card" style={cardWidth}>
                <img className="card-img-top" src={card2} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Mobile Snatching</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" classclassName="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>



            <div className="third-left col-lg-4">
              <div className="card" style={cardWidth}>
                <img className="card-img-top" src={card3} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Person Missing</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" classclassName="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>

          <div className="display-flex-row">

            <div className="third-left col-lg-4">
              <div className="card" style={cardWidth}>
                <img className="card-img-top" src={card4} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Complain</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" classclassName="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>


            <div className="third-left col-lg-4">
              <div className="card" style={cardWidth}>
                <img className="card-img-top" src={card5} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Vehicle Snatching</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" classclassName="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>


            <div className="third-left col-lg-4">
              <div className="card" style={cardWidth}>
                <img className="card-img-top" src={card6} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" classclassName="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default ThirdSection;
