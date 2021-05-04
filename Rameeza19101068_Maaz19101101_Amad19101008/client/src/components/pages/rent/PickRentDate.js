import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomer } from "../../../actions/rentproduct";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import shortid from "shortid";
import * as moment from "moment";
import DatePicker from "react-datepicker";

import { OCAlert } from "@opuscapita/react-alerts";
class PickRentDate extends Component {
  state = {
    customer_id: "",
    rentDate: "",
    returnDate: "",
    redirect: false,
    m_returnDate: "",
    extraDays: "",
    final_date: "",
    extraDaysAmount: 0,
    ExtraDaysAfter_wm:''
  };
  async componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.setState({
        customer_id: state.customer,
      });
    }
  }

  rentDateValidity = () => {
    let { rentDate } = this.state;
    var currentdate = moment(rentDate).format("YYYY-MM-DD");
    const r_date = moment(new Date()).format("YYYY-MM-DD");
    var isToday = moment(r_date).isSameOrBefore(currentdate); // true
    const rent = new Date(rentDate);

    if (isToday === false && rent.getTime() - new Date().getTime() < 0) {
      OCAlert.alertError(`Invalid Date`, { timeOut: 3000 });
      this.focousOut(isToday);
      return;
    } else if (rent.getTime() - new Date().getTime() > 0 || isToday === true) {
      var threeDaysAfter =
        new Date(rentDate).getTime() + 2 * 24 * 60 * 60 * 1000;
      var momentthreeDaysAfter = moment(threeDaysAfter).format("DD-MM-YYYY");
      this.state.returnDate = momentthreeDaysAfter;

      this.state.m_returnDate = moment(threeDaysAfter).format("YYYY-MM-DD");
    }
  };

  handleChangeForDate = (date) => {
    this.setState({ rentDate: date });
  };
  focousOut(value) {
    if (value === false) {
      this.setState({ rentDate: "", returnDate: "" });
    }
  }
  onAddExtraDate = () => {
    let { m_returnDate, extraDays } = this.state;
    if (extraDays !== "") {
      //   var currentdate = moment(m_returnDate).format("YYYY-MM-DD");
      const r_date = moment(new Date()).format("YYYY-MM-DD");
      var isToday = moment(r_date).isSameOrBefore(m_returnDate); // true
      const rent = new Date(m_returnDate);
      if (isToday === false && rent.getTime() - new Date().getTime() < 0) {
        OCAlert.alertError(`Invalid Date`, { timeOut: 3000 });
        this.focousOut(isToday);
        return;
      } else if (
        rent.getTime() - new Date().getTime() > 0 ||
        isToday === true
      ) {
        var ExtraDaysAfter =
          new Date(m_returnDate).getTime() +
          Number(extraDays) * 24 * 60 * 60 * 1000;
         
        var ExtraDaysAfter_wm = moment(ExtraDaysAfter).format("DD-MM-YYYY");
      this.state.ExtraDaysAfter_wm = ExtraDaysAfter_wm;
        this.state.final_date = moment(ExtraDaysAfter).format("YYYY-MM-DD");
      }
    } else {
      this.state.final_date = "";
    }
  };
  handleChangeForExtraDays = (e) => {
    this.setState({ extraDays: e.target.value });
  };

  onNextPage = () => {
    const { customer } = this.props;
    let {
      extraDaysAmount,
      extraDays,
      rentDate,
      final_date,
      m_returnDate,
      customer_id,
    } = this.state;
    if (rentDate == "") {
      OCAlert.alertError(`Rent Date is Required`, { timeOut: 3000 });
      return;
    }
    if (
      extraDays != "" &&
      extraDays != 0 &&
      (extraDaysAmount == "" || extraDaysAmount == 0)
    ) {
      OCAlert.alertError(`Please Enter Amount`, { timeOut: 3000 });
      return;
    }
    let data = {
      rentDate: rentDate,
      returnDate: m_returnDate,
    };
    if (extraDays && final_date && extraDaysAmount) {
      data["returnDate"] = final_date;
      data["extraDays"] = Number(extraDays);
      data["extraDaysAmount"] = extraDaysAmount;
    }
    this.props.history.push("checkout", { customer: customer_id, data });
    //   checkout
  };

  render() {
    const { auth } = this.props;
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("Rentproduct")) {
        return <Redirect to="/Error" />;
      }
    }
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.location.state === undefined) {
      return <Redirect to="/rentproduct" />;
    }

    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="form-action-layouts">
                  <div className="form-body">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Rent a Product</h4>
                        <h5>Please pick your rent date</h5>
                      </div>
                      <div className="card-content">
                        <div className="card-body">
                          <div id="colors_box">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6 text-center">
                                  <label className="text-center" id="setName">
                                    Start Date
                                  </label>
                                </div>

                                <div className="col-md-6 text-center">
                                  <label className="text-center" id="setName">
                                    Due Date
                                  </label>
                                </div>
                              </div>

                              <div className="row justify-content-center">
                                <div className="col-md-6 text-center">
                                  <DatePicker
                                    id="issueinput4"
                                    // locale="vi"
                                    autoComplete={"off"}
                                    selected={this.state.rentDate}
                                    className="form-control round text-center"
                                    onChange={(e) =>
                                      this.handleChangeForDate(e)
                                    }
                                    onInput={this.rentDateValidity()}
                                    dateFormat="dd-MM-yyyy"
                                    popperPlacement="top-start"
                                  />
                                </div>

                                <div className="col-md-6 text-center">
                                  <input
                                    id="issueinput4"
                                    className="form-control round text-center"
                                    name="returnDate"
                                    style={{
                                      border: "1px solid #A6A9AE",
                                      color: "#75787d",
                                      padding: "0.375rem 0.75rem",
                                      lineHeight: "1.5",
                                    }}
                                    required
                                    readOnly
                                    data-title="Return Date"
                                    value={
                                      this.state.returnDate === "Invalid date"
                                        ? ""
                                        : this.state.returnDate
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <br />

                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-6 text-center">
                                    <label className="text-center" id="setName">
                                      Add Extra Days
                                    </label>
                                  </div>

                                  <div className="col-md-6 text-center">
                                    <label className="text-center" id="setName">
                                      Final Due Date
                                    </label>
                                  </div>
                                </div>

                                <div className="row justify-content-center">
                                  <div className="col-md-6 text-center">
                                    <input
                                      type={"number"}
                                      min={0}
                                      value={this.state.extraDays}
                                      onInput={this.onAddExtraDate()}
                                      className="form-control round text-center"
                                      onChange={(e) =>
                                        this.handleChangeForExtraDays(e)
                                      }
                                    />
                                  </div>

                                  <div className="col-md-6 text-center">
                                    <input
                                      id="issueinput4"
                                      className="form-control round text-center"
                                      name="final_date"
                                      style={{
                                        border: "1px solid #A6A9AE",
                                        color: "#75787d",
                                        padding: "0.375rem 0.75rem",
                                        lineHeight: "1.5",
                                      }}
                                      required
                                      readOnly
                                      data-title="Return Date"
                                      value={
                                        this.state.ExtraDaysAfter_wm === "Invalid date"
                                          ? ""
                                          : this.state.ExtraDaysAfter_wm
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="col-md-12">
                                <div className="row justify-content-center">
                                  <div className="col-md-6 text-center">
                                    <label className="text-center">
                                      Extra Days Amount
                                    </label>
                                    <input
                                      type={"number"}
                                      min={0}
                                      //   value={this.state.extraDaysAmount}
                                      className="form-control round text-center"
                                      onChange={(e) =>
                                        this.setState({
                                          extraDaysAmount: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <br />
                              <div className="col-md-12">
                                <div className="row justify-content-center">
                                  <div className="col-md-6 text-center">
                                    <button
                                      type="button"
                                      className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                      onClick={this.onNextPage}
                                    >
                                      <i className="ft-check"></i> Next
                                    </button>
                                    {/* <Link
                                      to={{
                                        pathname: "/pickrentdate",
                                        //   state:{ customer :!!this.props.customer.length
                                        //     ? this.props.customer[0]._id
                                        //     : ""},
                                      }}
                                      type="button"
                                      className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                      id="btnSize2"
                                    >
                                      <i className="ft-check"></i> Next
                                    </Link> */}
                                  </div>
                                  <div></div>
                                </div>
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
            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2">
                <span>
               " "All rights reserved.{" "}
                </span>
              </p>
            </footer>
          </div>
        </div>
        <OCAlertsProvider />
      </React.Fragment>
    );
  }
}

// PickRentDate.propTypes = {
//   saved: PropTypes.bool,
//   getCustomer: PropTypes.func.isRequired,
//   auth: PropTypes.object,
//   customer: PropTypes.array,
// };

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
  customer: state.customer.customer,
});
export default connect(mapStateToProps, {
  getCustomer,
})(PickRentDate);
