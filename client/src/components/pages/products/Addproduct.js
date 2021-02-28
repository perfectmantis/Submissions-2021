import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {
  addNewProduct,
  getProductById,
  updateProduct,
  getSize,
} from "../../../actions/product";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shortid from "shortid";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";
import "../../../custom.css";

class AddProduct extends Component {
  state = {
    productId: "",
    id: "",
    image: "",
    name: "",
    tags: "",
    color: [
      {
        _id: shortid.generate(),
        colorname: "",
        sizes: [
          {
            id:shortid.generate(),
            price:"",
            qty:"",
            size:""
          },
        ],
      },
    ],
    saving: false,
    imgUpd: false,
    isEdit: false,
    src: "",
    sizeQty: "",
    individual_color_size_total: "",
    enteredSizeQty: "",
  };

  async componentDidMount() {
    // check form is to Add or Edit
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      await this.props.getProductById(id);
      const { product } = this.props;
      const test1 = this.calculateTotals(this.props.product);
      if (product) {
        this.setState({
          id: id,
          isEdit: true,
          name: product.name,
          tags: product.tags,
          image: product.image,
          color: product.color,
          totalFromProps: test1.total,
        });
      }
    }
  }
  addSizeRow = (color_id) => {
    let { color } = this.state; // get all colors
    let color_obj = color.filter((color) => color._id === color_id); // get current color obj
    // get index of color i all colors object
    const index = color.findIndex((color_obj) => color_obj.id === color_id);

    color_obj[0].sizes.push({
      id: shortid.generate(),
      size: "",
      price: "",
      qty: "",
    });
    color[index] = color_obj[0];
    this.setState({ color: color });
  };

  addColorBox = (id) => {
    let { color } = this.state; // get all colors
    color.push({
      _id: shortid.generate(),
      colorname: "",
      sizes: [],
    });
    this.setState({ color, isEdit: true });
  };

  addSizeRow = (color_id) => {
    let { color } = this.state; // get all colors
    let color_obj = color.filter((color) => color._id === color_id); // get current color obj

    // get index of color i all colors object
    const index = color.findIndex((color_obj) => color_obj.id === color_id);

    color_obj[0].sizes.push({
      id: shortid.generate(),
      size: "",
      price: "",
      qty: "",
    });

    color[index] = color_obj[0];

    this.setState({ color: color });
  };

  removeSizeRow = (color_id, size_id) => {
    let { color } = this.state;
    let color_obj = color.filter((color) => color._id === color_id); // get current color obj
    if (size_id !== "") {
      let { sizes } = color_obj[0];
      const sizeIndex = sizes.findIndex((size) => size.id === size_id);
      sizes.splice(sizeIndex, 1);

      this.setState({
        ...sizes,
      });
    }
  };

  removeColorBox = (color_id) => {
    let { color } = this.state;
    color = color.filter((color) => color._id !== color_id); // get current color obj
    this.setState({ color });
  };

  getColors = () => {
    let { color } = this.state;

    return (
      color &&
      color.map((color) => (
        <div className="row color-row" key={color._id || color._id}>
          <div
            className="left"
            style={{ width: "95%", paddingLeft: "25px", paddingRight: "10px" }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control mm-input "
                placeholder="Color"
                value={color.colorname}
                name="colorname"
                required
                onChange={(e) => this.handleChange(e, color._id)}
              />
            </div>
          </div>
          <div className="right text-center" style={{ paddingRight: "0px" }}>
            <button
              type="button"
              onClick={() => this.removeColorBox(color._id)}
              className="btn btn-raised btn-sm btn-icon btn-danger mt-1"
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <div className="col-md-12"> {this.getSizeboxes(color._id)}</div>
          <div className="row">
            <div className="col-md-12 btn-cont">
              <div className="form-group mb-0">
                <button
                  type="button"
                  onClick={() => this.addSizeRow(color._id)}
                  className="btn "
                >
                  <i className="fa fa-plus"></i> Add another Size
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    );
  };

  handleChange = (e, color_id = "", size_id = "") => {
    this.props.getSize(color_id, size_id);
    let name = e.target.name;
    let value = e.target.value;
    // get all colors
    let { color } = this.state;
    // get current color obj
    let color_obj = color.filter((color) => color._id === color_id)[0]; // get current color obj
    // get index of color obj in all colors
    const colorIndex = color.findIndex((color) => color._id === color_id);
    if (size_id !== "") {
      // get all sizes
      let { sizes } = color_obj;

      // find current size obj in current color obj
      let size_obj = color_obj.sizes.filter((size) => size.id === size_id)[0];

      // get index of size obj in all sizes
      const sizeIndex = sizes.findIndex((size) => size.id === size_id);
    
       // update value inside size object


       size_obj[name] = value;
       // update sizes arr
       sizes[sizeIndex] = size_obj;
       // update curernt color obj
       color[colorIndex].sizes = sizes;
    } else {
      color[colorIndex][name] = value;
    }

    // update state
    this.setState({ color });
  };

  getSizeboxes = (color_id) => {
    let { color } = this.state; // get all colors
    if (color_id) {
      let color_obj = color.filter((color) => color._id === color_id); // get current color obj
      return color_obj[0].sizes.map((size) => (
        <div className="sizes_box" key={size.id}>
          <div className="row">
            <div
              className="left"
              style={{
                width: "95%",
                paddingLeft: "40px",
                paddingRight: "10px",
              }}
            >
              <input
                type="text"
                name="size"
                className="form-control mm-input s-input"
                placeholder="Size"
                onChange={(e) => this.handleChange(e, color_id, size.id)}
                value={size.size}
                required
              />

              <input
                type="text"
                name="qty"
                className="form-control mm-input s-input"
                placeholder="Quantity"
                
                onKeyUp={(e) => this.props.getSize(color_id, size.id)}
                onChange={(e) => this.handleChange(e, color_id, size.id)}
                onBlur={(e) =>
                  this.calculateIndividualTotals(e,color_id,size.id)
                }
                value={size.qty}
                required
              />
              <input
                type="text"
                name="price"
                className="form-control mm-input s-input"
                placeholder="Price"
                onChange={(e) => this.handleChange(e, color_id, size.id)}
                value={size.price}
                required
              />
            </div>
            <div className="right">
              <button
                type="button"
                onClick={() => this.removeSizeRow(color_id, size.id)}
                className="btn btn-raised btn-sm btn-icon btn-danger mt-1"
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      ));
    }
  };

 _onChange = (e, id = "") => {
    this.setState({
      [e.target.name]: e.target.files[0],
      imgUpd: true,
      src: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleChangeName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  calculateTotals = (product) => {
    if (product) {
      // looping through each color of current product
      if (product.color) {
        let product_total = 0;
        product.color.forEach((color, c_index) => {
          let color_size_total = 0;
          // looping through sizes of current color
          if (color.sizes) {
            color.sizes.forEach((size, s_index) => {
              // console.log("size",size)
              color_size_total += parseInt(size.qty);
              // console.log("color_size_total",color_size_total)
            });
            color.total = color_size_total;
          }

          product_total += parseInt(color.total);
        });
        product.total = product_total;
      }

      return product;
    }
    return false;
  };

  calculateIndividualTotals = (e,color_id, size_id) => {
    e.preventDefault();
    let enteredValue = e.target.value;
    const { qty } = this.props;
    if(qty){
         // get all colors
    let { color } = this.state;
    // get current color obj
    let color_obj = color.filter((color) => color._id === color_id)[0]; // get current color obj
    // get index of color obj in all colors
    let colorIndex = color.findIndex((color) => color._id === color_id);
      // get all sizes
      let { sizes } = color_obj;

      // find current size obj in current color obj
      let size_obj = color_obj.sizes.filter((size) => size.id === size_id)[0];

      // get index of size obj in all sizes
      let sizeIndex = sizes.findIndex((size) => size.id === size_id);
      let _qty = qty[0].qty
       if(!(parseInt(enteredValue) > parseInt(_qty)) && (parseInt(enteredValue) != parseInt(_qty)) ){
        OCAlert.alertError(`Quantity can't be less than ${_qty}`, {
          timeOut: 3000,
        });
      
       // update value inside size object
        size_obj["qty"] = _qty;
       // update sizes arr
       sizes[sizeIndex] = size_obj;
       // update curernt color obj
       color[colorIndex].sizes = sizes;

    // update state
    this.setState({ color });
      }
      else{
        size_obj["qty"] =enteredValue;
        // update sizes arr
        sizes[sizeIndex] = size_obj;
        // update curernt color obj
        color[colorIndex].sizes = sizes;
 
     // update state
     this.setState({ color });
      }
    }
    } 
  
  onSubmit = async (e) => {
    e.preventDefault();
    var productId = Math.floor(Math.random() * 899999 + 100000);
    this.setState({ saving: true });
    const state = { ...this.state };

    this.calculateTotals(state);
    if (state.totalFromProps > state.total) {
      OCAlert.alertError(
        `${"Quantity cannot be less than"} ${state.totalFromProps}`,
        { timeOut: 3000 }
      );
      this.setState({ saving: false });
      return;
    }

    let m_color = [];
    state.color.forEach((color, color_i) => {
      m_color.push({
        colorname: color.colorname,
        sizes: color.sizes,
        total: color.total,
      });
    });

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("productId", productId);
    if (state.image !== "") {
      formData.append("image", state.image);
    } else {
      OCAlert.alertError("Please Upload Product Image", { timeOut: 3000 });
      this.setState({ saving: false });
      return;
    }
    formData.append("tags", state.tags);
    formData.append("color", JSON.stringify(m_color));

    if (state.id === "") {
      await this.props.addNewProduct(formData);
    } else {
      await this.props.updateProduct(formData, state.id);
    }

    return;
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { user } = auth;
    if (user && user.systemRole === "Employee") {
      if (user && !user.sections.includes("Inventory")) {
        return <Redirect to="/Error" />;
      }
    }
    if (this.props.saved) {
      return <Redirect to="/product" />;
    }

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
                        <h4 className="form-section">
                          {this.state.id === ""
                            ? "Add New Product"
                            : "Update Product"}
                        </h4>
                      </div>

                      <div className="card-body">
                        <form
                          encType="multipart/form-data"
                          action="/upload"
                          method="POST"
                          onSubmit={(e) => this.onSubmit(e)}
                        >
                          <Alert />
                          <div className="form-group">
                            <input
                              name="image"
                              type="file"
                              className="form-control-file file btn btn-raised gradient-purple-bliss white input-div shadow-z-1-hover"
                              id="projectinput8"
                              accept="image/jpeg,image/gif,image/jpg,image/png,image/x-eps"
                              onChange={(e) => this._onChange(e)}
                            />
                            {this.state.isEdit === true &&
                            this.state.imgUpd === false ? (
                              <img
                                className="media-object round-media"
                                src={`${this.state.image}`}
                                alt={"Product"}
                                height={100}
                              />
                            ) : (
                              ""
                            )}
                            {this.state.imgUpd === true ? (
                              <img
                                className="media-object round-media"
                                src={`${this.state.src}`}
                                alt={"Product"}
                                height={100}
                              />
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              id="projectinput1"
                              className="form-control mm-input"
                              placeholder="Product Name"
                              value={this.state.name}
                              name="name"
                              required
                              onChange={(e) => this.handleChangeName(e)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              id="projectinput1"
                              className="form-control mm-input"
                              placeholder="Tags"
                              value={this.state.tags}
                              name="tags"
                              required
                              onChange={(e) => this.handleChangeName(e)}
                            />
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <h3>Colors</h3>
                            </div>
                          </div>
                          <div id="colors_box">{this.getColors()}</div>

                          <br />
                          <br />

                          <div className="row">
                            <div className="col-md-12 btn-cont">
                              <div className="form-group mb-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    this.addColorBox(this.state.id)
                                  }
                                  className="btn"
                                >
                                  <i className="fa fa-plus"></i> Add another
                                  Color
                                </button>
                              </div>
                            </div>
                          </div>
                          <OCAlertsProvider />
                          <div className="form-actions top">
                            {this.state.id === "" ? (
                              <>
                                {this.state.saving ? (
                                  <button
                                    type="button"
                                    className="mb-2 mr-2 btn btn-raised btn-primary"
                                  >
                                    <div
                                      className="spinner-grow spinner-grow-sm "
                                      role="status"
                                    ></div>{" "}
                                    &nbsp; Adding{" "}
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="mb-2 mr-2 btn btn-raised btn-primary"
                                  >
                                    <i className="ft-check" /> Add Product{" "}
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                {this.state.saving ? (
                                  <button
                                    type="button"
                                    className="mb-2 mr-2 btn btn-raised btn-primary"
                                  >
                                    <div
                                      className="spinner-grow spinner-grow-sm "
                                      role="status"
                                    ></div>{" "}
                                    &nbsp; Updating
                                  </button>
                                ) : (
                                  <button
                                    type="submit"
                                    className="mb-2 mr-2 btn btn-raised btn-primary"
                                  >
                                    <i className="ft-check" /> Update Product
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </form>
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
      </React.Fragment>
    );
  }
}

AddProduct.propTypes = {
  saved: PropTypes.bool,
  addNewProduct: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  auth: PropTypes.object,
  updateProduct: PropTypes.func.isRequired,
  getSize: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product.product,
  qty: state.product.qty,
  saved: state.product.saved,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  addNewProduct,
  getProductById,
  getSize,
  updateProduct,
})(AddProduct);
