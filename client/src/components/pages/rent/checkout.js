import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import shortid from "shortid";
import Loader from "../../layout/Loader";
import { getCustomer } from "../../../actions/customer";
import { getAllProductsAll } from "../../../actions/product";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";
import Axios from "axios";
import moment from "moment";
import DF from "date-diff";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
class Checkout extends Component {
  state = {
    barcode: [],
    customer_id: "",
    data: "",
    isModal: false,
    isLoading: false,
    errormsg: "",
    bc: "",
    getOrder: "",
    myRantDate: "",
  };

  async componentDidMount() {
    await this.props.getAllProductsAll();

    const { state } = this.props.location;

    if (state) {
      this.setState({
        customer_id: state.customer,
        data: state.data,
        myRantDate: moment(state.data.rentDate).format("DD-MM-YYYY"),
        barcode: state.barcode ? state.barcode : [],
      });
    }
    if (this.state.customer_id) {
      await this.props.getCustomer(this.state.customer_id);
    }
  }

  addBarcodeRow = () => {
    let { barcode } = this.state; // get all barcode
    barcode.push({
      id: shortid.generate(),
      barcode: "",
    });
    this.setState({ barcode });
  };

  onChangeOpenModal = () => {
    if (this.state.isModal) {
      this.setState({ isModal: !this.state.isModal });
    }
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
                  isRented: size.barcodes[i].isRented,
                  isLost: size.barcodes[i].isLost,
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

  onScanBarcode = async (e) => {
    e.preventDefault();
    const { products } = this.props;
    if (products) {
      const sortedArray = this.getSortedData(products);
      const bc = e.target[0].value;
      const { barcode } = this.state;

      let m_barcode = [];
      barcode.forEach((barcode, b_index) => {
        m_barcode.push(barcode.barcode);
      });
      e.target[0].value = "";
      const isInclude = m_barcode.includes(bc);

      if (isInclude === true) {
        // error message
        OCAlert.alertError("This barcode already exist in Order! Try again", {
          timeOut: 3000,
        });
        return;
      }
      const barcodeArry = sortedArray.filter(
        (barcode) => barcode.barcode.toString() === bc.trim()
      )[0]; // get current barode
      if (barcodeArry === undefined) {
        OCAlert.alertError(`This barcode does not exist`, { timeOut: 3000 });
        return;
      }

      // if (barcodeArry.isRented && barcodeArry.isRented === true) {
      //   OCAlert.alertError(
      //     `This barcode is already Rented. Please try again!`,
      //     { timeOut: 3000 }
      //   );
      //   return;
      // }
      // if (barcodeArry.isLost === true) {
      //   OCAlert.alertError(`This barcode is Lost. Please try again!`, {
      //     timeOut: 3000,
      //   });
      //   return;
      // }
      else {
        const { barcode } = this.state;
        this.setState({ isLoading: true });
        const result = await Axios.get(
          `/api/rentedproducts/checkBarcode/${bc}`
        );
        if (result.data == null) {
          this.setState({ isLoading: false });
          barcode.push({
            id: shortid.generate(),
            barcode: bc.trim(),
          });
          this.setState({ barcode });
        } else {
          this.setState({ isLoading: false, getOrder: result.data });
          const { returnDate } = result.data;
          if (this.compareDateOfOrder(returnDate, bc)) {
            barcode.push({
              id: shortid.generate(),
              barcode: bc.trim(),
            });
            this.setState({ barcode });
          }
        }
        this.setState({ isLoading: false });
      }
    }
  };
  removeBarcodeRow = (id) => {
    let { barcode } = this.state;
    barcode = barcode.filter((barcode) => barcode.id !== id); // get current barode
    this.setState({ barcode });
  };
  onProceed = () => {
    const { bc, barcode } = this.state;
    barcode.push({
      id: shortid.generate(),
      barcode: bc.trim(),
    });
    this.setState({ barcode, isModal: false });
  };

  compareDateOfOrder = (returnDate, bc) => {
    let { data } = this.state;
    let date1 = new Date(data.rentDate);
    let date2 = new Date(returnDate);
    let diff = new DF(date1, date2);
    const finalDays = Math.ceil(diff.days());
    if (finalDays > 0 && finalDays <= 5) {
      this.setState({ errormsg: "Mild Critical", isModal: true, bc });
      return false;
    }
    if (finalDays == 0) {
      this.setState({ errormsg: "Critical", isModal: true, bc });
      return false;
    }
    if (finalDays <= -1) {
      this.setState({ errormsg: "VERY CRITICAL", isModal: true, bc });
      return false;
    }
    return true;
  };

  handleChange = (e, barcode_id = "") => {
    let name = e.target.name;
    let value = e.target.value;
    let { barcode } = this.state;

    let barcode_obj = barcode.filter((barcode) => barcode.id === barcode_id)[0];
    const barcodeIndex = barcode.findIndex(
      (barcode) => barcode.id === barcode_id
    );
    barcode_obj[name] = value;
    barcode[barcodeIndex] = barcode_obj;

    this.setState({ barcode });
  };

  getBarcodeRow = () => {
    let { barcode } = this.state; // get all barcode
    if (barcode) {
      return barcode.map((barcode) => (
        <div id="sizes_box" key={barcode.id || barcode._id}>
          <div className="row">
            <div className="left">
              <input
                type="text"
                className="form-control mm-input s-input"
                placeholder="Barcode"
                name="barcode"
                id="widthBr"
                style={{ width: "-webkit-fill-available", color: "black" }}
                onChange={(e) => this.handleChange(e, barcode.id)}
                value={barcode.barcode}
              />
            </div>
            <div className="right">
              <button
                type="button"
                onClick={() => this.removeBarcodeRow(barcode.id)}
                className="btn btn-raised btn-sm btn-icon btn-danger mt-1"
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <div className="right">
              <button
                type="button"
                className="btn btn-raised btn-sm btn-success mt-1"
              >
                <i className="=ft ft-edit"></i>
              </button>
            </div>
          </div>
        </div>
      ));
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.location.state === undefined) {
      return <Redirect to="/rentproduct" />;
    }
    // if (this.props.customer === null) {
    //   return <Redirect to="/rentproduct" />;
    // }
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("Rentproduct")) {
        return <Redirect to="/Error" />;
      }
    }

    const { customer } = this.props;
    return (
      <React.Fragment>
        <Loader />
        {this.state.isLoading && <LoadingComp />}
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
                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <h2>Scan Barcode To Add Items</h2>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <h3>
                                    {customer && customer.name}{" "}
                                    {`${"#"}${
                                      customer && customer.contactnumber
                                    }`}
                                  </h3>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <form onSubmit={(e) => this.onScanBarcode(e)}>
                                    <input
                                      className="form-control mm-input col-md-12"
                                      maxLength={8}
                                      minLength={8}
                                      type="text"
                                    />
                                  </form>
                                </div>
                              </div>

                              <div className="col-md-12">
                                {this.getBarcodeRow()}

                                <div className="row text-center ">
                                  <div className="col-md-12 btn-cont">
                                    <div className="form-group">
                                      {!!this.state.barcode.length ? (
                                        <Link
                                          to={{
                                            pathname: "/rentorder",
                                            state: {
                                              customer_id:
                                                customer && customer._id,
                                              barcode: this.state.barcode,
                                              data: this.state.data,
                                            },
                                          }}
                                          type="button"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                          id="btnSize2"
                                        >
                                          <i className="ft-check"></i> Checkout
                                        </Link>
                                      ) : (
                                        <h4>
                                          Please scan atleast one barcode!
                                        </h4>
                                      )}
                                    </div>
                                  </div>
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
                  All rights reserved.{" "}
                </span>
              </p>
            </footer>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // classes        className={classes.modal}
          open={this.state.isModal}
          // onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.isModal}>
            <div
              style={{
                width: 500,
                backgroundColor: "#fff",
                border: "2px solid gray",
                padding: "5px",
                color: "#000",
              }}
              // className={classes.paper}
            >
              <h5 id="transition-modal-title" style={{ color: "#000" }}>
                This item {this.state.bc} is found in other orders in close date
                range
              </h5>
              <h3 className="text-center">
                Your Pickup Date :{" "}
                {this.state.myRantDate ? this.state.myRantDate : ""}
              </h3>
              <table
                className="table table-bordered table-light"
                style={{
                  borderWidth: "1px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                <thead>
                  <th className="text-center">Order Number</th>
                  <th className="text-center">Return Date</th>
                </thead>
                <tbody>
                  <tr style={{ margin: "3px" }}>
                    <td className="text-center">
                      {this.state.getOrder
                        ? this.state.getOrder.orderNumber
                        : ""}
                    </td>
                    <td className="text-center">
                      {this.state.getOrder
                        ? moment(this.state.getOrder.returnDate).format(
                            "DD-MM-YYYY"
                          )
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h1 id="transition-modal-description" className="text-center">
                {this.state.errormsg}
              </h1>
              <div className="row ">
                <div className="mx-auto">
                  <button
                    onClick={this.onProceed}
                    className="btn btn-danger"
                    type="button"
                  >
                    Proceed
                  </button>
                  <button
                    onClick={() =>
                      this.setState({ isModal: false, errormsg: "", bc: "" })
                    }
                    className="btn btn-success ml-3"
                    type="button"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
        <OCAlertsProvider />
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  getAllProductsAll: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  saved: PropTypes.bool,
  auth: PropTypes.object,
  customer: PropTypes.object,
};

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
  customer: state.customer.customer,
  products: state.product.products,
});
export default connect(mapStateToProps, {
  getCustomer,
  getAllProductsAll,
})(Checkout);

const LoadingComp = () => {
  return (
    <div className="loaderContainer">
      <div className="loader">
        <img
          src="/assets/logo-icon.gif"
          alt="Loader"
          className="loader-img"
          width="100"
        />
        <div className="ball-grid-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
