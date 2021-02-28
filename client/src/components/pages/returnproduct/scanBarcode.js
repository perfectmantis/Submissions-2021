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
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";
import Modal1 from "./Modal1";

class ScanBarcode extends Component {
  state = {
    barcode: [],
    customer: "",
    order: "",
    barcodeFromInput: "",
    matchedBarcodes: [],
    openModal: false,
    condition: "",
    note: "",
    selectedBarCode: "",
    showForm: false,
  };

  async componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.setState({
        customer: state.customer,
        barcode: state.order[0].barcodes,
        order: state.order,
      });
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
  handleChangeInput = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onScanBarcode = (e) => {
    e.preventDefault();
    e.target[0].value = "";
    const { barcode } = this.state;
    let { barcodeFromInput } = this.state;
    const { matchedBarcodes } = this.state;

    let m_barcode = [];
    matchedBarcodes.forEach((barcode, b_index) => {
      m_barcode.push(barcode.barcode);
    });
    const isInclude = m_barcode.includes(barcodeFromInput);
    if (isInclude === true) {
      OCAlert.alertError("This barcode already scanned! Try again", {
        timeOut: 3000,
      });
      this.setState({ barcodeFromInput: "" });
      return;
    }

    let isMatch = barcode.includes(barcodeFromInput);
    if (isMatch === true) {
      matchedBarcodes.push({
        barcode: barcodeFromInput,
      });
      this.setState({ matchedBarcodes, barcodeFromInput: "" });
    } else {
      OCAlert.alertError(
        `The barcode you enter does not match with any item
        in this order. Please try again!`,
        { timeOut: 3000 }
      );
    }
  };

  removeBarcodeRow = (id) => {
    let { barcode } = this.state;
    barcode = barcode.filter((barcode) => barcode.id !== id); // get current barode
    this.setState({ barcode });
  };

  getBarcodeRow = () => {
    let { matchedBarcodes } = this.state; // get all barcode
    if (matchedBarcodes) {
      return matchedBarcodes.map((barcode, b_index) => (
        <tr key={b_index}>
          <th scope="row">{b_index + 1}</th>
          <td>{barcode.barcode}</td>
          <td>{barcode.condition ? barcode.condition : ""}</td>
          <td>{(barcode.note && barcode.condition  !="good") ? barcode.note : ""}</td>
          <td>
            <button
              onClick={() => this.handleOpen(barcode.barcode)}
              type="button"
              className="btn btn-raised btn-sm btn-icon btn-default mt-1"
            >
              {barcode.condition == "good" ? (
                <i
                  style={{ fontSize: "30px" }}
                  className="fa fa-check fa-2x text-success"
                ></i>
              ) : barcode.condition == "Minor damage" ? (
                <i
                  style={{ fontSize: "30px" }}
                  className="fa fa-exclamation-triangle fa-5 text-warning"
                ></i>
              ) : barcode.condition == "Major damage" ? (
                <i
                  style={{ fontSize: "30px" }}
                  className="fa fa-times fa-5 text-danger"
                ></i>
              ) : (
                <i
                  style={{ fontSize: "30px" }}
                  className="fa fa-check fa-2x text-success"
                ></i>
              )}
            </button>
          </td>
        </tr>

        // <div id="sizes_box" key={b_index}>
        //   <div className="row">
        //     <div className="left">
        //       <input
        //         type="text"
        //         className="form-control mm-input s-input"
        //         placeholder="Barcode"
        //         id="widthBr"
        //         style={{ width: "-webkit-fill-available",color:'black' }}
        //         value={barcode.barcode}
        //         readOnly
        //       />
        //     </div>
        //     <div className="right">
        //       <button
        //         onClick={this.handleOpen}
        //         type="button"
        //         className="btn btn-raised btn-sm btn-icon btn-default mt-1"
        //       >
        //         <i className="fa fa-check fa-2x text-success"></i>
        //       </button>
        //     </div>
        //   </div>
        // </div>
      ));
    }
  };

  handleOpen = (selectedBarCode) => {
    const { matchedBarcodes, note, condition } = this.state;
    let myObj = matchedBarcodes.find((obj) => obj.barcode == selectedBarCode);
    if (myObj.condition == undefined) {
      this.setState({ openModal: true, selectedBarCode: selectedBarCode });
    } else {
      this.setState({
        openModal: true,
        selectedBarCode: selectedBarCode,
        note: myObj.note,
        condition: myObj.condition,
      });
    }
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  onChangeCondition = (value) => {
    if (value == "good") {
      const { selectedBarCode, matchedBarcodes } = this.state;
      let array1 = matchedBarcodes;
      let indexOf = array1.findIndex((obj) => obj.barcode == selectedBarCode);
      if (indexOf != -1) {
        array1[indexOf].condition = value;
        this.setState({
          condition: value,
          openModal: false,
          note: "",
          condition: "",
          matchedBarcodes: array1,
          showForm: false,
        });
      }
    } else {
      this.setState({
        showForm: true,
        condition: value,
      });
    }
  };
  onSubmitOtherCondition = (value) => {
    const { selectedBarCode, matchedBarcodes, note } = this.state;
    let array1 = matchedBarcodes;
    let indexOf = array1.findIndex((obj) => obj.barcode == selectedBarCode);
    if (indexOf != -1) {
      array1[indexOf].condition = value;
      array1[indexOf].note = note;
      this.setState({
        condition: value,
        openModal: false,
        note: "",
        condition: "",
        matchedBarcodes: array1,
        showForm: false,
      });
    }
  };
  onChangeNote = (value) => {
    this.setState({ note: value });
  };
  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.location.state === undefined) {
      return <Redirect to="/returnproduct" />;
    }

    const { customer } = this.state;
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>
          <Modal1
            openModal={this.state.openModal}
            handleClose={this.handleClose}
            handleOpen={this.handleOpen}
            condition={this.state.condition}
            note={this.state.note}
            showForm={this.state.showForm}
            onChangeCondition={this.onChangeCondition}
            onChangeNote={this.onChangeNote}
            onSubmitOtherCondition={this.onSubmitOtherCondition}
          />
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="form-action-layouts">
                  <div className="form-body">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Return a Product</h4>
                      </div>
                      <div className="card-content">
                        <div className="card-body table-responsive">
                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <h2>Scan Barcode And Match Items</h2>
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
                                      name="barcodeFromInput"
                                      className="form-control mm-input col-md-12"
                                      style={{ color: "black" }}
                                      type="text"
                                      value={this.state.barcodeFromInput}
                                      onChange={(e) =>
                                        this.handleChangeInput(e)
                                      }
                                    />
                                  </form>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <table className="table table-sm table-bordered table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Barcode</th>
                                      <th scope="col">Condition</th>
                                      <th scope="col">Note</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.getBarcodeRow()}</tbody>
                                </table>

                                <div className="row text-center ">
                                  <div className="col-md-12 btn-cont">
                                    <div className="form-group">
                                      {!!this.state.matchedBarcodes.length ? (
                                        <Link
                                          to={{
                                            pathname: "/matchbarcodes",
                                            state: {
                                              // customer: this.props.customer[0]._id,
                                              barcodesArray: this.state
                                                .matchedBarcodes,
                                              order: this.state.order,
                                              orderedBarcode: this.state
                                                .barcode,
                                            },
                                          }}
                                          type="submit"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                          id="btnSize2"
                                        >
                                          <i className="ft-check"></i> Next
                                        </Link>
                                      ) : (
                                        <button
                                          type="submit"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1 disabled"
                                          id="btnSize2"
                                        >
                                          <i className="ft-check"></i> Next
                                        </button>
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

ScanBarcode.propTypes = {
  auth: PropTypes.object,
  customer: PropTypes.object,
  getCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customer: state.customer.customer,
});
export default connect(mapStateToProps, {
  getCustomer,
})(ScanBarcode);
