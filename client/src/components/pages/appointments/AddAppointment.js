import React, { Component } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import { addNewAppointment } from '../../../actions/appointment';
import { getCustomer } from '../../../actions/rentproduct';
import Alert from '../../layout/Alert';
import Loader from '../../layout/Loader';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts';

class AddAppointment extends Component {
  state = {
    customerNumber: '',
  };
  async componentDidMount() {}

  handleChange = (e, id = '') => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchCustomer = async (e) => {
    e.preventDefault();
    const { customerNumber } = this.state;
    await this.props.getCustomer(customerNumber);

    const { customer } = this.props;

    if (customer && customer.length == 0) {
      this.setState({ customerFound: false });
      OCAlert.alertError(
        'No customer found. Try again or register a new customer!',
        { timeOut: 6000 }
      );
      this.customerNumber.value = '';
      this.customerNumber.focus();
      return;
    } else {
      this.setState({ customer, customerFound: true });
    }
  };
  tryAgain = (e) => {
    e.preventDefault();
    this.customerNumber.value = '';
    this.customerNumber.focus();
    this.setState({
      customerNumber: '',
      customer: '',
      customerFound: false,
    });
  };

  CustomerBox = () => {
    const { customer, customerFound } = this.state;
    if (customerFound === true) {
      return (
        <div id='colors_box'>
          <div className='row'>
            <div className='col-md-12'>
              <h3>List of customers</h3>
            </div>
          </div>

          <div className='row color-row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <h3>Customer information</h3>
              </div>
            </div>
            <div className='col-md-12'>
              <div id='sizes_box'>
                <div className='row'>
                  <div className='left'>
                    <input
                      id='name'
                      type='text'
                      className='form-control mm-input text-center'
                      style={{ color: '#495057' }}
                      value={customer[0].name && customer[0].name}
                      readOnly
                    />
                  </div>
                </div>
                <br />
                <div className='row'>
                  <div className='left'>
                    <input
                      id='number'
                      type='number'
                      className='form-control mm-input text-center'
                      style={{ color: '#495057' }}
                      value={
                        customer[0].contactnumber && customer[0].contactnumber
                      }
                      readOnly
                    />
                  </div>
                </div>
                <br />
                <div className='row'>
                  <div className='left'>
                    <textarea
                      id='address'
                      type='text'
                      className='form-control mm-input text-center'
                      style={{ color: '#495057' }}
                      value={customer[0].address && customer[0].address}
                      readOnly
                    ></textarea>
                  </div>
                </div>
              </div>
              <br />
              <div className='row justify-content-center'>
                <Link
                  to={{
                    pathname: '/appointments/newappointment',
                    state: {
                      customer: customer && customer,
                    },
                  }}
                  type='button'
                  className='btn btn-raised btn-primary round btn-min-width mr-1 mb-1'
                  id='btnSize2'
                >
                  <i className='ft-check'></i> Order
                </Link>
                <button
                  type='button'
                  className='btn btn-raised btn-primary round btn-min-width mr-1 mb-1'
                  onClick={(e) => this.tryAgain(e)}
                  id='btnSize'
                >
                  <i className='ft-rotate-cw'></i> Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
  };
  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to='/' />;
    }
    const { user } = auth;
    if (user && user.systemRole === 'Employee') {
      if (user && !user.sections.includes('Appointments')) {
        return <Redirect to='/Error' />;
      }
    }

    if (this.props.saved) {
      return <Redirect to='/calender' />;
    }

    return (
      <React.Fragment>
        <Loader />
        <div className='wrapper menu-collapsed'>
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>

          <div className='main-panel'>
            <div className='main-content'>
              <div className='content-wrapper'>
                <section id='form-action-layouts'>
                  <div className='form-body'>
                    <div className='card'>
                      <div className='card-header'>
                        <h4 className='form-section'>
                          <i className='icon-social-dropbox'></i>
                          Make A Tryout Appointment
                        </h4>
                      </div>

                      <div className='card-body'>
                        <Alert />
                        <form
                          className='form form-horizontal form-bordered'
                          method='POST'
                          // onSubmit={(e) => this.onSubmit(e)}
                        >
                          <h3>Enter 10 digits of the customer phone number</h3>
                          <div className='position-relative has-icon-right'>
                            <input
                              name='customerNumber'
                              type='text'
                              ref='customerNumber'
                              placeholder='Search'
                              className='form-control round'
                              id='contactnumber'
                              min='10'
                              ref={(input) => {
                                this.customerNumber = input;
                              }}
                              onChange={(e) => this.handleChange(e)}
                            />
                            <div className='form-control-position'>
                              <button
                                type='submit'
                                className='mb-2 mr-2 btn ft-search'
                                onClick={(e) => this.searchCustomer(e)}
                              ></button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className='card-body'>
                        <Alert />
                        <form
                          className='form form-horizontal form-bordered'
                          method='POST'
                          // onSubmit={(e) => this.onSubmit(e)}
                        >
                          {this.state.customerFound == true
                            ? this.CustomerBox()
                            : ''}
                        </form>
                      </div>
                    </div>
                  </div>
                  <OCAlertsProvider />
                </section>
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
        </div>
      </React.Fragment>
    );
  }
}

AddAppointment.propTypes = {
  saved: PropTypes.bool,
  addNewAppointment: PropTypes.func.isRequired,
  auth: PropTypes.object,
  getCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
  saved: state.appointment.saved,
  auth: state.auth,
  products: state.product,
  customer: state.customer.customer,
});
export default connect(mapStateToProps, {
  addNewAppointment,
  getCustomer,
})(AddAppointment);
