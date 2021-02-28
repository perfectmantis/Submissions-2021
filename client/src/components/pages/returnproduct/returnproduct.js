import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {
  getOrderbyCustomerNumber,
  getOrderbyOrderNumber,
  getOrderbyID,
  emptyReturnOrder,
} from "../../../actions/returnproduct";
import { getAllProducts } from "../../../actions/product";
import { getCustomer } from "../../../actions/customer";
import Loader from "../../layout/Loader";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment-timezone";
import "../../../custom.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import OrderStatus from "../orders/small/Status";
class ReturnProduct extends Component {
  state = {
    customer: "",
    orderNumber: "",
    customer_id: "",
    selectedOrder: false,
    orderId: "",
    seletedOrder: "",
    product_Array: "",
    tryAgain: false,
    isSearched: false,
    returningOrder: "",
  };

  async componentDidMount() {
    await this.props.getAllProducts();
    await this.props.emptyReturnOrder();
  }

  tryAgain = (e) => {
    e.preventDefault();
    this.setState({
      tryAgain: true,
    });
    var orderNumber = document.getElementById("orderNumber");
    var contactNumber = document.getElementById("contactnumber");
    var statusBox = document.getElementById("statusBox");
    contactNumber.value = "";
    contactNumber.focus();
    orderNumber.value = "";
  };

  //handle change for input fields
  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //search by Customer Number
  onSubmitCustomer = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });
    const state = { ...this.state };
    await this.props.getOrderbyCustomerNumber(state.customer.trim());
    const { orders } = this.props;
    if (!!orders.length) {
      await this.props.getCustomer(orders[0].customer._id);
      var returningOrder = orders.filter((f) => f.status === "active");
    }
    this.setState({
      saving: false,
      tryAgain: false,
      orders: orders,
      returningOrder: returningOrder,
    });
  };
  //search by order number
  onSubmitOrderNumber = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    await this.props.getOrderbyOrderNumber(state.orderNumber.trim());
    const { orders } = this.props;
    if (!!orders.length) {
      await this.props.getCustomer(orders[0].customer._id);
      var returningOrder = orders.filter((f) => f.status === "active");
    }
    this.setState({
      saving: false,
      tryAgain: false,
      orders: orders,
      returningOrder: returningOrder,
    });
  };

  // return sorted products for barcodes
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
                  title: product_name + " | " + color_name + " | " + size_name,
                  barcode: size.barcodes[i].barcode,
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
    const { seletedOrder } = this.state;
    let productarray = [];
    let { barcodes } = seletedOrder[0];

    const { products } = this.props;
    if (products) {
      let sortedAray = this.getSortedData(products);
      if (sortedAray) {
        barcodes.forEach((element) => {
          productarray.push(
            sortedAray.filter((f) => f.barcode.toString() === element)
          );
        });

        this.state.product_Array = productarray;
        return productarray.map((p, p_index) => {
          return (
            <>
              {" "}
              <div className="form-group" key={p_index}>
                <div className="row text-center" key={p_index}>
                  <h6
                    style={{
                      color: "black !important",
                      margin: "4px 2px",
                      width: "-webkit-fill-available",
                      fontSize: "larger",
                    }}
                  >
                    {`${p[0] ? p[0].title : ""} ${"|"} ${
                      p[0] ? p[0].barcode : ""
                    }`}
                  </h6>
                </div>
              </div>
            </>
          );
        });
      }
    }
  };

  CutomerBox = () => {
    const { orders } = this.props;
    const { customeR } = this.props;

    let returningOrders = orders.filter((f) => f.status === "active");
    return returningOrders.map((o, o_index) => (
      <>
        <div className="col-md-12" key={o_index}>
          <div
            className="row form-group hovered"
            onClick={(e) => this.selectedOrder(e, o._id)}
          >
            <div className="col-md-12 text-center p-1">
              <h6
                style={{
                  color: "black !important",
                  margin: "4px 2px",
                  width: "-webkit-fill-available",
                  fontSize: "larger",
                }}
              >
                {o &&
                  customeR &&
                  `${"Order#"}${o.orderNumber}${"             "}${
                    customeR.name
                  }${"             "}${"OrderStatus-"}${o.status}`}
              </h6>
            </div>
          </div>
        </div>
      </>
    ));
  };

  selectedOrder = (e, order_id) => {
    this.setState({
      selectedOrder: true,
    });
    e.preventDefault();
    const orderID = order_id;
    const { orders } = this.props;
    const seletedOrder = orders.filter((f) => f._id === orderID);
    this.setState({
      seletedOrder: seletedOrder,
    });
  };

  orderTable = () => {
    const { orders } = this.props;
    const { customeR } = this.props;
    // zohaib
    let returningOrders = orders.filter((f) => f.status === "active");
    if (returningOrders) {
      let returningOrdersDataArray = [];
      returningOrders.forEach((order, idx) => {
        returningOrdersDataArray.push({
          orderNumber: order.orderNumber,
          name: order.customer ? order.customer.name : "",
          phone: order.customer ? order.customer.contactnumber : "",
          status: (
            <OrderStatus
              title={order.status}
              reservedStatus={order.reservedStatus}
              readyForPickUp={order.readyForPickUp}
              pickedUpStatus={order.pickedUpStatus}
              total={order.total_notes ? order.total_notes : 0}
              remain={
                order.notes
                  ? order.notes.filter((i) => i.done == false).length
                  : 0
              }
            />
          ),

          actions: (
            <>
              <button
             
                onClick={(e) => this.selectedOrder(e, order._id)}
                className="btn btn-sm btn-primary"
              >
                <i
                  className="ft-eye font-medium-3"
                  title="View Order"
                ></i>
              </button>
            </>
          ),
        });
      });
      const columns = [
        {
          dataField: "orderNumber",
          text: "Order Id",
          sort: true,
        },
        {
          dataField: "name",
          text: "Customer name",
          sort: true,
        },
        {
          dataField: "phone",
          text: "Phone number",
          sort: true,
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
        },
        {
          dataField: "actions",
          text: "View Order",
          sort: true,
        },
      ];

      return (
        <ToolkitProvider
          keyField="id"
          data={
            returningOrdersDataArray.length === 0
              ? []
              : returningOrdersDataArray
          }
          columns={columns}
          // defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <BootstrapTable {...props.baseProps} />
              <br />
            </div>
          )}
        </ToolkitProvider>
      );
    } else {
      return <div>No Active order found.</div>;
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { orders } = this.state;
    const { customeR } = this.props;

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
                        <div className="card-body table-responsive">
                          <form onSubmit={(e) => this.onSubmitCustomer(e)}>
                            <div className="form-group">
                              <h3>Enter Customer 10-digit phone number</h3>
                              <div className="position-relative has-icon-right">
                                <input
                                  name="customer"
                                  type="text"
                                  placeholder="Search"
                                  className="form-control round"
                                  id="contactnumber"
                                  min="0"
                                  ref="contactnumber"
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
                          </form>

                          <form onSubmit={(e) => this.onSubmitOrderNumber(e)}>
                            <div className="form-group">
                              <h3>Or Scan/Enter Order Number</h3>
                              <div className="position-relative has-icon-right">
                                <input
                                  name="orderNumber"
                                  type="text"
                                  placeholder="Search"
                                  className="form-control round"
                                  id="orderNumber"
                                  min="0"
                                  ref="orderNumber"
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
                          </form>

                          {this.props.orders &&
                          this.state.tryAgain === false ? (
                            <>
                              <div id="colors_box">
                                <div className="row color-row">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <h3>Is this the One</h3>
                                    </div>
                                  </div>
                                  {this.props.orders &&
                                  this.state.tryAgain === false &&
                                  !!this.props.orders.length ? (
                                    <>
                                      {this.state.returningOrder &&
                                      this.state.returningOrder.length > 0 ? (
                                        <div className="col-md-12">
                                          {this.orderTable()}
                                        </div>
                                      ) : (
                                        // this.CutomerBox()
                                        <div className="col-md-12">
                                          <div className="form-group text-center p-1">
                                            <h6
                                              style={{
                                                color: "black !important",
                                                margin: "4px 2px",
                                                width: "-webkit-fill-available",
                                                fontSize: "larger",
                                              }}
                                            >
                                              {"No Active order found"}
                                            </h6>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="col-md-12">
                                      <div className="form-group text-center p-1">
                                        <h6
                                          style={{
                                            color: "black !important",
                                            margin: "4px 2px",
                                            width: "-webkit-fill-available",
                                            fontSize: "larger",
                                          }}
                                        >
                                          {"No order found"}
                                        </h6>
                                      </div>
                                    </div>
                                  )}

                                  <div className="col-md-12">
                                    <div className="text-center">
                                      <button
                                        type="button"
                                        className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1 text-center"
                                        onClick={(e) => this.tryAgain(e)}
                                        id="btnSize"
                                      >
                                        <i className="ft-rotate-cw"></i> Try
                                        Again
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <div id="colors_box">
                            {this.state.selectedOrder === true &&
                            this.state.tryAgain === false ? (
                              <div className="row color-row" id="statusBox1">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <div style={{ float: "left" }}>
                                      <h3>
                                        {customeR
                                          ? `${customeR.name}${"#"}${
                                              customeR.contactnumber
                                            }`
                                          : ""}
                                      </h3>
                                    </div>
                                    <div style={{ float: "right" }}>
                                      <h3>
                                        {orders &&
                                        this.state.selectedOrder === true
                                          ? `${"Order"}${"#"} ${
                                              this.state.seletedOrder[0]
                                                .orderNumber
                                            }`
                                          : ""}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  {this.state.seletedOrder.length > 0 ? (
                                    <div id="colors_box">
                                      {this.productBox()}
                                      <div className="btn-cont text-center">
                                        <div className="form-group">
                                          <Link
                                            to={{
                                              pathname: "/scanBarcode",
                                              state: {
                                                customer: this.props.customeR,
                                                order: this.state.seletedOrder,
                                              },
                                            }}
                                            type="submit"
                                            className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1 text-center"
                                            id="btnSize2"
                                          >
                                            <i className="ft-check"></i> Next
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
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

ReturnProduct.propTypes = {
  getOrderbyCustomerNumber: PropTypes.func.isRequired,
  getOrderbyOrderNumber: PropTypes.func.isRequired,
  emptyReturnOrder: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getOrderbyID: PropTypes.func.isRequired,
  orders: PropTypes.array,
  customeR: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  orders: state.returnproduct.returnorder,
  customeR: state.customer.customer,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getOrderbyCustomerNumber,
  getOrderbyOrderNumber,
  getCustomer,
  getAllProducts,
  getOrderbyID,
  emptyReturnOrder,
})(ReturnProduct);
