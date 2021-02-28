import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Alert from "../layout/Alert";
import shortid from "shortid";
import {
  getAllProducts,
  updateProduct,
  getProductById,
  barcodeUpdateProduct,
  deleteItem,
  deleteProduct,
  changeItemStatus,
  changeItemQuality,
  updateImages,
} from "../../actions/product";
import { searchByBarcode } from "../../actions/rentproduct";
import Loader from "../layout/Loader";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { OCAlert } from "@opuscapita/react-alerts";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import "../../custom.css";
import Switch from "react-switch";
import Pagination from "./Page";

class IndividualBarcode extends Component {
  state = {
    individual_barcode: "",
    barcoderec: "",
    activeOrders: "",
    quality: "",
    status: "acive",
    statusBoolean: false,
    authLog: "",
    saving: false,
    updating: false,
    imgupdating: false,
    images_Arr: "",
    modal_product: null,
    image: "",
    images: [],
    m_imgperpage: [],
    m_logsperpage: [],
  };

  async componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      await this.props.getProductById(state.p_id);
    }
    const { product } = this.props;
    if (product) {
      this.calculateTotals(product);
    }
    var sortedProducts = this.getSortedData(product);
    if (this.props.match.params.id) {
      const barcode_id = this.props.match.params.id;
      const individual_barcode =
        sortedProducts &&
        sortedProducts.filter((item) => item.barcode == barcode_id)[0];

      //search active order for order log
      await this.props.searchByBarcode(barcode_id);
      const { barcoderec } = this.props;
      const activeOrders =
        barcoderec && barcoderec.filter((rec) => rec.status == "active");

      this.setState({
        individual_barcode: individual_barcode,
        barcoderec: barcoderec,
        activeOrders: activeOrders,
        status:
          individual_barcode &&
          individual_barcode.status &&
          individual_barcode.status,
        images_Arr:
          individual_barcode &&
          individual_barcode.images &&
          individual_barcode.images,
        quality:
          individual_barcode &&
          individual_barcode.quality &&
          individual_barcode.quality,
        authLog:
          individual_barcode &&
          individual_barcode.authorization_logs &&
          individual_barcode.authorization_logs,
      });
    }
  }

  deleteImage = (e, id) => {
    e.preventDefault();
    const { images } = this.state;
    const img_obj = images.findIndex((imge) => imge.id === id);
    images.splice(img_obj, 1);

    this.setState({
      ...images,
      image: "",
    });
  };

  _onChange = (e, id = "") => {
    this.setState({
      [e.target.name]: e.target.files[0],
      // src: URL.createObjectURL(e.target.files[0]),
    });

    const { images } = this.state;
    images.push({ img: e.target.files[0], id: shortid.generate() });
    this.setState(images);
  };

  authorizationLogsTable() {
    const authLogArr = [];
    const { m_logsperpage } = this.state;
    if (m_logsperpage) {
      if (m_logsperpage) {
        m_logsperpage.forEach((log, idx) => {
          authLogArr.push({
            sno: idx + 1,
            date: moment(log.date).format("ddd, MMM Do YYYY"),
            // date: log.date,
            employee_name: log.employee_name,
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
          dataField: "message",
          text: "Log",
          sort: true,
        },
      ];

      return (
        <BootstrapTable // bootstrap4
          keyField="id"
          data={authLogArr.length === 0 ? [] : authLogArr}
          columns={columns}
          search
        />
      );
      // return m_logsperpage.map((log) => (
      //      <>
      //        <tr>
      //          <td className="text-center text-muted">
      //            {log.sno}
      //          </td>
      //          <td className="text-center">
      //            {moment(log.date).format("ddd, MMM Do YYYY")}
      //          </td>
      //          <td className="text-center">
      //            {log.employee_name}
      //          </td>
      //          <td className="text-center">
      //            {log.message}
      //          </td>
      //        </tr>
      //      </>
      //    ))
    }
  }

  getViewModal = () => {
    let product = this.state.modal_product;
    if (product) {
      return (
        <div>
          <p>Colors, Sizes & Barcodes</p>
          <div className="tree ">
            <ul>
              {product.color &&
                product.color.map((color, color_i) => (
                  <li key={color_i}>
                    <span>
                      <div
                        className="s1"
                        data-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="Web"
                      >
                        <i className="expanded">
                          <i className="fa fa-arrow-right"></i>
                        </i>{" "}
                        {color.colorname} : {color.total}
                      </div>
                    </span>
                    <div id="Web" className="collapse show">
                      <ul>
                        {color.sizes &&
                          color.sizes.map((size, size_i) => (
                            <li key={size_i}>
                              <span>
                                <i className="fa fa-arrow-right"></i>
                                {size.size} : {size.qty}
                              </span>
                              <ul>
                                {size.barcodes &&
                                  size.barcodes.map((barcode, barcode_i) => (
                                    <li key={barcode_i}>
                                      <span>
                                        <i className="fa fa-arrow-right"></i>
                                        BARCODE ID # {barcode.barcode}
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  };
  calculateTotals = (product) => {
    // looping through prducts
    let rows = [];
    // looping through each color of current product
    if (product.color) {
      let product_total = 0;
      product.color.forEach((color, c_index) => {
        let color_size_total = 0;
        // looping through sizes of current color
        if (color.sizes) {
          color.sizes.forEach((size, s_index) => {
            color_size_total += parseInt(size.qty);
            size.is_open = false;
          });
          color.total = color_size_total;
          color.is_open = false;
        }

        product_total += parseInt(color.total);
      });
      product.total = product_total;
    }
    // break tags by comma
    if (product.tags && typeof product.tags === "string") {
      let tags_arr = product.tags.split(",");
      product.tags = tags_arr;
    }
    rows.push(product);
    // products foreach ends here
    this.setState({ formated_products: rows });
  };

  setModalProduct = (id) => {
    const { formated_products } = this.state;
    if (formated_products) {
      formated_products.forEach((product, p_index) => {
        if (product._id === id) {
          this.setState({ modal_product: product });
        }
      });
    }
  };

  handleChange = (e, value) => {
    this.setState({ [e.target.name]: value });
  };

  onSubmitImages = async (e, barcode) => {
    e.preventDefault();
    const state = { ...this.state };
    this.setState({ imgupdating: true });

    const formData = new FormData();
    if (this.state.images.length == 0) {
      OCAlert.alertError("Please Upload Image", { timeOut: 3000 });
      this.setState({ imgupdating: false });
      return;
    } else if (this.state.images.length > 0) {
      let m_image = [];
      state.images.forEach((img, color_i) => {
        m_image.push(img.img);
      });

      m_image.forEach((imag) => {
        formData.append("image", imag);
      });
      await this.props.updateImages(formData, barcode);
    }

    const { singleProduct } = this.props.images;
    var sortedProducts = this.getSortedData(singleProduct);

    const barcode_id = this.props.match.params.id;
    const individual_barcode =
      sortedProducts &&
      sortedProducts.filter((item) => item.barcode == barcode_id)[0];
    this.setState({
      authLog: individual_barcode && individual_barcode.authorization_logs,
      imgupdating: false,
      images: "",
      image: "",
      images_Arr: individual_barcode && individual_barcode.images,
    });
  };

  onSubmitStatus = async (e, barcode) => {
    e.preventDefault();
    this.setState({ saving: true });
    const status = this.state.status;
    let productStatus =
      this.state.individual_barcode.product_status &&
      this.state.individual_barcode.product_status;
    if (productStatus == "false") {
      await this.props.changeItemStatus(status, barcode);
      const { singleProduct } = this.props.product;

      var sortedProducts = this.getSortedData(singleProduct);

      const barcode_id = this.props.match.params.id;
      const individual_barcode =
        sortedProducts &&
        sortedProducts.filter((item) => item.barcode == barcode_id)[0];
      this.setState({
        authLog: individual_barcode.authorization_logs,
        saving: false,
      });
    } else {
      // error message
      OCAlert.alertError("The Product is disabled", {
        timeOut: 3000,
      });
      this.setState({
        saving: false,
      });
    }
  };
  onSubmitQuality = async (e, barcode) => {
    this.setState({ updating: true });
    const quality = this.state.quality;
    await this.props.changeItemQuality(quality, barcode);

    const { singleProduct } = this.props.product;

    var sortedProducts = this.getSortedData(singleProduct);

    const barcode_id = this.props.match.params.id;
    const individual_barcode =
      sortedProducts &&
      sortedProducts.filter((item) => item.barcode == barcode_id)[0];
    this.setState({
      authLog: individual_barcode.authorization_logs,
      updating: false,
    });
  };
  // return sorted products for barcodes / without barcodes
  getSortedData = (product) => {
    // looping through prduct
    let rows = [];
    if (product) {
      // products.forEach((product, p_index) => {
      let product_name = product.name;
      let product_id = product._id;
      let product_status = product.disabled;

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
                  short_product_id: product.productId,
                  barcodeIndex: i, // will be used to identify index of barcode when changeBarcode is called
                  title: product_name,
                  product_status: product_status,
                  color_name: color_name,
                  size_name: size_name,
                  barcode: size.barcodes[i].barcode,
                  status: size.barcodes[i].status,
                  quality: size.barcodes[i].quality,
                  authorization_logs: size.barcodes[i].authorization_logs,
                  images: size.barcodes[i].images,
                };
                rows.push(row);
              }
            });
          }
        });
      }
      // }); // products foreach ends here
      return rows;
    }
  };

  getOrderTable = () => {
    const { barcoderec } = this.props;
    const { activeOrders } = this.state;
    if (barcoderec) {
      var m_rec = [];
      barcoderec.forEach((rec, p_index) => {
        m_rec.push({
          orderNumber: rec.orderNumber,
          customerName: rec.customer.name,
          customerContact: rec.customer.contactnumber,
          status:
            rec.status == "lost" ? (
              <span
                className="badge custom_badge"
                style={{ backgroundColor: "#163A5F", color: "#fff" }}
              >
                {rec.status}
              </span>
            ) : rec.status == "active" ? (
              <span
                className="badge custom_badge"
                style={{ backgroundColor: "#8C52FF", color: "#fff" }}
              >
                {rec.status}
              </span>
            ) : rec.status == "ready" ? (
              <span
                className="badge custom_badge"
                style={{ backgroundColor: "#45EBA5", color: "#fff" }}
              >
                {rec.status}
              </span>
            ) : rec.status == "alteration" ? (
              <span className="badge custom_badge badge-warning">
                {'cancelled'}
              </span>
            ) : rec.status == "pending" ? (
              <span className="badge custom_badge badge-secondary">
                {rec.status}
              </span>
            ) : (
              <span
                className="badge custom_badge"
                style={{ backgroundColor: "#ffdc1f" }}
              >
                {rec.status}
              </span>
            ),
          actions: (
            <>
              <Link
                to={{ pathname: `/orders/vieworder/${rec._id}` }}
                className="success p-0"
              >
                <i className="ft-edit-3 font-medium-3 mr-2 " title="Edit"></i>
              </Link>
            </>
          ),
        });
      });
    }
    const columns = [
      {
        dataField: "orderNumber",
        text: "Order ID",
        sort: true,
      },
      {
        dataField: "customerName",
        text: "Customer Name",
        sort: true,
      },
      {
        dataField: "customerContact",
        text: "Phone",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "actions",
        text: "Actions",
        sort: true,
      },
    ];
    return (
      <>
        {m_rec == null || (m_rec && !(m_rec.length > 0)) ? (
          <BootstrapTable
            keyField="id"
            data={[]}
            columns={columns}
            noDataIndication="No order found"
          />
        ) : (
          <>
            <div className="row">
              <div className="col-md-12">
                {activeOrders && activeOrders.length > 0 ? (
                  <h4
                    className="alert alert-success"
                    style={{ textAlign: "center" }}
                  >
                    <Link
                      to={`/orders/vieworder/${activeOrders[0]._id}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{ color: "black" }}
                    >
                      This iten is being used in an <b>ACTIVE</b> order{" "}
                      <b>{`${activeOrders[0].orderNumber}`}</b>. Expected return
                      on{" "}
                      <b>{`${moment(activeOrders[0].returnDate).format(
                        "DD-MM-YYYY"
                      )}`}</b>
                      .
                    </Link>{" "}
                  </h4>
                ) : (
                  ""
                )}
              </div>
            </div>
            <br />
            <BootstrapTable
              // bootstrap4
              keyField="id"
              data={m_rec}
              columns={columns}
              defaultSortDirection="asc"
              headerClasses="hoveredheader"
            />
          </>
        )}
      </>
    );
  };

  togglehandleChange = (status) => {
    if (status === true) {
      this.setState({ status: "Active" });
    } else if (status === false) {
      this.setState({ status: "Disable" });
    }
  };
  onChangePage_Auth = (paggedArr) => {
    this.setState({ m_logsperpage: paggedArr });
  };
  onChangePage = (paggedArr) => {
    this.setState({ m_imgperpage: paggedArr });
  };
  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("Barcode")) {
        return <Redirect to="/Error" />;
      }
    }
    const { individual_barcode } = this.state;
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>

          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <div className="form-body">
                  <Alert />
                  <div className="card">
                    <div className="card-header">
                      <h3 className="form-section ml-3">
                        {individual_barcode && individual_barcode.title}
                      </h3>
                      <hr />
                    </div>

                    <div className="card-body">
                      <table
                        className="table table-borderless table_indBcode"
                        style={{ width: "100%" }}
                      >
                        <tr>
                          <th>Barcode ID :</th>
                          <td colspan="2" style={{ textAlign: "left" }}>
                            {" "}
                            {individual_barcode && individual_barcode.barcode}
                          </td>
                        </tr>
                        <tr>
                          <th>Product ID :</th>
                          <td style={{ textAlign: "left" }}>
                            {" "}
                            <a
                              style={{
                                backgroundColor: "white",
                                borderStyle: "none",
                              }}
                              data-toggle="modal"
                              data-target="#viewModal"
                              onClick={(e) =>
                                this.setModalProduct(
                                  individual_barcode.product_id
                                )
                              }
                            >
                              {individual_barcode &&
                                individual_barcode.short_product_id}
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <th>Color :</th>
                          <td style={{ textAlign: "left" }}>
                            {" "}
                            {individual_barcode &&
                              individual_barcode.color_name}
                          </td>
                        </tr>

                        <tr>
                          <th>Quality :</th>
                          <td style={{ textAlign: "left" }}>
                            {" "}
                            <label className="radio-inline _radio mr-4">
                              <input
                                type="radio"
                                name="quality"
                                checked={this.state.quality == "good-condition"}
                                onChange={(e) =>
                                  this.handleChange(e, "good-condition")
                                }
                              />
                              <span className="mx-1">
                                <i className="fa fa-check"></i>
                              </span>{" "}
                              Good Condition
                            </label>
                            <label className="radio-inline _radio">
                              <input
                                type="radio"
                                name="quality"
                                checked={this.state.quality == "minor-damage"}
                                onChange={(e) =>
                                  this.handleChange(e, "minor-damage")
                                }
                              />{" "}
                              <span className="mx-1">
                                <i className="fa ft-alert-triangle"> </i>
                              </span>{" "}
                              Minor Damage{" "}
                            </label>
                            <label className="radio-inline _radio ml-4">
                              <input
                                type="radio"
                                name="quality"
                                checked={this.state.quality == "major-damage"}
                                onChange={(e) =>
                                  this.handleChange(e, "major-damage")
                                }
                              />{" "}
                              <span className="mx-1">
                                <i className="fa fa-close"> </i>
                              </span>{" "}
                              Major Damage
                            </label>
                          </td>
                          <td>
                            {this.state.updating ? (
                              <button
                                type="submit"
                                className="badge badge-success"
                              >
                                <div
                                  className="mr-2 spinner-grow spinner-grow-sm "
                                  role="status"
                                ></div>{" "}
                                &nbsp; Updating{" "}
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="badge badge-success"
                                onClick={(e) =>
                                  this.onSubmitQuality(
                                    e,
                                    individual_barcode.barcode
                                  )
                                }
                              >
                                <i className="ft-chevron-down" /> Update Quality
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Status :</th>
                          <td style={{ textAlign: "left" }}>
                            {" "}
                            <Switch
                              name="status"
                              className="react-switch"
                              uncheckedIcon={false}
                              checkedIcon={false}
                              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                              height={20}
                              width={48}
                              handleDiameter={30}
                              onChange={(e) =>
                                this.togglehandleChange(e, "status")
                              }
                              checked={this.state.status == "Active"}
                            />
                          </td>
                          <td>
                            {" "}
                            {this.state.saving ? (
                              <button
                                type="submit"
                                className="badge badge-success"
                              >
                                <div
                                  className="mr-2 spinner-grow spinner-grow-sm "
                                  role="status"
                                ></div>{" "}
                                &nbsp; Updating{" "}
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="badge badge-success"
                                onClick={(e) =>
                                  this.onSubmitStatus(
                                    e,
                                    individual_barcode.barcode
                                  )
                                }
                              >
                                <i className="ft-chevron-down" /> Update Status
                              </button>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <th>Upload Image :</th>
                          <td>
                            {" "}
                            <input
                              name="image"
                              type="file"
                              className="form-control-file file btn btn-raised shadow-z-1-hover"
                              id="projectinput8"
                              accept="image/jpeg,image/gif,image/jpg,image/png,image/x-eps"
                              onChange={(e) => this._onChange(e)}
                            />
                          </td>
                          <td>
                            {this.state.imgupdating ? (
                              <button
                                type="submit"
                                className="badge badge-success"
                              >
                                <div
                                  className="mr-2 spinner-grow spinner-grow-sm"
                                  role="status"
                                ></div>{" "}
                                &nbsp; Updating{" "}
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="badge badge-success"
                                onClick={(e) =>
                                  this.onSubmitImages(
                                    e,
                                    individual_barcode.barcode
                                  )
                                }
                              >
                                <i className="ft-chevron-down" /> Update Image
                              </button>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td colspan="1"></td>
                          <td>
                            <div className="mt-n3">
                              {this.state.images.length > 0 &&
                                this.state.images.map((image) => {
                                  return (
                                    <div className="hovereffect w-25">
                                      <img
                                        className="img-responsive"
                                        src={URL.createObjectURL(image.img)}
                                        width="140"
                                        height="100"
                                        alt=""
                                      />
                                      <div className="overlay">
                                        <h2 className="">
                                          <i
                                            className="fa fa-trash mt-3"
                                            onClick={(e) =>
                                              this.deleteImage(e, image.id)
                                            }
                                          ></i>
                                        </h2>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  {(user &&
                    user.systemRole === "Employee" &&
                    user.sections.includes("Orders")) ||
                  (user && user.systemRole === "Admin") ? (
                    <>
                      <div className="card">
                        <div className="card-header">
                          <h3 className="form-section">
                            <i className="ft-info"></i> Orders with this item
                            <hr />
                          </h3>
                        </div>
                        <div className="card-body mx-2 mt-n3">
                          {this.getOrderTable()}
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <h3 className="form-section">
                            <i className="ft-info"></i> Authorization Logs
                            <hr />
                          </h3>
                        </div>
                        <div className="card-body mx-2 mt-n4">
                          <Pagination
                            items={this.state.authLog}
                            onChangePage={(e) => this.onChangePage_Auth(e)}
                          />

                          {this.authorizationLogsTable()}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="card">
                    <div className="card-header">
                      <h3 className="form-section">
                        <i className="fa fa-th"></i> Images
                        <hr />
                      </h3>
                    </div>
                    <div className="card-body mx-2">
                      <div className="row mx-1 mt-n4">
                        <Pagination
                          items={this.state.images_Arr}
                          onChangePage={(e) => this.onChangePage(e)}
                        />
                        <div className="product-container image-gallery w-100">
                          {this.state.m_imgperpage.map((image) => (
                            <div className="products">
                              <img
                                src={image.img}
                                alt="Item"
                                width={180}
                                height={180}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ clear: "both" }}></div>

            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2">
                <span>
              All rights reserved.{" "}
                </span>
              </p>
            </footer>
          </div>
          <div
            className="modal fade"
            id="viewModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="viewModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="viewModalLabel">
                    Product Details
                  </h5>
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
                  {this.getViewModal()}
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <OCAlertsProvider />
      </React.Fragment>
    );
  }
}

IndividualBarcode.propTypes = {
  saved: PropTypes.bool,
  getAllProducts: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  barcodeUpdateProduct: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  searchByBarcode: PropTypes.func.isRequired,
  changeItemStatus: PropTypes.func.isRequired,
  changeItemQuality: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  product: state.product.product,
  singleproduct: state.product.singleproduct,
  images: state.product.images,
  saved: state.product.saved,
  auth: state.auth,
  products_total: state.product.products_total,
  barcoderec: state.rentproduct.barcoderec,
});
export default connect(mapStateToProps, {
  getAllProducts,
  updateProduct,
  getProductById,
  barcodeUpdateProduct,
  deleteItem,
  deleteProduct,
  searchByBarcode,
  changeItemStatus,
  changeItemQuality,
  updateImages,
})(IndividualBarcode);
