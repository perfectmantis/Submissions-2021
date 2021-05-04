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

class RentProduct extends Component {
  state = {
    customerNumber: "",
    customer: "",
    showCustomerBox: false,
    showErrorBox: false,
  };

  CutomerBox = () => {
    const { customer } = this.props;
    const { customerInfo } = this.state;

    return (
      <>
        {customer ? (
          <div id="colors_box">
            <div className="row">
              <div className="col-md-12">
                <h3>Is this the One</h3>
              </div>
            </div>

            <div className="row color-row">
              <div className="col-md-12">
                <div className="form-group">
                  <h3>Customer is on-File</h3>
                </div>
              </div>
              <div className="col-md-12">
                <div id="sizes_box">
                  <div className="row">
                    <div className="left">
                      <input
                        id="name"
                        type="text"
                        className="form-control mm-input text-center"
                        style={{ color: "#495057" }}
                        value={customerInfo[0].name}
                        readOnly
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="left">
                      <input
                        id="number"
                        type="number"
                        className="form-control mm-input text-center"
                        style={{ color: "#495057" }}
                        value={customerInfo[0].contactnumber}
                        readOnly
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="left">
                      <textarea
                        id="address"
                        type="text"
                        className="form-control mm-input text-center"
                        style={{ color: "#495057" }}
                        value={customerInfo[0].address}
                        readOnly
                      ></textarea>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row justify-content-center">
                  <Link
                   to={{
                      pathname: "/pickrentdate",
                      state:{ customer :!!this.props.customer.length
                        ? this.props.customer[0]._id
                        : ""},
                    }}
                    type="button"
                    className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                    id="btnSize2"
                  >
                    <i className="ft-check"></i> Next
                  </Link>
                  <button
                    type="button"
                    className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                    onClick={(e) => this.tryAgain(e)}
                    id="btnSize"
                  >
                    <i className="ft-rotate-cw"></i> Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  tryAgain = (e) => {
    e.preventDefault();
    e.target.value = "";
    this.setState({
      customerInfo: "",
      customer: "",
      showCustomerBox: false,
      showErrorBox: "",
    });
    var contactnumber = document.getElementById("contactnumber");
    var number = document.getElementById("number");
    var name = document.getElementById("name");
    var address = document.getElementById("address");
    contactnumber.focus();
    number.value = " ";
    name.value = " ";
    address.value = " ";
  };

  NoCustomerBox = () => {
    const { customer } = this.props;
    if (!(customer.length > 0) || customer === null) {
      return (
        <>
          <div id="colors_box">
            <div className="row">
              <div className="col-md-12">
                <div id="sizes_box">
                  <div className="row">
                    <input
                      type="text"
                      className="form-control mm-input text-center"
                      style={{ color: "#495057", width: "95%" }}
                      value={"No Customer Found!! Try again"}
                      readOnly
                    />
                  </div>
                  <br />
                  <div className="row justify-content-center">
                    <Link
                      to="/customer/addcustomer"
                      type="button"
                      target={"_blank"}
                      className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                      id="btnSize1"
                    >
                      <i className="ft-user"></i> New Customer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  onSubmitCustomer = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });
    const state = { ...this.state };
    await this.props.getCustomer(state.customerNumber);
    const { customer } = this.props;
    this.setState({ customerNumber: "" });

    if (customer.length > 0) {
      this.setState({
        customerInfo: customer,
        showCustomerBox: true,
        showErrorBox: false,
      });
    } else if (!(customer.length > 0)) {
      this.setState({
        showCustomerBox: false,
        showErrorBox: true,
      });
    }
    this.setState({ customer: customer, saving: false });
    // contactnumber.value = "";
  };

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearState = (e) => {
    e.preventDefault();
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
                      </div>
                      <div className="card-content">
                        <div className="card-body table-responsive">
                          <form onSubmit={(e) => this.onSubmitCustomer(e)}>
                            <div className="form-group">
                              <h3>Enter Customer 10-digit phone number</h3>
                              <div className="position-relative has-icon-right">
                                <input
                                  name="customerNumber"
                                  type="text"
                                  placeholder="Search"
                                  className="form-control round"
                                  id="contactnumber"
                                  min="0"
                                  defaultValue={this.state.customerNumber}
                                  onChange={(e) => this.handleChange(e)}
                                />
                                <div className="form-control-position">
                                  <button
                                    type="submit"
                                    className="mb-2 mr-2 btn ft-search"
                                  ></button>
                                </div>
                              </div>
                            </div>

                            {this.state.showCustomerBox === true
                              ? this.CutomerBox()
                              : ""}
                            {this.state.showErrorBox === true
                              ? this.NoCustomerBox()
                              : ""}
                          </form>
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

RentProduct.propTypes = {
  saved: PropTypes.bool,
  getCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object,
  customer: PropTypes.array,
};

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
  customer: state.customer.customer,
});
export default connect(mapStateToProps, {
  getCustomer,
})(RentProduct);
