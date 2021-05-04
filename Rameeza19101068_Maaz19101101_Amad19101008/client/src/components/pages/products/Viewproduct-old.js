import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {
  getAllProducts,
  deleteProduct,
  getProductById,
  findProducts,
  changeStatus
} from "../../../actions/product";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import {Image} from 'cloudinary-react';



class ViewProduct extends Component {
  state = {
    filter: "",
  };

  async componentDidMount() {
    await this.props.getAllProducts();
    const { products } = this.props;
    if (products) {
      this.calculateTotals(products);
    }
  }
  encodeURI = (src) => {
    var uri = src.split(" ").join("_")
    return uri;
  }

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // return sorted products for barcodes
  getSortedData = (products) => {
    // looping through prducts
    let rows = [];
    products.forEach((product, p_index) => {
      let product_name = product.name;
      let product_id = product._id;
      let product_image = product.image;

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
              let totalQty = size.qty;
              let length;

              // show sizes with barcode
              if (size.barcodes) {
                // if barcodes availble then length should be qty - barcodes length
                length = size.barcodes.length;
              } else {
                length = 0;
              }
              let i;
              for (i = 0; i < length; i++) {
                let row = {
                  product_id: product_id,
                  product_image: product_image,
                  prduct_totalQty: totalQty,
                  color_id: color_id,
                  size_id: size_id,
                  barcodeIndex: i, // will be used to identify index of barcode when changeBarcode is called
                  title: product_name + " | " + color_name + " | " + size_name,
                  barcode: size.barcodes ? size.barcodes[i].barcode : "",
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

  calculateTotals = (products) => {
    // looping through prducts
    let rows = [];
    products.forEach((product, p_index) => {
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
    }); // products foreach ends here
    this.setState({ formated_products: rows });
  };

  toggleColor = (e, product_i, color_i) => {
    const { formated_products } = this.state;

    formated_products[product_i].color[color_i].is_open = !formated_products[product_i].color[color_i].is_open;
    this.setState({ formated_products });
    this.getTAble();
  };

  toggleSize = (e, product_i, color_i, size_i) => {
    const { formated_products } = this.state;

    formated_products[product_i].color[color_i].sizes[
      size_i
    ].is_open = !formated_products[product_i].color[color_i].sizes[size_i]
      .is_open;
    this.setState({ formated_products });;
  };
  // Replace all <img /> with <Img />

  getTAble = () => {
    const { formated_products } = this.state;

    if (formated_products) {
      if (formated_products) {
        if (formated_products.length === 0) {
          return (
            <tr>
              <td colSpan={10} className="text-center">
                No product Found
              </td>
            </tr>
          );
        }
        return formated_products.map((product, i) => (
          <div className="tb_container" key={i}>
            <div className="tb_row">
              <div className="tb_top">
                <div className="tb_t_left">

                  <img
                    className="media-object round-media"
                    src={product.image}
                    alt="Product"
                  />
                </div>
                <div className="tb_t_right">
                  <span className={"badge badge-" + ((product.disabled === "true") ? "secondary" : "info") + " float-right"}>{(product.disabled === "false") ? "active" : "disabled"}</span>
                  <h2>
                    <strong>Product Name</strong> {product.name}
                  </h2>
                  <h2>
                    <strong>Product ID # </strong> {product.productId}
                  </h2>
                  <h2>
                    <strong>Total Items : </strong> {product.total}
                  </h2>
                </div>
              </div>
              <div className="clearfix"></div>

              <div className="tb_center">
                {product.color &&
                  product.color.map((color, color_i) => (
                    <div className={`tb_color_box`} key={color_i}>
                      <button
                        type="button"
                        name="button"
                        className="tb_arrow-btn color_btn"
                        onClick={(e) =>
                          this.toggleColor(e, i, color_i)
                        }
                      >
                        <i
                          className={color.is_open ? "ft-arrow-down" : "ft-arrow-right"}
                        ></i>
                      </button>{" "}
                      <p>
                        {color.colorname} : {color.total}
                      </p>
                      <div
                        className={`tb_color_box_content ${color.is_open ? "show_it" : "hide_it"
                          }`}
                      >
                        {color.sizes &&
                          color.sizes.map((size, size_i) => (
                            <div className="tb_size_box" key={size_i}>
                              <button
                                type="button"
                                name="button"
                                className="tb_arrow-btn size_btn"
                                onClick={(e) =>
                                  this.toggleSize(e, i, color_i, size_i)
                                }
                              >
                                <i
                                  className={size.is_open ? "ft-arrow-down" : "ft-arrow-right"}
                                ></i>
                              </button>{" "}
                              <p>
                                {size.size} : {size.qty}{" "}
                              </p>
                              <div
                                className={`tb_size_box_content ${size.is_open ? "show_it" : "hide_it"
                                  }`}
                              >
                                <div className="tb_barcodes_box">
                                  <ul>
                                    {size.barcodes &&
                                      size.barcodes.map(
                                        (barcode, barcode_i) => (
                                          <li key={barcode_i}>
                                            BARCODE ID # {barcode.barcode}
                                          </li>
                                        )
                                      )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="tb_bottom">
                <p>
                  Tags:
                  {product.tags &&
                    product.tags.map((tag, tag_i) => (
                      <span className="ttag" key={tag_i}>
                        {tag}
                      </span>
                    ))}
                </p>

                <Link
                  to={{
                    pathname: `/product/editproduct/${product._id}`,
                    data: product
                  }}
                  className="card-link default">
                  {" "}
                  <i className="icon-pencil"></i> Edit{" "}
                </Link>
                <button type="button" onClick={(e) => this.toggleStatus(product.disabled, product._id)} className="card-link default">
                  {" "}
                  <i className={"icon-control-" + ((product.disabled === "true") ? "play" : "pause")}></i> {(product.disabled === "true") ? "Reactivate" : "Disable"}
                </button>
              </div>

              <div className="clearfix"></div>
            </div>
          </div>
        ));
      }
    }
  };
  async searchTable() {
    const searchVal = this.state.search;
    if (searchVal) {
      await this.props.findProducts(searchVal);
    } else {
      await this.props.getAllProducts();
    }
  }

  async toggleStatus(status, product_id) {

    if (status === "true") {
      status = "false";
    } else {
      status = "true";
    }
    await this.props.changeStatus(status, product_id);
    await this.props.getAllProducts();
    const { products } = this.props;
    if (products) {
      this.calculateTotals(products);
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Header />
          <Sidebar location={this.props.location} />
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="extended">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">All Products</h4>
                        </div>
                        <div className="card-content">
                          <div className="card-body table-responsive">
                            <div className="row">
                              <div className="col-md-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="search"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </div>
                              <div className="col-md-4">
                                <a
                                  href="/product"
                                  className="btn btn-success"
                                  onClick={() => this.searchTable()}
                                >
                                  <i className="fa fa-search"></i> Search{" "}
                                </a>
                              </div>
                              <div className="col-md-4">
                                <Link
                                  to="/product/addproduct"
                                  className="btn btn-primary pull-right"
                                >
                                  {" "}
                                  <i className="fa fa-plus"></i> New Product
                                </Link>
                              </div>
                            </div>
                            <Alert />
                            {this.getTAble()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>


        
        </div>
      </React.Fragment>
    );
  }
}

ViewProduct.propTypes = {
  auth: PropTypes.object,
  getAllProducts: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  findProducts: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  products: PropTypes.array,
  product: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  product: state.product.product,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllProducts,
  changeStatus,
  deleteProduct,
  getProductById,
  findProducts,
})(ViewProduct);
