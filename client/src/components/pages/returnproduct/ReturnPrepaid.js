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
// import ShowPrices from "./small/ShowPrices";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";
import { addNewInvoice } from "../../../actions/invoices";
import {
  getProductById,
  getAllProducts,
  updateProductIndex,
} from "../../../actions/product";
import { updateRentedProduct } from "../../../actions/rentproduct";
import { getOrderbyOrderNumber } from "../../../actions/returnproduct";
import { addNewRentProduct, getLastRecord } from "../../../actions/rentproduct";
import { vi } from "date-fns/esm/locale";
import axios from "axios";

var JsBarcode = require("jsbarcode");

class ReturnPrepaid extends Component {
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
    customer_id: "",
    owe_from_customer: "",
    amount_remaing: "",
    m_product: "",
    m_productarray: "",
    m_total: "",
    totalPaid: "",
    charge_data: [],
    discount_data: [],
    order:''
  };
  async componentDidMount() {
    await this.props.getAllProducts();
    const { state } = this.props.location;

    if (state) {
      this.setState({
        customer_id: state.customer_id,
        charge_data: state.charge_data,
        discount_data: state.discount_data,
        order:state.order,
        //   barcode_Array: state.barcode_Array,
        //   rentedOrder: state.rentedOrder,
        product_Array: state.product_Array,
        owe_from_customer: state.owe_from_customer,
        amount_remaing: state.amount_remaing,
        //   insuranceAmt: state.rentedOrder.insuranceAmt,
        //   total: state.rentedOrder.total,
      });
    }
    await this.props.getCustomer(state.customer_id);
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const state = { ...this.state };
    const { user } = this.props.auth;
    const { order } = this.props.location.state;
    this.setState({
      saving: true,
      generateInvoice: true,
      orderNumber: order.orderNumber,
    });
    if (state.generateInvoice === true) {
      if (order && state.orderNumber) {
        const invoiceReturn = {
          order_id: order._id,
          customer: order.customer._id,
          user_id: user._id,
          type: "Return-Invoice",
          orderBarcode: state.orderNumber,
        };
        await this.props.addNewInvoice(invoiceReturn);
      }
      this.printBarcode(state.orderNumber);
    }

    let { product_Array } = this.state;

    if (product_Array) {
      let products = [];
      // let counter = 1;

      product_Array.forEach(async (pd, p_index) => {
        await this.props.getProductById(pd[0].product_id); // <-- Error is here this should give updated product in every loop

        let { product } = this.props;
        if (product) {
          product.color.forEach((color, c_index) => {
            // get right color obj
            if (color._id === pd[0].color_id) {
              // get right size obj
              if (color.sizes) {
                color.sizes.forEach((size, s_index) => {
                  if (size.id === pd[0].size_id) {
                    // check if current size obj contain barcodes or not
                    if (size.barcodes) {
                      // Add isRented
                      let bcode = {
                        barcode: size.barcodes[pd[0].barcodeIndex].barcode,
                      };
                      this.props.updateProductIndex(bcode, pd[0].product_id);
                    }
                  }
                });
              }
            }
          });
          products.push(product);
          product = null;
        }

        const rentedProduct = {
          status: "Completed",
        };
        this.props.updateRentedProduct(rentedProduct, order._id);
      });
    }
    this.printInvoice();
    this.setState({ saving: false, orderNumber: "" });
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

  getMissingItemTotal = () => {
    let m_total = "";
    const { m_productarray } = this.state;
    m_productarray.forEach((element, element_i) => {
      m_total = Number(m_total) + Number(element[0].price);
    });
    this.state.m_total = m_total;
    return m_total;
  };
  customerOwe = () => {
    const { insuranceAmt, m_total } = this.state;
    let customerOwe;
    if (m_total > insuranceAmt) {
      customerOwe = Number(m_total) - Number(insuranceAmt);
    } else if (insuranceAmt >= m_total) {
      customerOwe = Number(insuranceAmt) - Number(m_total);
    }
    return customerOwe;
  };

  returnAmt = () => {
    const { insuranceAmt, m_total } = this.state;
    let returnAmt;
    if (m_total > insuranceAmt) {
      returnAmt = Number(m_total) - Number(insuranceAmt);
    } else if (insuranceAmt >= m_total) {
      returnAmt = Number(insuranceAmt) - Number(m_total);
    }
    return returnAmt;
  };

  finalInVoiceTotal = () => {
    const { totalPaid, insuranceAmt, missingItmCharges } = this.state;
    const finalInVoiceTotal = Number(
      Number(totalPaid) - Number(insuranceAmt) + Number(missingItmCharges)
    );
    return finalInVoiceTotal;
  };
  productBox = () => {
    let productarray = [];
    let { barcodesArray } = this.state;
    const { products } = this.props;
    if (products && barcodesArray) {
      let sortedAray = this.getSortedData(products);
      if (sortedAray) {
        barcodesArray.forEach((element) => {
          productarray.push(
            sortedAray.filter((f) => f.barcode.toString() === element.barcode)
          );
          return productarray;
        });
      }
    }
    this.state.product_Array = productarray;
    return productarray.map((b, b_index) => (
      <>
        <div id="sizes_box" key={b_index}>
          <div className="row">
            <div style={{ float: "left", width: "90%" }}>
              <table
                className="table table-bordered table-light"
                style={{
                  borderWidth: "1px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                <thead></thead>
                <tbody>
                  <tr key={b_index} style={{ margin: "3px" }}>
                    <td className="text-center">{b[0].barcode}</td>
                    <td className="text-center">{b[0].title}</td>
                    <td className="text-center">{b[0].color}</td>
                    <td className="text-center">{b[0].price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="right ml-2">
              <button
                type="button"
                className="btn btn-raised btn-sm btn-icon mt-1"
              >
                <i className="fa fa-check fa-2x text-success"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    ));
  };

  missingProducts = () => {
    let m_productarray = [];
    let { products } = this.props;
    let { orderedBarcode } = this.props.location.state;
    let { barcodesArray } = this.state;
    let m_product = [];
    if (!!barcodesArray.length) {
      barcodesArray.forEach((element, e_index) => {
        m_product = orderedBarcode.filter((f) => f !== element.barcode);
      });
      this.state.m_product = m_product;
    }
    if (products && m_product) {
      let sortedAray = this.getSortedData(products);
      if (sortedAray) {
        m_product.forEach((element) => {
          m_productarray.push(
            sortedAray.filter((f) => f.barcode.toString() === element)
          );
          return m_productarray;
        });
      }
    }
    this.state.m_productarray = m_productarray;
    return this.state.m_productarray.map((m_product, m_product_index) => (
      <>
        <div id="sizes_box" key={m_product_index}>
          <div className="row">
            <div style={{ float: "left", width: "90%" }}>
              <table
                className="table table-bordered table-light"
                style={{
                  borderWidth: "1px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                <thead></thead>
                <tbody>
                  <tr key={m_product_index} style={{ margin: "3px" }}>
                    <td className="text-center">{m_product[0].barcode}</td>
                    <td className="text-center">{m_product[0].title}</td>
                    <td className="text-center">{m_product[0].color}</td>
                    <td className="text-center">{m_product[0].price}</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>

            <div className="right ml-3">
              <button
                type="button"
                className="btn btn-raised btn-sm btn-icon btn-danger mt-2"
              >
                <i className="fa fa-minus text-white"></i>
              </button>
            </div>
            <br />
          </div>
        </div>
      </>
    ));
  };

  invoiceproductBox = () => {
    const { product_Array } = this.state;
    return product_Array.map((b, b_index) => (
      <>
        <tr key={b_index}>
          <td className="text-center">{b[0].barcode} </td>
          <td className="text-center">{b[0].title}</td>
          <td className="text-center">{b[0].color} </td>
          <td className="text-center">{b[0].price} </td>
        </tr>
      </>
    ));
  };

  m_invoiceproductBox = () => {
    const { m_productarray } = this.state;
    return m_productarray.map((b, b_index) => (
      <>
        <tr key={b_index}>
          <td className="text-center">{b[0].barcode} </td>
          <td className="text-center">{b[0].title}</td>
          <td className="text-center">{b[0].color} </td>
          <td className="text-center">{b[0].price} </td>
        </tr>
      </>
    ));
  };

  charge_array_for_pdf = () => {
    const { charge_data } = this.state;
    return charge_data.map((c, c_index) => (
      <>
        <tr key={c_index}>
          <td className="text-center">{c.name} </td>
          <td className="text-center">{c.category}</td>
          <td className="text-center">{c.amount} </td>
        </tr>
      </>
    ));
  };
  discount_array_for_pdf = () => {
    const { discount_data } = this.state;
    return discount_data.map((d, d_index) => (
      <>
        <tr key={d_index}>
          <td className="text-center">{d.name} </td>
          <td className="text-center">{d.category}</td>
          <td className="text-center">{d.amount} </td>
        </tr>
      </>
    ));
  };
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
    if (this.props.saved === true) {
      return <Redirect to="/returnproduct" />;
    }
    // if (this.state.redirect === true) {
    //   return <Redirect to="/rentproduct" />;
    // }
    // if (this.props.location.state === undefined) {
    //   return <Redirect to="/rentproduct" />;
    // }
    const { pay_amount, owe_from_customer, amount_remaing } = this.state;
    const { customer } = this.props;
    const { state } = this.props.location;
    // const { order } = state;

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
                        <h4 className="card-title">Return a Product</h4>
                        <h5>
                          {owe_from_customer
                            ? "CUSTOMER OWE SCREEN"
                            : "Refund to customer"}{" "}
                        </h5>
                      </div>
                      <div className="card-content">
                        <div className="card-body">
                          <div id="colors_box">
                            {owe_from_customer ? (
                              <React.Fragment>
                                <h3 className="text-center">
                                  Customer Owe :
                                  <strong>
                                    <span className="text-warning ml-2">
                                      {amount_remaing ? amount_remaing : 0} Rupees
                                    </span>
                                  </strong>
                                </h3>
                                <br />
                                <h1 className="text-center">
                                  Please take{" "}
                                  <strong>
                                    <span className="text-success">
                                      {amount_remaing ? amount_remaing : 0} Rupees{" "}
                                    </span>
                                  </strong>
                                  from the customer.
                                </h1>
                                <form onSubmit={this.onSubmit}>
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
                              <React.Fragment>
                                <h3 className="text-center">
                                  Refund to customer :
                                  <strong>
                                    <span className="text-warning ml-2">
                                      {amount_remaing} Rupees
                                    </span>
                                  </strong>
                                </h3>
                                <br />
                                <h1 className="text-center">
                                  Please give{" "}
                                  <strong>
                                    <span className="text-danger">
                                      {amount_remaing} Rupees{" "}
                                    </span>
                                  </strong>
                                  to the customer.
                                </h1>
                                  <hr />
                         
                                  <h3>Customer did not leave ID</h3>
                                  <hr/>
                                <form onSubmit={this.onSubmit}>
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
                            )}

                            <div>
                              <br />
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
                  </div>
                  <div className="modal-body">
                    <div id="colors_box">
                      <div className="row color-row">
                        <div className="col-md-12">
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
                              {state
                                ? `${"Order"}${"#"} ${state.order.orderNumber}`
                                : ""}
                            </h4>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div>
                            <table>
                              <thead></thead>
                              <tbody>{this.invoiceproductBox()}</tbody>
                            </table>
                            {!!this.state.m_productarray.length ? (
                              <h5>Missing Products</h5>
                            ) : (
                              ""
                            )}
                            {!!this.state.m_productarray.length ? (
                              <table>
                                <thead></thead>
                                <tbody>{this.m_invoiceproductBox()}</tbody>
                              </table>
                            ) : (
                              ""
                            )}
                            <hr />
                            <h3>Charges</h3>
                            <table
                              style={{ width: "100%" }}
                              className="table table-bordered"
                              cellPadding="10"
                            >
                              <thead></thead>
                              <tbody>{this.charge_array_for_pdf()}</tbody>
                            </table>
                            <h3>Discounts</h3>
                            <table
                              style={{ width: "100%" }}
                              className="table table-bordered"
                              cellPadding="10"
                            >
                              <thead></thead>
                              <tbody>{this.discount_array_for_pdf()}</tbody>
                            </table>
                            <hr />
                            <div className="row">
                              <div
                                className="col-md-6"
                                style={{ float: "left", color: "black" }}
                              >
                                <h6 id="padLeft">Insurance amount</h6>
                              </div>
                              <div
                                className="col-md-6"
                                style={{ float: "right", color: "black" }}
                              >
                                <h6>{state.order.insuranceAmt}</h6>
                              </div>
                            </div>

                            <div className="row justify-content-center">
                              <div className="form-group">
                                <div
                                  className="text-center"
                                  style={{ width: "300%" }}
                                >
                                  <input
                                    type="text"
                                    className="form-control mm-input s-input text-center"
                                    placeholder="Total"
                                    style={{ color: "black" }}
                                    id="setSizeFloat"
                                    readOnly
                                    value={`${"PAID TOTAL: $"}${
                                      this.state.totalPaid
                                    }`}
                                  />
                                </div>
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
                                style={{ float: "right", color: "black" }}
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
                              <div
                                style={{
                                  float: "right",
                                  color: "black",
                                  marginLeft: "25px",
                                }}
                              >
                                <h6>
                                  {moment(this.state.rentDate).format(
                                    "DD-MM-YYYY"
                                  )}
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

                              <div
                                style={{
                                  float: "right",
                                  color: "black",
                                  marginLeft: "25px",
                                }}
                              >
                                <h6>
                                  {moment(this.state.returnDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </h6>
                              </div>
                            </div>
                            <br />

                            <div className="container">
                              <div className="row justify-content-md-center">
                                <div className="col-md-12">
                                  <input
                                    style={{ color: "black", width: "90%" }}
                                    type="text"
                                    className="form-control mm-input s-input text-center"
                                    placeholder="Total"
                                    id="setSizeFloat"
                                    // value={`${"FINAL INVOICE TOTAL: $"}${this.finalInVoiceTotal()}`}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <br />

                            <div className="col-md-12">
                              <table>
                                <thead></thead>
                                <tbody>
                                  <tr>
                                    <td
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
                                      style={{
                                        textAlign: "center",
                                        padding: "8px",
                                        width: "50%",
                                      }}
                                    >
                                      {" "}
                                      Authorized by <br />
                                      {user && user.username}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <br />
                            <div className="container">
                              <div className="row justify-content-md-center">
                                <div className="col-lg-auto">
                                  <input
                                    style={{
                                      color: "black",
                                      width: "-webkit-fill-available",
                                    }}
                                    type="text"
                                    className="form-control mm-input s-input text-center"
                                    placeholder="Total"
                                    id="setSizeFloat"
                                    readOnly
                                    value={`${"Order Completed"}`}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
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

            {/* pdf invoice  */}

            <div id="invoiceDiv" style={{ width: "100%", display: "none" }}>
              <h1 style={{ textAlign: "center" }}>
                {customer
                  ? `${customer.name}${"#"}${customer.contactnumber}`
                  : ""}{" "}
              </h1>
              <h1 style={{ textAlign: "center" }}>
                {state ? `${"Order"}${"#"} ${state.order.orderNumber}` : ""}{" "}
              </h1>

              <table style={{ width: "100%" }} cellPadding="10">
                <thead></thead>
                <tbody>{this.invoiceproductBox()}</tbody>
              </table>
              <table style={{ width: "100%" }} cellPadding="10">
                <thead></thead>
                <tbody>
                  {!!this.state.m_productarray.length ? (
                    <h5>Missing Products</h5>
                  ) : (
                    ""
                  )}
                  {!!this.state.m_productarray.length
                    ? this.m_invoiceproductBox()
                    : ""}
                </tbody>
              </table>
              <hr />
              <h3>Charges</h3>
              <table
                style={{ width: "100%" }}
                className="table table-bordered"
                cellPadding="10"
              >
                <thead></thead>
                <tbody>{this.charge_array_for_pdf()}</tbody>
              </table>
              <h3>Discounts</h3>
              <table
                style={{ width: "100%" }}
                className="table table-bordered"
                cellPadding="10"
              >
                <thead></thead>
                <tbody>{this.discount_array_for_pdf()}</tbody>
              </table>

              <hr />
              <table style={{ width: "100%" }} cellPadding="10">
                <thead></thead>
                <tbody>
                  <tr>
                    <td style={{ width: "90%" }}>Insurance Amount</td>
                    <td>{state.order.insuranceAmt}</td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    <td>
                      <h4 style={{ textAlign: "center" }}>{`${"PAID TOTAL: "}${
                        this.state.totalPaid
                      }`}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />

              <table style={{ width: "100%" }} cellPadding="10">
                <thead></thead>
                <tbody>
                  <tr style={{ textAlign: "center" }}>
                    <td style={{ textAlign: "center" }}>
                      {state.order.leaveID === true
                        ? `${"Customer left ID. Please return ID to customer"}`
                        : `${"No ID"}`}
                    </td>
                  </tr>
                  <tr>
                    <td>Rent From</td>
                    <td>
                      {moment(state.order.rentDate).format("DD/MMM/YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td>Return Date</td>
                    <td>
                      {moment(state.order.returnDate).format("DD/MMM/YYYY")}
                    </td>
                  </tr>
                  <tr style={{ textAlign: "center" }}>
                    {/* <td>
                    <h4
                      style={{ textAlign: "center" }}
                    >{`${"FINAL INVOICE TOTAL: "}${this.finalInVoiceTotal()}`}</h4>
                  </td>{" "} */}
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
                  <tr>
                    <td>
                      <h4
                        style={{ textAlign: "center" }}
                      >{`${"ORDER COMPLETED"}`}</h4>
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
                  
                </tbody>
              </table>
              <br />
              <br />
            </div>
          </div>
        </div>
        <OCAlertsProvider />
      </React.Fragment>
    );
  }
}

ReturnPrepaid.propTypes = {
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
  updateRentedProduct,
})(ReturnPrepaid);
