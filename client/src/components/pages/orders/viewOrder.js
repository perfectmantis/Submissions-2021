import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import Loader from "../../layout/Loader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import {
  getOrderById,
  orderStatusReady,
  orderStatusActive,
  orderStatusCancel,
  getOrderItems,
  deleteRentedProduct,
} from "../../../actions/rentproduct";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

class ViewOrder extends Component {
  state = {
    id: "",
    orderNumber: "",
    barcodes: "",
    customer: "",
    customerId: "",
    customernumber: "",
    insuranceAmt: "",
    leaveID: "",
    rentDate: "",
    returnDate: "",
    status: "",
    total: "",
    createdAt: "",
    returnOn: "",
    auth_logs: "",
    orderItems: "",
    loading: false,
  };

  async componentDidMount() {
    await this.props.getOrderById(this.props.match.params.id);

    let { order } = this.props;

    // Get Items of current order.
    await this.props.getOrderItems(order._id);

    let { orderItems } = this.props;

    this.setState({
      id: order._id,
      orderNumber: order.orderNumber && order.orderNumber,
      customernumber: order.customerContactNumber,
      customer: order.customer ? order.customer.name : "",
      customerId: order.customer && order.customer._id,
      barcodes: order.barcodes,
      insuranceAmt: order.insuranceAmt,
      leaveID: order.leaveID,
      rentDate: moment(order.rentDate).format("ddd, MMM Do YYYY, h:mm:ss a"),
      returnDate: moment(order.returnDate).format("ddd, MMM Do YYYY"),
      status: order.status,
      total: order.total,
      createdAt: moment(order.createdAt).format("ddd, MMM Do YYYY"),
      returnOn: order.returnOn ? order.returnOn : "Not Returned",
      auth_logs: order.authorization_logs && order.authorization_logs,
      orderItems: orderItems,
    });
  }

  pastOrderAlert() {
    confirmAlert({
      title: "Past Order",
      message: `Please give customer ${this.state.total} and the insurance amount of ${this.state.insuranceAmt}`,
      buttons: [
        {
          label: "OK",
          onClick: () => {},
        },
      ],
    });
  }

  cancelOrderAlert = () => {
    confirmAlert({
      title: "Cancel Order",
      message: `Are you sure you want to cancel Order : ${this.state.orderNumber}`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await this.props.orderStatusCancel(this.state.id);
            this.props.history.push("/orders");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  async statusToReady(id) {
    // status to ready.
    await this.props.orderStatusReady(id);

    let { order } = this.props;

    this.setState({
      status: order.status,
      auth_logs: order.authorization_logs,
    });
  }

  async statusToPickup(id) {
    // status to pickup
     this.props.history.push(`/orders/prepaid/${id}`)
    // await this.props.orderStatusActive(id);

    // let { order } = this.props;

    // this.setState({
    //   status: order.status,
    //   auth_logs: order.authorization_logs,
    // });
  }

  authorizationLogsTable() {
    const authLogArr = [];

    const { auth_logs } = this.state;

    if (auth_logs) {
      auth_logs.forEach((log, idx) => {
        authLogArr.push({
          sno: idx + 1,
          date: moment(log.date).format("ddd, MMM Do YYYY"),
          employee_name: log.employee_name,
          status: <span className="badge badge-info">{log.status}</span>,
          message: log.message,
        });
      });
    }

    const columns = [
      {
        dataField: "sno",
        text: "#",
        sort: true,
      },
      {
        dataField: "date",
        text: "Date",
        sort: true,
      },
      {
        dataField: "employee_name",
        text: "Employee",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "message",
        text: "Log",
        sort: true,
      },
    ];

    const defaultSorted = [
      {
        dataField: "contactnumber",
        order: "asc",
      },
    ];

    return (
      <ToolkitProvider
        // bootstrap4
        keyField="id"
        data={authLogArr.length > 0 ? authLogArr : []}
        columns={columns}
        defaultSorted={defaultSorted}
        // search
      >
        {(props) => (
          <div>
            <BootstrapTable {...props.baseProps} />
            <br />
          </div>
        )}
      </ToolkitProvider>
    );
  }

  orderItemsTable() {
    const Items = [];

    const { orderItems } = this.state;

    if (orderItems) {
      orderItems.forEach((item) => {
        Items.push({
          productId: item.productId,
          product: `${item.name} | ${item.colorname} | ${item.size}`,
          barcode: <span className="badge badge-dark">{item.barcode}</span>,
          price: item.price,
        });
      });
    }

    const columns = [
      {
        dataField: "productId",
        text: "Product ID",
        sort: true,
      },
      {
        dataField: "product",
        text: "Product",
        sort: true,
      },
      {
        dataField: "barcode",
        text: "Barcode",
        sort: true,
      },
      {
        dataField: "price",
        text: "Price",
        sort: true,
      },
    ];

    const defaultSorted = [
      {
        dataField: "productId",
        order: "asc",
      },
    ];

    return (
      <ToolkitProvider
        // bootstrap4
        keyField="id"
        data={Items.length > 0 ? Items : []}
        columns={columns}
        defaultSorted={defaultSorted}
        // search
      >
        {(props) => (
          <div>
            <BootstrapTable {...props.baseProps} />
            <br />
          </div>
        )}
      </ToolkitProvider>
    );
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else {
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
                          <div className="row">
                            <div className="col-md-6">
                              <h4 className="form-section">
                                <i className="icon-bag" /> Order #{" "}
                                {this.state.orderNumber}
                              </h4>
                            </div>
                            <div className="col-md-6">
                              <Link to={`/orders/alternotes/${this.state.id}`}>
                                <button className="btn btn-success float-right">
                                  <i className="icon-bag"></i> Alter Notes{" "}
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <Alert />
                        </div>
                        <div className="card-body">
                          <form
                            className="form form-horizontal form-bordered"
                            method="POST"
                            // onSubmit={(e) => this.onSubmit(e)}
                          >
                            <h4 className="form-section ">
                              <i className="ft-info"></i> General information
                            </h4>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput4"
                                  >
                                    Order Number
                                  </label>

                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput4"
                                      className="form-control border-primary"
                                      placeholder="Order Number"
                                      name="ordernumber"
                                      value={this.state.orderNumber}
                                      // onChange={(e) => this.handleChangeNumber(e)}
                                      required
                                      minLength={10}
                                      maxLength={10}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput3"
                                  >
                                    Customer Name
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="email"
                                      id="projectinput3"
                                      className="form-control border-primary"
                                      placeholder="Customer Name"
                                      name="name"
                                      value={this.state.customer}
                                      // onChange={(e) => this.handleChange(e)}
                                      required
                                    />
                                    <Link
                                      to={`/customer/editcustomer/${this.state.customerId}`}
                                    >
                                      <p
                                        style={{
                                          marginTop: "5px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        View Customer
                                      </p>
                                    </Link>
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput3"
                                  >
                                    Customer Number
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput3"
                                      className="form-control border-primary"
                                      placeholder="Customer Number"
                                      name="company"
                                      value={this.state.customernumber}
                                      // onChange={(e) => this.handleChange(e)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput3"
                                  >
                                    Total
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput3"
                                      className="form-control border-primary"
                                      placeholder="Total"
                                      name="total"
                                      value={this.state.total}
                                      // onChange={(e) => this.handleChange(e)}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput3"
                                  >
                                    Order open Date
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput3"
                                      className="form-control border-primary"
                                      placeholder="Open Date"
                                      name="opendate"
                                      value={this.state.createdAt}
                                      // onChange={(e) => this.handleChange(e)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput1"
                                  >
                                    Pickup Date
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput1"
                                      rows="4"
                                      className="form-control col-md-12 border-primary"
                                      placeholder="Pickup Date"
                                      name="pickup"
                                      value={this.state.rentDate}
                                      // onChange={(e) => this.handleChange(e)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput3"
                                  >
                                    Return Date
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput3"
                                      className="form-control border-primary"
                                      placeholder="Return Date"
                                      name="company_address"
                                      value={this.state.returnDate}
                                      // onChange={(e) => this.handleChange(e)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    className="col-md-3 label-control"
                                    htmlFor="projectinput3"
                                  >
                                    Return On
                                  </label>
                                  <div className="col-md-9">
                                    <input
                                      type="text"
                                      id="projectinput3"
                                      className="form-control border-primary"
                                      placeholder="Return On"
                                      name="returnon"
                                      value={this.state.returnOn}
                                      // onChange={(e) => this.handleChange(e)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="card card-body">
                        <form
                          className="form form-horizontal form-bordered"
                          method="POST"
                          // onSubmit={(e) => this.onSubmit(e)}
                        >
                          <h4 className="form-section ">
                            <i className="ft-info"></i> Authorization Logs
                          </h4>
                          <div className="row">
                            <div className="col-md-12">
                              {this.authorizationLogsTable()}
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card card-body">
                        <form
                          className="form form-horizontal form-bordered"
                          method="POST"
                        >
                          <h4 className="form-section ">
                            <i className="ft-info"></i> Order Items
                          </h4>
                          <div className="row">
                            <div className="col-md-12">
                              {this.orderItemsTable()}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                  <div>
                    {this.state.status !== "cancel" ? (
                      <div className="row">
                        <div className="">
                          {this.state.status == "pending" ||
                          this.state.status == "ready" ? (
                            <button
                              to={{ pathname: `/report` }}
                              type="submit"
                              className="mb-2 mr-2 btn btn-raised btn-primary"
                              onClick={() => this.cancelOrderAlert()}
                            >
                              <i className="ft-check" /> Cancel Order
                            </button>
                          ) : (
                            <button
                              to={{ pathname: `/report` }}
                              type="submit"
                              className="mb-2 mr-2 btn btn-raised btn-primary"
                              onClick={
                                this.state.status == "past"
                                  ? () => this.pastOrderAlert()
                                  : () =>
                                      this.props.history.push("/returnproduct")
                              }
                            >
                              <i className="ft-check" /> Refund
                            </button>
                          )}
                        </div>
                        <div className="">
                          {this.state.status !== "active" &&
                          this.state.status !== "past" &&
                          this.state.status !== "lost" &&
                          this.state.status !== "alteration" ? (
                            <button
                              to={{ pathname: `/report` }}
                              type="submit"
                              className="mb-2 mr-2 btn btn-raised btn-primary"
                              onClick={
                                this.state.status == "pending"
                                  ? () => this.statusToReady(this.state.id)
                                  : this.state.status == "ready"
                                  ? () => this.statusToPickup(this.state.id)
                                  : () => {}
                              }
                            >
                              <i className="ft-check" />{" "}
                              {this.state.status == "pending"
                                ? "Ready"
                                : this.state.status == "ready"
                                ? "Pickup"
                                : "Active"}
                            </button>
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
              <footer className="footer footer-static footer-light">
                <p className="clearfix text-muted text-sm-center px-2">
                  <span>
                   All rights reserved.{" "}
                  </span>
                </p>
              </footer>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

ViewOrder.propTypes = {
  auth: PropTypes.object,
  order: PropTypes.array,
  getOrderById: PropTypes.func.isRequired,
  orderStatusReady: PropTypes.func.isRequired,
  getOrderItems: PropTypes.func.isRequired,
  deleteRentedProduct: PropTypes.func.isRequired,
  orderStatusCancel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.rentproduct.rentproduct,
  orderItems: state.rentproduct.orderItems,
  loading: state.rentproduct.loading,
});
export default connect(mapStateToProps, {
  getOrderById,
  orderStatusReady,
  orderStatusActive,
  orderStatusCancel,
  getOrderItems,
  deleteRentedProduct,
})(ViewOrder);
