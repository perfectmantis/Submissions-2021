import React, { Component } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import { getCustomer } from '../../../actions/customer';
import {
  addNewAppointment,
  getAppointmentbyId,
  updateAppointment,
} from '../../../actions/appointment';
import {
  getPendingOrders,
  getOrderbyOrderNumber,
} from '../../../actions/returnproduct';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../../layout/Alert';
import Loader from '../../layout/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

import { vi } from 'date-fns/esm/locale';

registerLocale('vi', vi);
setDefaultLocale('vi');
class EditAppointment extends Component {
  state = {
    customer: '',
    orderID: '',
    latest_pendingOrder: '',
    date: '',
    note: '',
    categories: [],
    category: '',
    orders: '',
    defaultSelected: '',
    appointment: '',
    isEdit: false,
    showNoOrderRow: false,
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      await this.props.getAppointmentbyId(id);
      const appointment = this.props;
      await this.props.getOrderbyOrderNumber(appointment.appointment.orderID);
      const { orders } = this.props;
      this.setState({
        id: id,
        appointment: appointment.appointment,
        isEdit: true,
        customer: appointment.appointment.customer,
        date: appointment.appointment.date,
        note: appointment.appointment.note,
        orders: orders,
        categories:
          appointment.appointment.categories &&
          appointment.appointment.categories,
        orderID:
          orders.length > 0 ? appointment.appointment.orderID : 'No Order',
        showNoOrderRow: true,
        // defaultSelected: orders.length > 0 ? orders :''
      });
    }
  }

  dateValidity = () => {
    let { date } = this.state;
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const e_Date = moment(date).format('YYYY-MM-DD');
    var isToday = moment(currentDate).isSameOrBefore(e_Date);
    const app_date = new Date(date);

    if (isToday === false && app_date.getTime() - new Date().getTime() < 0) {
      OCAlert.alertError(`Invalid Date`, { timeOut: 3000 });

      this.setState({ date: '', orderID: '', order: '', defaultSelected: '' });
      return;
    }
  };

  selectCategory = () => {
    const { categories, category } = this.state;
    const isInclude = categories.includes(category);
    if (isInclude === true) {
      return '';
    } else {
      return category;
    }
  };

  setCategoryfromSuggestions = (value) => {
    this.setState({
      category: value,
    });
  };
  getPendingOrders = async () => {
    let { date } = this.state;
    const new_date = new Date(date);
    const dateObject = new_date.toISOString();
    const { customer } = this.state;
    if (customer) {
      await this.props.getPendingOrders(customer.contactnumber, dateObject);
      const { orders } = this.props;
      const d_selected = orders.shift();
      this.setState({
        orders: orders,
        defaultSelected: orders.length > 0 ? d_selected : '',
        orderID: orders.length > 0 ? d_selected.orderNumber : 'No Order',
        showNoOrderRow: true,
      });
    }
  };
  getOrderRows = () => {
    const { orders, customer } = this.state;
    if (orders) {
      return orders.map((order) => (
        <tr onClick={(e) => this.selectOrder(order.orderNumber)}>
          <td>
            <h5>
              <input
                type='radio'
                name='orderid'
                checked={this.state.orderID == order.orderNumber ? true : false}
                onChange={(e) => this.selectOrder(order.orderNumber)}
              />{' '}
              Order# {order.orderNumber} &nbsp;&nbsp;&nbsp; {customer.name}{' '}
              &nbsp;&nbsp;&nbsp; Status-{order.status}
            </h5>
          </td>
        </tr>
      ));
    }
  };

  selectOrder = (orderID) => {
    this.setState({
      orderID: orderID,
    });
  };
  handleChangeForDate = (date) => {
    this.setState({
      date: date,
    });
  };

  handleChangeNote = (e, id = '') => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const category = this.selectCategory();
    this.setState({ saving: true });
    const state = { ...this.state };
    var appointment = {
      orderID: state.orderID,
      date: state.date,
      customer: state.customer._id,
      note: state.note,
      category: category,
    };

    await this.props.updateAppointment(appointment, state.id);
    this.setState({ saving: false });
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
      return <Redirect to='/appointments' />;
    }

    const { customer, orders } = this.state;

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
                          Appointment Information                        </h4>
                      </div>
                      <div>
                        {' '}
                        <Alert />
                        <OCAlertsProvider />
                      </div>

                      <div className='card-body'>
                        <form
                          className='form form-horizontal form-bordered'
                          method='POST'
                          onSubmit={(e) => this.onSubmit(e)}
                        >
                          <h4 className='form-section mb-1'>
                            <i className='ft-info'></i> Appointment Information
                          </h4>

                          <div className='row mt-1'>
                            <div className='col-md-12 mb-1'>
                              <table
                                className='table table-borderless table_indBcode'
                                style={{ width: '100%' }}
                              >
                                <thead></thead>
                                <tbody>
                                  <tr>
                                    <th style={{ textAlign: 'left' }}>
                                    Guest name :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      {' '}
                                      {customer && customer.name}
                                    </td>
                                    <th style={{ textAlign: 'left' }}>
                                    Phone number :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      {' '}
                                      {customer && customer.contactnumber}
                                    </td>
                                  </tr>

                                  <tr>
                                    <th style={{ textAlign: 'left' }}>
                                    Address :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      {' '}
                                      {customer && customer.address}
                                    </td>
                                  </tr>

                                  <tr>
                                    <th style={{ textAlign: 'left' }}>
                                    Company :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      {' '}
                                      {customer && customer.company != ''
                                        ? customer.company
                                        : 'none'}
                                    </td>
                                    <th style={{ textAlign: 'left' }}>
                                    Company Address :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      {' '}
                                      {customer &&
                                      customer.company_address != ''
                                        ? customer.company_address
                                        : 'none'}
                                    </td>
                                  </tr>

                                  <tr>
                                    <th style={{ textAlign: 'left' }}>
                                    Appointment Date :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      <DatePicker
                                        dateFormat='dd/MM/yyyy'
                                        locale='vi'
                                        selected={Date.parse(this.state.date)}
                                        className='form-control border-primary'
                                        onChange={(e) =>
                                          this.handleChangeForDate(e)
                                        }
                                        //only when value has changed
                                        onInput={this.dateValidity()}
                                        onCalendarClose={(e) =>
                                          this.getPendingOrders(e)
                                        }
                                        popperPlacement='top-start'
                                        // peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode='select'
                                      />
                                    </td>
                                    <th style={{ textAlign: 'left' }}>
                                      Thể Loại Cuộc Hẹn :
                                    </th>
                                    <td style={{ textAlign: 'left' }}>
                                      <input
                                        type='text'
                                        required
                                        class='form-control'
                                        id='basicInput'
                                        name='category'
                                        max={25}
                                        value={this.state.category}
                                        onChange={(e) =>
                                          this.handleChangeCategory(e)
                                        }
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      {' '}
                                      {this.state.categories &&
                                        this.state.categories.map(
                                          (category, c_i) => {
                                            return (
                                              <span
                                                key={c_i}
                                                className='badge badge-light badge-category m-1'
                                                onClick={(e) =>
                                                  this.setCategoryfromSuggestions(
                                                    category
                                                  )
                                                }
                                              >
                                                {category}
                                              </span>
                                            );
                                          }
                                        )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th style={{ textAlign: 'left' }}>
                                    Note :                                    </th>
                                    <td
                                      colSpan={3}
                                      style={{ textAlign: 'left' }}
                                    >
                                      <textarea
                                        type='text'
                                        class='form-control'
                                        id='basicInput'
                                        name='note'
                                        value={this.state.note}
                                        onChange={(e) =>
                                          this.handleChangeNote(e)
                                        }
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                className='table table-borderless table_indBcode'
                                style={{ width: '100%' }}
                              >
                                <thead></thead>
                                <tbody>
                                  <tr>
                                    <th style={{ textAlign: 'left' }}>
                                    This appointment is related to any order
                                      of the customer?
                                    </th>
                                  </tr>
                                  {this.state.date != '' &&
                                  this.state.defaultSelected != '' ? (
                                    <tr
                                      onClick={(e) =>
                                        this.selectOrder(
                                          this.state.date == ''
                                            ? 'Không tìm thấy đơn hàng nào'
                                            : this.state.defaultSelected
                                                .orderNumber
                                        )
                                      }
                                    >
                                      {' '}
                                      <td>
                                        <h5>
                                          <input
                                            type='radio'
                                            name='defaultSelected'
                                            onChange={(e) =>
                                              this.selectOrder(
                                                this.state.date == ''
                                                  ? 'No Order'
                                                  : this.state.defaultSelected
                                                      .orderNumber
                                              )
                                            }
                                            checked={
                                              this.state.orderID &&
                                              this.state.orderID ==
                                                this.state.defaultSelected
                                                  .orderNumber
                                                ? true
                                                : false
                                            }
                                          />{' '}
                                          Order#{' '}
                                          {
                                            this.state.defaultSelected
                                              .orderNumber
                                          }{' '}
                                          &nbsp;&nbsp;&nbsp; {customer.name}{' '}
                                          &nbsp;&nbsp;&nbsp; Status-
                                          {this.state.defaultSelected.status}
                                        </h5>
                                      </td>
                                    </tr>
                                  ) : (
                                    ''
                                  )}
                                  {this.getOrderRows()}

                                  {this.state.showNoOrderRow ? (
                                    <tr
                                      onClick={(e) =>
                                        this.selectOrder('No Order')
                                      }
                                    >
                                      {' '}
                                      <td>
                                        <h5>
                                          <input
                                            type='radio'
                                            name='orderid'
                                            onChange={(e) =>
                                              this.selectOrder('No Order')
                                            }
                                            checked={
                                              this.state.orderID == 'No Order'
                                                ? true
                                                : false
                                            }
                                          />{' '}
No orders found
                                        </h5>
                                      </td>
                                    </tr>
                                  ) : (
                                    ''
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className='form-actions top'>
                            {this.state.saving ? (
                              <button
                                type='button'
                                className='mb-2 mr-2 btn btn-raised btn-primary'
                              >
                                <div
                                  className='spinner-grow spinner-grow-sm '
                                  role='status'
                                ></div>{' '}
                                &nbsp; Updating{' '}
                              </button>
                            ) : (
                              <button
                                type='submit'
                                className='mb-2 mr-2 btn btn-raised btn-primary'
                              >
                                <i className='ft-check' /> Update Appointment

                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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

EditAppointment.propTypes = {
  saved: PropTypes.bool,
  auth: PropTypes.object,
  addNewAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  saved: state.appointment.saved,
  appointment: state.appointment.appointment,
  auth: state.auth,
  customer: state.customer.customer,
  orders: state.returnproduct.returnorder,
});
export default connect(mapStateToProps, {
  addNewAppointment,
  getCustomer,
  getAppointmentbyId,
  getPendingOrders,
  getOrderbyOrderNumber,
  updateAppointment,
})(EditAppointment);
