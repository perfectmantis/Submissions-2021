import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import MPagination from "../../../components/pagination/MPagination";
import logo1 from "./aa.png";
import logo2 from "./logo1.png";
import logo3 from "./logo2.png";
class SelectType extends Component {
  render() {
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Header />
          <Sidebar location={this.props.location} />
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="extended">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">Select Coupons Type</h4>
                        </div>
                        <div className="card-content">
                          <div className="card-body table-responsive">
                            <div className="row">
                              <div className="col-md-4"></div>
                              <div className="col-md-4"></div>
                              <div className="col-md-4"></div>
                            </div>
                            <div className="row">
                              <div class="col-md-4">
                                <Link to={"/coupons/add"}>
                                  <img src={logo1} />
                                </Link>
                              </div>
                              <div class="col-md-4">
                                <img src={logo2} />
                              </div>
                              <div class="col-md-4">
                                <img src={logo3} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>

          <footer className="footer footer-static footer-light">
            <p className="clearfix text-muted text-sm-center px-2">
              <span>
                All rights reserved.{" "}
              </span>
            </p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default SelectType;
