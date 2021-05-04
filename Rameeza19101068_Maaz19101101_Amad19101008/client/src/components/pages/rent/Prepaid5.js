import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomer } from "../../../actions/customer";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import shortid from "shortid";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import ShowPrices from "./small/ShowPrices";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";
import { addNewInvoice } from "../../../actions/invoices";
import {
  getProductById,
  getAllProducts,
  updateProductIndex,
} from "../../../actions/product";
import { getOrderbyOrderNumber } from "../../../actions/returnproduct";
import { addNewRentProduct, getLastRecord } from "../../../actions/rentproduct";
import { vi } from "date-fns/esm/locale";
import axios from "axios";

var JsBarcode = require("jsbarcode");

class Prepaid5 extends Component {
  state = {
    CustomerPay: false,
    rentedOrder: "",
    product_Array: [],
    barcode_Array: [],
    insuranceAmt: 0,
    total: 0,
    total_owe: 0,
    pay_amount: "",
    pdfData: "",
    redirect: false,
    customer_id:'',
  };
  async componentDidMount() {
    const { state } = this.props.location;
    console.log("state", state);
    if (state) {
      this.setState({
         customer_id: state.customer_id,
        barcode_Array: state.barcode_Array,
        rentedOrder: state.rentedOrder,
        product_Array: state.product_Array,
        insuranceAmt: state.rentedOrder.insuranceAmt,
        total: state.rentedOrder.total,
        pdfData: state.pdfData,
      });
    }
    await this.props.getCustomer(state.customer_id);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });
    const state = { ...this.state };
    const objData = state.rentedOrder;
    objData["pay_amount"] = state.pay_amount;
    await this.props.addNewRentProduct(objData);

    await this.props.getOrderbyOrderNumber(state.orderNumber);
    const { order, auth } = this.props;
    if (this.props.generateInvoice === true) {
      if (order && state.orderBarcode && state.orderNumber) {
        const invoiceRent = {
          order_id: order[0]._id,
          customer_id: order[0].customer,
          user_id: auth.user._id,
          type: "Rent-Invoice",
          orderBarcode: state.orderNumber,
        };
        await this.props.addNewInvoice(invoiceRent);
      }
      this.printBarcode(state.orderNumber);
    }
    // let { product_Array } = this.state;

    // if (product_Array) {
    //   let products = [];
    //   // let counter = 1;

    //   product_Array.forEach(async (pd, p_index) => {
    //     await this.props.getProductById(pd[0].product_id); // <-- Error is here this should give updated product in every loop

    //     let { product } = this.props;
    //     // counter++;
    //     if (product) {
    //       product.color.forEach((color, c_index) => {
    //         // get right color obj
    //         if (color._id == pd[0].color_id) {
    //           // get right size obj
    //           if (color.sizes) {
    //             color.sizes.forEach((size, s_index) => {
    //               if (size.id == pd[0].size_id) {
    //                 // check if current size obj contain barcodes or not
    //                 if (size.barcodes) {
    //                   // Add isRented
    //                   let bcode = {
    //                     barcode: size.barcodes[pd[0].barcodeIndex].barcode,
    //                   };
    //                   this.props.updateProductIndex(bcode, pd[0].product_id);
    //                 }
    //               }
    //             });
    //           }
    //         }
    //       });
    //       products.push(product);
    //       product = null;
    //     }
    //   });
    // }
    this.printInvoice();
    this.redirect();
  };
  printInvoice = () => {
    var css =
      '<link rel="stylesheet"  href="%PUBLIC_URL%/assets/css/app.css"/>';
    var printDiv = document.getElementById("invoiceDiv").innerHTML;

    let newWindow = window.open(
      "",
      "_blank",
      "location=yes,height=570,width=720,scrollbars=yes,status=yes"
    );
    newWindow.document.body.innerHTML = css + printDiv;
    newWindow.window.print();
    newWindow.document.close();
  };

  printBarcode = (barcode) => {
    return JsBarcode("#barcode", barcode, {
      width: 1.5,
      height: 40,
    });
  };
  onChangePay = (e) => {
    this.setState({ pay_amount: e.target.value });
  };
  redirect = () => {
    this.setState({
      redirect: true,
    });
  };
  getInvoiceBarcodeRecord() {
    let { product_Array } = this.state;
    return product_Array.map((product, b_index) => (
      <tr>
        <td className="text-center">{product[0].barcode}</td>
        <td className="text-center">{product[0].title}</td>
        <td className="text-center">{product[0].color}</td>
        <td className="text-center">{product[0].price}</td>
      </tr>
    ));
  }

  render() {
    const { auth, order } = this.props;
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("Rentproduct")) {
        return <Redirect to="/Error" />;
      }
    }
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.state.redirect === true) {
      return <Redirect to="/rentproduct" />;
    }
    if (this.props.location.state === undefined) {
      return <Redirect to="/rentproduct" />;
    }
    const {
      CustomerPay,
      insuranceAmt,
      total,
      pay_amount,
      rentedOrder,
      pdfData,
    } = this.state;
    const { customer } = this.props;
    console.log("customer--",customer)
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
                        <h5>{CustomerPay ? "Pay" : "Prepaid"} </h5>
                      </div>
                      <div className="card-content">
                        <div className="card-body">
                          <div id="colors_box">
                            {CustomerPay ? (
                              <React.Fragment>
                                <h3 className="text-center">
                                  Customer Pay today :
                                  <strong>
                                    <span className="text-warning ml-2">
                                      {pay_amount} Rupees
                                    </span>
                                  </strong>
                                </h3>
                                <br />
                                <h1 className="text-center">
                                  Please take{" "}
                                  <strong>
                                    <span className="text-success">
                                      {pay_amount} Rupees{" "}
                                    </span>
                                  </strong>
                                  from the customer.
                                </h1>
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                  <div className="row text-center">
                                    <div className="col-md-12 btn-cont">
                                      <div className="form-group">
                                        <button
                                          type="submit"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                          id="btnSize2"
                                        >
                                          <i className="ft-check"></i>
                                          Submit &amp; Get Invoice
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </React.Fragment>
                            ) : (
                              <ShowPrices
                                onChangePay={this.onChangePay}
                                insuranceAmt={insuranceAmt}
                                total={total}
                                pay_amount={pay_amount}
                              />
                            )}

                            <div>
                              <br />

                              <div></div>
                              <br />
                              <div className="col-md-12">
                                <div className="row justify-content-center">
                                  <div className="col-md-6 text-center">
                                    {CustomerPay ? (
                                      <button
                                        type="button"
                                        className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                        onClick={() =>
                                          this.setState({ CustomerPay: false })
                                        }
                                      >
                                        <i className="ft-check"></i> Back
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                        onClick={() => {
                                          if (this.state.pay_amount == "") {
                                            OCAlert.alertError(
                                              `Pay Amount is required `,
                                              { timeOut: 3000 }
                                            );
                                            return;
                                          } else {
                                            this.setState({
                                              CustomerPay: true,
                                            });
                                          }
                                        }}
                                      >
                                        <i className="ft-check"></i> Next
                                      </button>
                                    )}
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

        {/* pdf invoice  */}

        <div id="invoiceDiv" style={{ width: "100%", display: "none" }}>
          <h1 style={{ "text-align": "center" }}>
            {customer ? `${customer.name}${"#"}${customer.contactnumber}` : ""}
          </h1>
          <h1 style={{ "text-align": "center" }}>
            {this.state.orderNumber
              ? `${"Order"}${"#"} ${
                  rentedOrder && rentedOrder ? rentedOrder.orderNumber : ""
                }`
              : ""}
          </h1>

          <table style={{ width: "100%" }} cellpadding="10">
            <thead></thead>
            <tbody>{this.getInvoiceBarcodeRecord()}</tbody>
          </table>
          <hr />
          <table style={{ width: "100%" }} cellpadding="10">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: "90%" }}>Total Without Tax</td>
                <td>{`${pdfData ? pdfData.total_without_tax : 0}`}</td>
              </tr>
              <tr>
                <td style={{ width: "90%" }}>Discount</td>
                <td>{`${pdfData && pdfData ? pdfData.discount_amount : 0}`}</td>
              </tr>
              <tr>
                <td>Tax Percentage</td>
                <td>{`${pdfData && pdfData ? pdfData.taxper : 0}${"%"}`}</td>
              </tr>

              <tr>
                <td>Tax Amount</td>
                <td>{`${pdfData && pdfData ? pdfData.tax : 0}`}</td>
              </tr>
              <tr>
                <td>Insurance Amount</td>
                <td>{`${pdfData ? pdfData.insAmt : 0}`}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <h4 style={{ "text-align": "center" }}>{`${"PAID TOTAL: "}${
            this.state.total
          }`}</h4>
          <br />

          <table style={{ width: "100%" }} cellpadding="10">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: "90%" }}>Leave ID</td>
                <td>{this.state.leaveID == "true" ? `${"Yes"}` : `${"No"}`}</td>
              </tr>
              <tr>
                <td>Rent From</td>
                <td>
                  {" "}
                  {rentedOrder && rentedOrder
                    ? moment(rentedOrder.rentDate).format("DD-MM-YYYY")
                    : ""}
                </td>
              </tr>
              <tr>
                <td>Return Date</td>
                <td>
                  {rentedOrder && rentedOrder
                    ? moment(rentedOrder.returnDate).format("DD-MM-YYYY")
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>

          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              <tr>
                <td
                  className="col-md-6"
                  style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: "8px",
                    width: "50%",
                  }}
                >
                  <svg id="barcode"></svg>
                </td>
                <td
                  className="col-md-6"
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    width: "50%",
                  }}
                >
                  Authorized by <br />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <br />

          <table style={{ width: "100%" }}>
            <thead></thead>
            <tbody>
              <tr>
               
              </tr>
            </tbody>
          </table>
        </div>

        {/* Invoice Modal */}
        <div
          className="modal fade text-left"
          id="primary"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel8"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary white">
                <h4 className="modal-title text-center" id="myModalLabel8">
                  Invoice
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <button
                  type="button"
                  className=""
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span
                    className="fa fa-print"
                    aria-hidden="true"
                    onClick={(e) => this.printInvoice(e)}
                  ></span>
                </button>
              </div>
              <div className="modal-body">
                <div id="colors_box" id="modal-body">
                  <div className="row color-row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="text-center">
                          <h4>
                            {customer
                              ? `${customer.name}${"#"}${
                                  customer.contactnumber
                                }`
                              : ""}
                          </h4>
                        </div>
                        <div className="text-center">
                          <h4>
                            {order
                              ? `${"Order"}${"#"} ${order[0].orderNumber}`
                              : ""}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        {this.getInvoiceBarcodeRecord()}
                        <hr />
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6 id="padLeft">Total Without Tax</h6>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "center", color: "black" }}
                          >
                            <h6>{`${this.state.total_amt}`}</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6 id="padLeft">Tax Percentage</h6>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "center", color: "black" }}
                          >
                            <h6>{`${this.state.taxper}${"%"}`}</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6 id="padLeft">Tax Amount</h6>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "center", color: "black" }}
                          >
                            <h6>{`${this.state.tax}`}</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6 id="padLeft">Insurance Amount</h6>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "center", color: "black" }}
                          >
                            <h6>{`${this.state.insAmt}`}</h6>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="form-group">
                            <div className="" style={{ width: "300%" }}>
                              <input
                                type="text"
                                readOnly
                                className="form-control mm-input s-input text-center"
                                placeholder="Total"
                                style={{ color: "black" }}
                                id="setSizeFloat"
                                value={`${"PAID TOTAL: $"}${this.state.total}`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6>Amount to be returned to customer</h6>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "center", color: "black" }}
                          >
                            <h6>{`${this.state.insAmt}`}</h6>
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6 id="padLeft">Leave ID</h6>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ textAlign: "center", color: "black" }}
                          >
                            <h6>
                              {this.state.leaveID == "true"
                                ? `${"Yes"}`
                                : `${"No"}`}
                            </h6>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6 id="padLeft">Rent From</h6>
                          </div>
                          <div style={{ textAlign: "end", color: "black" }}>
                            <h6 style={{ textAlign: "end", color: "black" }}>
                              {rentedOrder && rentedOrder
                                ? moment(rentedOrder.rentDate).format(
                                    "DD-MM-YYYY"
                                  )
                                : ""}
                            </h6>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="col-md-6"
                            style={{ float: "left", color: "black" }}
                          >
                            <h6>Return Date</h6>
                          </div>

                          <div style={{ textAlign: "end", color: "black" }}>
                            <h6 style={{ textAlign: "end", color: "black" }}>
                              {rentedOrder && rentedOrder
                                ? moment(rentedOrder.returnDate).format(
                                    "DD-MM-YYYY"
                                  )
                                : ""}
                              {/* {rentedOrder && rentedOrder?rentedOrder.returnDate:''} */}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <table>
                            <tbody>
                              <tr>
                                <td
                                  className="col-md-6"
                                  style={{
                                    backgroundColor: "white",
                                    textAlign: "center",
                                    padding: "8px",
                                    width: "50%",
                                  }}
                                >
                                  <svg id="barcode"></svg>
                                </td>
                                <td
                                  className="col-md-6"
                                  style={{
                                    textAlign: "center",
                                    padding: "8px",
                                    width: "50%",
                                  }}
                                >
                                  Authorized by <br />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="row">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Prepaid5.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  addNewRentProduct: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  updateProductIndex: PropTypes.func.isRequired,
  getOrderbyOrderNumber: PropTypes.func.isRequired,
  addNewInvoice: PropTypes.func.isRequired,
  getLastRecord: PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.array,
  customer: PropTypes.array,
  order: PropTypes.array,
  saved: PropTypes.bool,
  generateInvoice: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  product: state.product.product,
  auth: state.auth,
  lastRecord: state.rentproduct.lastrecord,
  order: state.returnproduct.returnproduct,
  products: state.product.products,
  customer: state.customer.customer,
  generateInvoice: state.rentproduct.generateInvoice,
  saved: state.product.saved,
});
export default connect(mapStateToProps, {
  getAllProducts,
  getCustomer,
  addNewRentProduct,
  getProductById,
  updateProductIndex,
  addNewInvoice,
  getOrderbyOrderNumber,
  getLastRecord,
})(Prepaid5);
