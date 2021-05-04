import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {
  getAllProducts,
  getProductById,
  updateProductIndex,
} from "../../../actions/product";
import { getCustomer } from "../../../actions/customer";
import { addNewInvoice } from "../../../actions/invoices";
import { updateRentedProduct } from "../../../actions/rentproduct";
import Loader from "../../layout/Loader";
import * as moment from "moment";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../../custom.css";
import ChargeModal from "./ChargeModal";

var JsBarcode = require("jsbarcode");

class ReturnSummary extends Component {
  state = {
    customer: "",
    barcodesArray: "",
    taxAmt: "",
    customer: "",
    order: "",
    missingItmCharges: "",
    customerOwe: "",
    insuranceAmt: "",
    orderNumber: "",
    leaveID: "",
    returnAmt: "",
    totalPaid: "",
    orderBarcode: "",
    product_Array: "",
    m_product: "",
    m_productarray: "",
    m_total: "",

    generateInvoice: true,
    sum_charges: 0,
    sum_discount: 0,
    charge_data: [],
    discount_data: [],
    charges_total_sum: "",
    discount_total_sum: "",
    sum_of_all_items: "",
  };
  async componentDidMount() {
    await this.props.getAllProducts();
    const { state } = this.props.location;
    if (state) {
      this.setState({
        sum_charges: state.sum_charges,
        sum_discount: state.sum_discount,
        charge_data: state.charge_data,
        discount_data: state.discount_data,
        customer: state.customer,
        order: state.orderNumber,
        //   insuranceAmt: state.order[0].insuranceAmt,
        barcodesArray: state.barcodesArray,
        //   taxAmt: state.order[0].taxAmt,
        //   totalPaid: state.order[0].total,
        //   leaveID: state.order[0].leaveID,
        product_Array: state.product_Array,
      });
    }
  }

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
    this.customerOwe();
    this.returnAmt();
  };
  // return sorted products for barcodes

  onSubmit = async (e) => {
    e.preventDefault();
    // returnPrepaid
    const state = { ...this.state };
    const { user } = this.props.auth;
    const { order } = this.props.location.state;

    this.setState({
      saving: true,
      generateInvoice: true,
      orderNumber: order.orderNumber,
    });
    let owe_from_customer = false;
    if (this.remaining_final() >= order.pay_amount) {
      owe_from_customer = true;
    }
    if (this.remaining_final() < order.pay_amount) {
      owe_from_customer = false;
    }
    this.props.history.push("returnPrepaid", {
      orderNumber: order.orderNumber,
      user_id: user._id,
      order: order,
      customer: order.customer,
      product_Array: this.state.product_Array,
      owe_from_customer: owe_from_customer,
      amount_remaing: Math.abs(this.remaining_final()),
      barcodesArray: this.state.barcodesArray,
      charge_data:  this.state.charge_data,
      discount_data:this.state.discount_data,
    });
  };

  getSortedData = (products) => {
    // looping through prducts
    let rows = [];
    products.forEach((product, p_index) => {
      let product_name = product.name;
      let product_id = product._id;

      // looping through each color of current product
      if (product.color) {
        product.color.forEach((color, c_index) => {
          let color_name = color.colorname;
          let color_id = color._id;

          // looping through sizes of current color
          if (color.sizes) {
            color.sizes.forEach((size, s_index) => {
              let size_name = size.size;
              let size_id = size.id;
              let price = size.price;
              let length;
              // show sizes with barcode
              if (size.barcodes) {
                length = size.barcodes.length;
              } else {
                length = 0;
              }

              let i;
              for (i = 0; i < length; i++) {
                let row = {
                  product_id: product_id,
                  color_id: color_id,
                  size_id: size_id,
                  barcodeIndex: i, // will be used to identify index of barcode when changeBarcode is called
                  title: product_name,
                  barcode: size.barcodes[i].barcode,
                  color: color_name + " | " + size_name,
                  price: price,
                };
                rows.push(row);
              }
            });
          }
        });
      }
    }); // products foreach ends here
    return rows;
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
    if (productarray.length) {
      let sum_of_all_items = productarray
        .map((p) => Number(p[0].price))
        .reduce((a2, b2) => a2 + b2);
      this.state.sum_of_all_items = sum_of_all_items;
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

  getChargeDataRow = () => {
    let { charge_data } = this.state; // get all barcode
    if (charge_data) {
      return charge_data.map((charge, b_index) => (
        <tr key={b_index}>
          <th scope="row">{b_index + 1}</th>
          <td>{charge.name ? charge.name : ""}</td>
          <td>{charge.category ? charge.category : ""}</td>
          <td>{charge.amount ? charge.amount : ""}</td>
          <td>
            <button
              onClick={() => this.onRemoveRow(b_index, "charge")}
              type="button"
              className="btn btn-raised btn-sm btn-icon btn-default mt-1"
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa fa-times  text-danger"
              ></i>
            </button>
          </td>
        </tr>
      ));
    }
  };

  getDiscountDataRow = () => {
    let { discount_data } = this.state; // get all barcode
    if (discount_data) {
      return discount_data.map((discount, b_index) => (
        <tr key={b_index}>
          <th scope="row">{b_index + 1}</th>
          <td>{discount.name ? discount.name : ""}</td>
          <td>{discount.category ? discount.category : ""}</td>
          <td>{discount.amount ? discount.amount : ""}</td>
          <td>
            <button
              onClick={() => this.onRemoveRow(b_index, "discount")}
              type="button"
              className="btn btn-raised btn-sm btn-icon btn-default mt-1"
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa fa-times text-danger"
              ></i>
            </button>
          </td>
        </tr>
      ));
    }
  };
  onRemoveRow = (valueIndex, type) => {
    let { discount_data, charge_data } = this.state;
    if (type == "discount") {
      this.setState({
        discount_data: discount_data.filter((_, index) => index !== valueIndex),
      });
    }
    if (type == "charge") {
      this.setState({
        charge_data: charge_data.filter((_, index) => index !== valueIndex),
      });
    }
  };

  onAddCharge = (type) => {
    let { name, category, amount } = this.state;

    if (type == "charge") {
      this.setState({
        charge_data: [...this.state.charge_data, { name, category, amount }],
        name: "",
        category: "",
        amount: "",

        modal_type: "",
        openModal: false,
      });
    }
    if (type == "discount") {
      this.setState({
        discount_data: [
          ...this.state.discount_data,
          { name, category, amount },
        ],
        name: "",
        category: "",
        amount: "",
        openModal: false,
        modal_type: "",
      });
    }
  };
  handleClose = () => {
    this.setState({
      openModal: false,
      name: "",
      category: "",
      amount: "",
      modal_type: "",
    });
  };

  handleOpen = (type) => {
    this.setState({ openModal: true, modal_type: type });
  };
  onHandleModalFields = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  chargesSum = () => {
    let { sum_charges } = this.state;
    let { state } = this.props.location;
    let { order } = state;
    let sum =
      Number(sum_charges) +
      (order.extraDaysAmount ? Number(order.extraDaysAmount) : 0) +
      Number(order.tax);
    this.charges_total_sum = sum;
    return sum;
  };

  discountSum = () => {
    let { sum_discount } = this.state;
    let { state } = this.props.location;
    let { order } = state;
    let sum = Number(sum_discount) + Number(order.discount_amount);
    this.discount_total_sum = sum;
    return sum;
  };

  final_sale_total = () => {
    const { sum_of_all_items } = this.state;
    return Number(sum_of_all_items) + this.chargesSum() - this.discountSum();
  };
  remaining_final = () => {
    let { state } = this.props.location;
    let { order } = state;

    return this.final_sale_total() - order.pay_amount;
  };
  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { customer } = this.props;
    const { state } = this.props.location;
    const { user } = this.props.auth;
    if (this.props.saved === true) {
      return <Redirect to="/returnproduct" />;
    }

    const { order } = state;

    const { barcodesArray } = state;
    const {
      customerOwe,
      insuranceAmt,
      m_total,
      charge_data,
      discount_data,
    } = this.state;

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
                        <h4 className="form-section">Return Product</h4>
                      </div>

                      <div className="card-body table-responsive">
                        <div id="colors_box">
                          <div className="row color-row">
                            <div className="col-md-12">
                              <div className="">
                                <h2>List of all the items </h2>
                                {this.productBox()}
                                <br />
                                {/* {barcodesArray.length !==
                                  order[0].barcodes.length ? (
                                    <h3>Missing Products</h3>
                                  ) : (
                                    ""
                                  )} */}
                                {/* {barcodesArray.length !==
                                  order[0].barcodes.length
                                    ? this.missingProducts()
                                    : ""} */}
                                <div className="row">
                                  <div className="col-md-11 ">
                                    <h3 className="float-right mr-3">
                                      Total : {this.state.sum_of_all_items} Rupees{" "}
                                    </h3>
                                  </div>
                                </div>
                                <br />

                                <div className="row">
                                  <div className="col-md-12 ">
                                    <h3>Charges</h3>
                                    <table class="table table-borderless">
                                      <tbody>
                                        <tr>
                                          <th className="float-left">Tax</th>
                                          <td>
                                            {order ? order.tax : 0} Rupees (
                                            {order ? order.taxper : 0}%)
                                          </td>
                                        </tr>
                                        {charge_data &&
                                          charge_data.map((i, index1) => (
                                            <tr key={index1}>
                                              <th className="float-left">
                                                {i.category}
                                              </th>
                                              <td> {i.amount} Rupees</td>
                                            </tr>
                                          ))}

                                        <tr>
                                          <th className="float-left">
                                            Extended rental at order
                                          </th>
                                          <td>
                                            {order.extraDaysAmount
                                              ? order.extraDaysAmount
                                              : 0}{" "}
                                            Rupees
                                          </td>
                                        </tr>
                                        <tr>
                                          <th className="float-left"></th>
                                          <th>{this.chargesSum()} Rupees</th>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <br />

                                <div className="row">
                                  <div className="col-md-12 ">
                                    <h3>Discount</h3>
                                    <table class="table table-borderless">
                                      <tbody>
                                        <tr>
                                          <th className="float-left mr-3">Coupon</th>
                                          <td >
                                            {order ? order.discount_amount : 0}{" "}
                                            Rupees
                                          </td>
                                        </tr>
                                        {discount_data &&
                                          discount_data.map((d, index2) => (
                                            <tr key={index2}>
                                              <th className="float-left">
                                                {d.category}
                                              </th>
                                              <td> {d.amount} Rupees</td>
                                            </tr>
                                          ))}
                                        <tr>
                                          <th className="float-left"></th>
                                          <th>{this.discountSum()} Rupees</th>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                {/* <div style={{ float: "left" }}>
                                  <h3>
                                    {customer
                                      ? `${customer.name}${"#"}${
                                          customer.contactnumber
                                        }`
                                      : ""}
                                  </h3>
                                  <br />
                                </div>
                                <div style={{ float: "right" }}>
                                  <h3>
                                     {state
                                      ? `${"Order"}${"#"} ${
                                          this.state.orderNumber
                                        }`
                                      : ""}
                                  </h3>
                                </div> */}
                                <div className="row">
                                  <div className="col-md-11 ">
                                    <h3 className="float-right mr-3">
                                      Final Sale : {this.final_sale_total()} Rupees{" "}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-md-11 ">
                                  <h3 className="float-left ml-1">Prepaid</h3>
                                  <h3 className="float-right mr-3">
                                    {order && order.pay_amount} Rupees
                                  </h3>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-md-11 ">
                                  <h3
                                    className="float-right mr-3"
                                    style={{
                                      border: "1px solid black",
                                      padding: "10px",
                                    }}
                                  >
                                    {this.remaining_final() >= order.pay_amount
                                      ? "Customer owe "
                                      : this.remaining_final() <
                                        order.pay_amount
                                      ? "Refund to customer "
                                      : ""}
                                    {Math.abs(this.remaining_final())} Rupees
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <br />

                            <form onSubmit={(e) => this.onSubmit(e)}>
                              <div className="col-md-12">
                                <div id="sizes_box">
                                  {/* <div className="row">
                                    <div className="col-md-11 ">
                                      <h3 className="float-right mr-3">
                                        Total :100 Rupees{" "}
                                      </h3>
                                    </div>
                                  </div> */}

                                  <br />

                                  <div className="col-md-12">
                                    <div id="sizes_box">
                                      <div className="row text-center">
                                        <div className="col-md-12 btn-cont">
                                          <div className="form-group">
                                            <button
                                              type="submit"
                                              className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                              id="btnSize2"
                                            >
                                              <i className="ft-check"></i> Next
                                              {/* Submit &amp; Generate Invoice{" "} */}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
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
      </React.Fragment>
    );
  }
}

ReturnSummary.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  updateProductIndex: PropTypes.func.isRequired,
  updateRentedProduct: PropTypes.func.isRequired,
  saved: PropTypes.bool,
  order: PropTypes.array,
  customer: PropTypes.object,
  addNewInvoice: PropTypes.func.isRequired,
  auth: PropTypes.object,
  generateInvoice: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  product: state.product.product,
  customer: state.customer.customer,
  auth: state.auth,
  saved: state.product.saved,
  generateInvoice: state.product.generateReturnInvoice,
});
export default connect(mapStateToProps, {
  getCustomer,
  getAllProducts,
  getProductById,
  updateProductIndex,
  updateRentedProduct,
  addNewInvoice,
})(ReturnSummary);
