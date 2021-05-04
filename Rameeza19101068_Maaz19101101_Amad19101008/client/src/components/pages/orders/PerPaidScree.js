import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import shortid from "shortid";
import * as moment from "moment";
import ShowPricesOrder from "./small/ShowPricesOrder";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";
import { getOrderById, orderStatusActive ,orderUpdatePayAmount} from "../../../actions/rentproduct";
import { vi } from "date-fns/esm/locale";
import axios from "axios";

var JsBarcode = require("jsbarcode");

class PerPaidScree extends Component {
  state = {
    disableNextBtn: true,
    orderId: "",
    Myorder: "",
    customer: "",
    leaveID: false,
    customerId: "",
    barcode_Array: "",
    orderNumber: "",
    CustomerPay: false,
    rentedOrder: "",
    product_Array: [],
    barcode_Array: [],
    insuranceAmt: 0,
    total: 0,
    total_owe: 0,
    pay_amount: "",
    already_pay_amount: 0,
    pdfData: "",
    redirect: false,
    customer_id: "",
  };
  async componentDidMount() {
    const { params } = this.props.match;
    await this.props.getOrderById(params.id);
    let { order } = this.props;
console.log(order)
    if (params) {
      this.setState({
        orderId: params.id,
        Myorder: order,
        total: order.total,
        insuranceAmt: order.insuranceAmt,
        already_pay_amount: order.pay_amount,
        customer: order.customer,
        leaveID: order.leaveID,
        customerId: order.customerId,
        orderNumber: order.orderNumber,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });
      const state = { ...this.state };
          let final_paid = Number(state.already_pay_amount) + Number(state.pay_amount);
    await this.props.orderStatusActive(state.orderId);
    await this.props.orderUpdatePayAmount(state.orderId,final_paid);
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

  onNextButton = () => {
    const { insuranceAmt, pay_amount, already_pay_amount, total } = this.state;
    let final_paid = Number(already_pay_amount) + Number(pay_amount);
    let owe_amount = Number(total) - Number(final_paid);
    if (this.state.pay_amount == "") {
      OCAlert.alertError(`Pay Amount is required `, { timeOut: 3000 });
      return;
    }
    if (final_paid < Number(insuranceAmt)) {
      OCAlert.alertError(
        `Total amount paid should be greater than the Insurance amount.`,
        { timeOut: 3000 }
      );
      return;
    } else {
      this.setState({
        CustomerPay: true,
      });
    }
  };
  redirect = () => {
    this.setState({
      redirect: true,
    });
  };
  getInvoiceBarcodeRecord() {
    let { Myorder } = this.state;
      let productArray = [];
    const { products } = this.props;
    if (products) {
      let sortedAray = this.getSortedData(products);
      if (sortedAray) {
        Myorder && Myorder.barcodes.forEach((element) => {
          productArray.push(
            sortedAray.filter((f) => f.barcode == element.barcode)
          );
          return productArray;
        });
      }
    }
    return productArray.map((product, b_index) => (
      <tr key={b_index}>
        <td className="text-center">{b_index+1}) {product}</td>
      </tr>
    ));
    // return product_Array.map((product, b_index) => (
    //   <tr key={b_index}>
    //     <td className="text-center">{product[0].barcode}</td>
    //     <td className="text-center">{product[0].title}</td>
    //     <td className="text-center">{product[0].color}</td>
    //     <td className="text-center">{product[0].price}</td>
    //   </tr>
    // ));
  }

  render() {
    const { auth } = this.props;
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("orders")) {
        return <Redirect to="/Error" />;
      }
    }
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.state.redirect === true) {
      return <Redirect to={`/orders/vieworder/${this.state.orderId}`} />;
    }

    const {
      CustomerPay,
      insuranceAmt,
      total,
      pay_amount,
      rentedOrder,
      pdfData,
      orderNumber,
      Myorder,
    } = this.state;
    const { customer } = this.props;
    let { order } = this.props;

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
                        <h4 className="card-title">Pick up order</h4>
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
                                {this.state.leaveID ? (
                                  <h3 className="text-center py-2">
                                    Please take CUSTOMER ID{" "}
                                    {this.state.customerId}, mark it with order{" "}
                                    {orderNumber ? orderNumber : ""} and store
                                    it safely.
                                  </h3>
                                ) : (
                                  <h3 className="text-center py-2">
                                    No ID required for this order.
                                  </h3>
                                )}

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
                              <ShowPricesOrder
                                customerName={
                                  this.state.customer
                                    ? this.state.customer.name
                                    : ""
                                }
                                onChangePay={this.onChangePay}
                                insuranceAmt={insuranceAmt}
                                total={total}
                                already_pay_amount={
                                  this.state.already_pay_amount
                                }
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
                                        onClick={this.onNextButton}
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
            {Myorder ? `${Myorder.customer.name}${"#"}${Myorder.customerContactNumber}` : ""}
          </h1>
          <h1 style={{ "text-align": "center" }}>
            {this.state.orderNumber
              ? `${"Order"}${"#"} ${
                  Myorder && Myorder ? Myorder.orderNumber : ""
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
                <td>{`${Myorder?Number(Myorder.total)-Number(Myorder.tax) : 0}`}</td>
              </tr>
              <tr>
                <td style={{ width: "90%" }}>Discount</td>
                <td>{`${Myorder && Myorder ? Myorder.discount_amount : 0}`}</td>
              </tr>
              <tr>
                <td>Tax Percentage</td>
                <td>{`${Myorder && Myorder ? Myorder.taxper : 0}${"%"}`}</td>
              </tr>

              <tr>
                <td>Tax Amount</td>
                <td>{`${Myorder && Myorder ? Myorder.tax : 0}`}</td>
              </tr>
              <tr>
                <td>Insurance Amount</td>
                <td>{`${Myorder ? Myorder.insuranceAmt : 0}`}</td>
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
                  {Myorder && Myorder
                    ? moment(Myorder.rentDate).format("DD-MM-YYYY")
                    : ""}
                </td>
              </tr>
              <tr>
                <td>Return Date</td>
                <td>
                  {Myorder && Myorder
                    ? moment(Myorder.returnDate).format("DD-MM-YYYY")
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
                          {/* <h4>
                            {order
                              ? `${"Order"}${"#"} ${order[0].orderNumber}`
                              : ""}
                          </h4> */}
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
                            <h6>{`${Myorder?Number(Myorder.total)-Number(Myorder.tax):0}`}</h6>
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
                            <h6>{`${Myorder?Myorder.taxper:0}${"%"}`}</h6>
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
                            <h6>{`${Myorder?Myorder.tax:0}`}</h6>
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
                            <h6>{`${Myorder?Myorder.insuranceAmt:0}`}</h6>
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
                              {Myorder && Myorder
                                ? moment(Myorder.rentDate).format(
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
                              {Myorder && Myorder
                                ? moment(Myorder.returnDate).format(
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

PerPaidScree.propTypes = {
  getOrderById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.rentproduct.rentproduct,
});
export default connect(mapStateToProps, {
  getOrderById,
  orderStatusActive,
  orderUpdatePayAmount 
})(PerPaidScree);
