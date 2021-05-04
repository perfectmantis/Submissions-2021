import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import "../orders/orders.css";
import Loader from "../../layout/Loader";
import {
  getAllRentedProducts,
  deleteRentedProduct,
  getOrderSearchStatus,
} from "../../../actions/rentproduct";
import { getAllProducts } from "../../../actions/product";
import { confirmAlert } from "react-confirm-alert";
import * as moment from "moment";
import "react-confirm-alert/src/react-confirm-alert.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import OrderStatus from "./small/Status";
import Spinner from "../../layout/Spinner.js";

class Orders extends Component {
  state = {
    status: [],
    loading: false,
    search: "",
  };

  async componentDidMount() {
    await this.props.getAllRentedProducts();
  }

  handleStatusToggle = async (name) => {
    let selectedstatus = this.state.status.indexOf(name);

    let resultant = [...this.state.status];

    if (selectedstatus === -1) {
      resultant.push(name);
    } else {
      resultant.splice(selectedstatus, 1);
    }
    this.setState({ status: resultant });

    if (resultant.length == 0) {
      // if user deselect all the elements then fetch all statuses.
      await this.props.getAllRentedProducts();
    } else {
      // is arra contains atleast 1 item then make this request.
      await this.props.getOrderSearchStatus({ status: resultant });
    }
  };

  orderTable = () => {
    const { rentproducts } = this.props;

    if (rentproducts) {
      let ordersDataArr = [];
      rentproducts.forEach((order, idx) => {
        ordersDataArr.push({
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
              <Link
                to={{ pathname: `/orders/vieworder/${order._id}` }}
                className="success p-0"
              >
                <i
                  className="ft-edit-3 font-medium-3 mr-2 "
                  title="View Order"
                ></i>
              </Link>
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
          text: "View/Edit",
          sort: true,
        },
      ];

      const MySearch = (props) => {
        let input;
        const handleClick = () => {
          props.onSearch(input.value);
        };
        return (
          <>
            <div className="row">
              <div className="col-md-4">
                <input
                  className="form-control"
                  style={{ backgroundColor: "white" }}
                  ref={(n) => (input = n)}
                  type="text"
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-success" onClick={handleClick}>
                  <i className="fa fa-search"></i> Search{" "}
                </button>
              </div>
            </div>
            <div className="row ">
              <div className="form-group col" style={{marginTop:'-20px'}}>
                <br></br>
                <h3 className="">
                  {" "}
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "pending")
                          ? "#FFDC1F"
                          : "#737373"
                      }`,
                      color: `${
                        this.state.status.find((s) => s == "pending")
                          ? "#000"
                          : "#fff"
                      }`,
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("pending");
                    }}
                  >
                    Pending
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-20px'}}>
                <br></br>
                <h3>
                  {" "}
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "active")
                          ? "#8C52FF"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("active");
                    }}
                  >
                    Active
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-20px'}}>
                <br></br>
                <h3>
                  {" "}
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "pickup")
                          ? "#FF914D"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("pickup");
                    }}
                  >
                    Pickup Today
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-20px'}}>
                <br></br>
                <h3>
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "return")
                          ? "#FF914D"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("return");
                    }}
                  >
                    Return Today
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-20px'}}>
                <br></br>
                <h3>
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "alteration")
                          ? "#FF914D"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("alteration");
                    }}
                  >
                    Alteration
                  </span>
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="form-group col" style={{marginTop:'-30px'}}>
                <br></br>
                <h3>
                  {" "}
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "ready")
                          ? "#45EBA5"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("ready");
                    }}
                  >
                    Ready
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-30px'}}>
                <br></br>
                <h3>
                  {" "}
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "overdue")
                          ? "#ff1616"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("overdue");
                    }}
                  >
                    Overdue
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-30px'}}>
                <br></br>
                <h3>
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "lost")
                          ? "#163A5F"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("lost");
                    }}
                  >
                    Lost
                  </span>
                </h3>
              </div>

              <div className="form-group col" style={{marginTop:'-30px'}}>
                <br></br>
                <h3>
                  <span
                    className="py-2 btn-custom font-weight-600 badge "
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        this.state.status.find((s) => s == "past")
                          ? "#FF66c4"
                          : "#737373"
                      }`,
                      color: "#fff",
                      borderColor: "#fff",
                      borderRadius: "none",
                    }}
                    onClick={() => {
                      this.handleStatusToggle("past");
                    }}
                  >
                    Past
                  </span>
                </h3>
              </div>
              <div className="col">

              </div>
            </div>
          </>
        );
      };

      return (
        <ToolkitProvider
          // bootstrap4
          keyField="id"
          data={ordersDataArr.length === 0 ? [] : ordersDataArr}
          columns={columns}
          // defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <MySearch {...props.searchProps} />
              <BootstrapTable {...props.baseProps} />
              <br />
            </div>
          )}
        </ToolkitProvider>
      );
    } else {
      return <div>No orders found.</div>;
    }
  };

  render() {
    return (
      <>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="extended">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">Orders</h4>
                        </div>
                        <div className="card-content">
                          <div className="card-body table-responsive">
                            <Alert />
                            {this.state.loading ? (
                              <Spinner />
                            ) : (
                              this.orderTable()
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
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
      </>
    );
  }
}

Orders.propTypes = {
  auth: PropTypes.object,
  getAllRentedProducts: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  deleteRentedProduct: PropTypes.func.isRequired,
  getOrderSearchStatus: PropTypes.func.isRequired,
  rentproducts: PropTypes.array,
  products: PropTypes.array,
};

const mapStateToProps = (state) => ({
  rentproducts: state.rentproduct.rentproducts,
  auth: state.auth,
  loading: state.rentproduct.loading,
});
export default connect(mapStateToProps, {
  getAllRentedProducts,
  deleteRentedProduct,
  getAllProducts,
  getOrderSearchStatus,
})(Orders);
