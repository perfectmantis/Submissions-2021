import React, { Component } from 'react'
import Sidebar from '../../layout/Sidebar'
import Header from '../../layout/Header'
import { getProduct } from '../../../actions/product'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from '../../layout/Alert'
import Loader from '../../layout/Loader'

class Product extends Component {
  async componentDidMount() {
    if (this.props.match.params.id) {
      const id = this.props.match.params.id
      await this.props.getProduct(id)
    }
  }

  handleChange = (e, id = '') => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { auth } = this.props

    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to='/' />
    }
    const { product } = this.props
    return (
      <React.Fragment>
        <Loader />
        <div className='wrapper menu-collapsed'>
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>
          <div className='main-panel'>
            <div className='main-content'>
              <div className='content-wrapper'>
                <section id='extended'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'>View Product</h4>

                          <div className='card-body'>
                            <div className='row'>
                              <div className='form-group col-md-6 mb-2 text-center'>
                                {product ? (
                                  <>
                                    <img
                                      alt={'product'}
                                      id='projectinput8'
                                      src={`${product.image}`}
                                      height={290}
                                      width={250}
                                    />
                                  </>
                                ) : (
                                  ''
                                )}
                              </div>
                              <div className='form-group col-md-6 mb-2'>
                                <div className='row'>
                                  <div className='form-group col-12 mb-2'>
                                    <label htmlFor='projectinput1'>Name</label>
                                    <input
                                      type='text'
                                      id='projectinput1'
                                      className='form-control'
                                      placeholder='User Name'
                                      name='productname'
                                      value={product ? product.name : ''}
                                    />
                                  </div>
                                  <div className='form-group col-12 mb-2'>
                                    <label htmlFor='projectinput3'>
                                      Fabric
                                    </label>
                                    <input
                                      type='text'
                                      id='projectinput3'
                                      className='form-control'
                                      placeholder='E-mail'
                                      name='email'
                                      value={product ? product.fabric : ''}
                                    />
                                  </div>
                                  <div className='form-group col-12 mb-2'>
                                    <label htmlFor='projectinput4'>Size</label>
                                    <input
                                      type='text'
                                      id='projectinput4'
                                      className='form-control'
                                      placeholder='Phone'
                                      name='contactnumber'
                                      value={product ? product.size : ''}
                                    />
                                  </div>
                                  <div className='form-group col-12 mb-2'>
                                    <label htmlFor='projectinput6'>
                                      Available Quanity
                                    </label>
                                    <br></br>
                                    <input
                                      type='text'
                                      id='projectinput4'
                                      className='form-control'
                                      placeholder='Phone'
                                      name='contactnumber'
                                      value={
                                        product ? product.availableQuantity : ''
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='card-content'>
                          <div className='card-body table-responsive'>
                            <Alert />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <footer className='footer footer-static footer-light'>
            <p className='clearfix text-muted text-sm-center px-2'>
              <span>
           All rights reserved.{' '}
              </span>
            </p>
          </footer>
        </div>
      </React.Fragment>
    )
  }
}

Product.propTypes = {
  auth: PropTypes.object,
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.array,
}

const mapStateToProps = (state) => ({
  product: state.product.product,
  auth: state.auth,
})
export default connect(mapStateToProps, {
  getProduct,
})(Product)
