import React, { Component } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Alert from '../../layout/Alert';
import Loader from '../../layout/Loader';
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { confirmAlert } from 'react-confirm-alert';
import {
  getAllAppointments,
  checked,
  cancel,
  getCurentDayAppointment,
} from '../../../actions/appointment';
import moment from 'moment';
class Appointment extends Component {
  state = {
    todayApp: false,
    allApp: true,
    appointments: '',
  };

  async componentDidMount() {
    var currentdate = moment(new Date()).format('MM-DD-YYYY');
    await this.props.getAllAppointments();
    await this.props.getCurentDayAppointment(currentdate);
    const { appointments } = this.props;
    if (appointments) {
      this.setState({
        appointments: appointments,
      });
    }
  }
  onChecked = (id) => {
    confirmAlert({
      title: 'Checked In',
      message: 'Customers have come to the checkin shop?',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            this.props.checked(id);
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  onCancel = (id) => {
    confirmAlert({
      title: 'Cancellation of Dressing Appointments',
      message: 'Are you sure you want to cancel this fitting out appointment?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {
            this.props.cancel(id);
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  handleChange_todaysapp = (e) => {
    this.setState({
      todayApp: true,
      allApp: false,
    });
  };

  handleChange_allApp = (e) => {
    this.setState({
      allApp: true,
      todayApp: false,
    });
  };

  getAppointmentTAble = () => {
    const { appointments, todayAppointment } = this.props;
    const { todayApp } = this.state;
    let m_app = [];
    var currentDate = new Date();

    if (todayApp == true) {
      if (todayAppointment) {
        todayAppointment.forEach((app) => {
          var isToday = moment(moment(app.date).format('MM/DD/YYYY')).isSame(
            moment(currentDate).format('MM/DD/YYYY')
          );
          console.log(app);
          var string_Categories = app.categories.join(' , ');
          m_app.push({
            contactnumber: app.customer.contactnumber,
            name: app.customer.name,
            date: moment(app.date).format('DD/MM/YYYY'),
            orderID: app.orderID && app.orderID,
            categories: app.categories && string_Categories,
            note: app.note,
            actions:
              app.status === 'Cancelled' ? (
                <>
                  <span className='badge badge-warning'>Canceled appointment</span>
                </>
              ) : app.status === 'CheckedIn' ? (
                <>
                  <span className='badge badge-success'>
                   Checked In at{app.checkedInAt}
                  </span>
                </>
              ) : (
                <>
                  {isToday === true ? (
                    <Link
                      to='/appointments'
                      onClick={() => this.onChecked(app._id)}
                      className='warning p-0 mb-1'
                    >
                      <i
                        className='
                  icon-user-following font-medium-3 mr-2 '
                        title='Checkin'
                      ></i>
                    </Link>
                  ) : (
                    ''
                  )}

                  <Link
                    to={{ pathname: `/appointments/edit/${app._id}` }}
                    className='success p-0'
                  >
                    <i
                      className='ft-edit font-medium-3 mr-2 '
                      title='Thay đổi thông tin'
                    ></i>
                  </Link>
               
                  <Link
                    to='/appointments'
                    onClick={() => this.onCancel(app._id)}
                    className='danger p-0 mb-1'
                  >
                    <i
                      className='
                    ft-x font-medium-3 mr-2'
                      title='Hủy hẹn'
                    ></i>
                  </Link>
                </>
              ),
          });
        });
      }
    } else {
      appointments &&
        appointments.forEach((app) => {
          var isToday = moment(moment(app.date).format('MM/DD/YYYY')).isSame(
            moment(currentDate).format('MM/DD/YYYY')
          );
          var string_Categories = app.categories.join(' , ');

          m_app.push({
            contactnumber: app.customer.contactnumber,
            name: app.customer.name,
            date: moment(app.date).format('DD/MM/YYYY'),
            categories: app.categories && string_Categories,
            orderID: app.orderID && app.orderID,
            note: app.note,
            actions:
              app.status === 'Cancelled' ? (
                <>
                  <span className='badge badge-warning'>Canceled appointment</span>
                </>
              ) : app.status === 'CheckedIn' ? (
                <>
                  <span className='badge badge-success'>
                   Checked In at {app.checkedInAt}
                  </span>
                </>
              ) : (
                <>
                  {isToday === true ? (
                    <Link
                      to='/appointments'
                      onClick={() => this.onChecked(app._id)}
                      className='warning p-0 mb-1'
                    >
                      <i
                        className='
              icon-user-following font-medium-3 mr-2 '
                        title='Checkin'
                      ></i>
                    </Link>
                  ) : (
                    ''
                  )}

                  <Link
                    to={{ pathname: `/appointments/edit/${app._id}` }}
                    className='success p-0'
                  >
                    <i
                      className='ft-edit font-medium-3 mr-2 '
                      title='Sửa đổi thông tin'
                    ></i>
                  </Link>

                  <Link
                    to='/appointments'
                    onClick={() => this.onCancel(app._id)}
                    className='danger p-0 mb-1'
                  >
                    <i
                      className='
                ft-x font-medium-3 mr-2'
                      title='Hủy hẹn'
                    ></i>
                  </Link>
                </>
              ),
          });
        });
    }
    const columns = [
      {
        dataField: 'date',
        text: 'Ngày Hẹn',
        sort: true,
      },
      {
        dataField: 'name',
        text: 'Guest name',
        sort: true,
      },
      {
        dataField: 'categories',
        text: 'Species',
        sort: true,
      },
      {
        dataField: 'orderID',
        text: 'Order ID',
        sort: true,
      },
      {
        dataField: 'note',
        text: 'Note',
        sort: true,
      },
      {
        dataField: 'actions',
        text: 'Actions',
        sort: true,
      },
    ];
    const defaultSorted = [
      {
        dataField: 'contactnumber',
        order: 'asc',
      },
    ];
    const MySearch = (props) => {
      let input;
      const handleClick = () => {
        props.onSearch(input.value);
      };
      return (
        <>
          <div className='row'>
            <div className='col-md-4'>
              <input
                className='form-control'
                style={{ backgroundColor: 'white' }}
                ref={(n) => (input = n)}
                type='text'
              />
            </div>
            <div className='col-md-4'>
              <button className='btn btn-success' onClick={handleClick}>
                <i className='fa fa-search'></i> Search{' '}
              </button>
            </div>
            <div className='col-md-4'>
              <Link
                to={{
                  pathname: '/appointments/add',
                }}
                className='btn btn-primary pull-right'
              >
                <i className='fa fa-plus'></i>Make an appointment 
              </Link>
            </div>{' '}
          </div>
        </>
      );
    };

    return (
      <ToolkitProvider
        keyField='id'
        data={m_app && m_app.length > 0 ? m_app : []}
        columns={columns}
        defaultSorted={defaultSorted}
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

    return (
      <React.Fragment>
        <Loader />
        <div className='wrapper menu-collapsed'>
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>
          <div className='main-panel'>
            <div className='main-content'>
              <div className='content-wrapper'>
                <section id='simple-table'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'>ALL APPOINTMENTS</h4>
                        </div>
                        <div className='card-content'>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-md-8'>
                                <label
                                  className='radio-inline'
                                  htmlFor='all'
                                  style={{ marginLeft: '10px' }}
                                >
                                  <input
                                    type='radio'
                                    id='all'
                                    name='activeUser'
                                    checked={this.state.allApp == true}
                                    onChange={(e) =>
                                      this.handleChange_allApp(e)
                                    }
                                  />{' '}
                                  All Appointments
                                </label>
                                <label
                                  className='radio-inline'
                                  htmlFor='today'
                                  style={{ marginLeft: '10px' }}
                                >
                                  <input
                                    type='radio'
                                    name='activeUser'
                                    id='today'
                                    checked={this.state.todayApp == true}
                                    onChange={(e) =>
                                      this.handleChange_todaysapp(e)
                                    }
                                  />{' '}
                                  Today's Appointments
                                  </label>
                              </div>

                              <div className='col-md-4'></div>
                            </div>
                            <Alert />
                            <OCAlertsProvider />

                            {this.getAppointmentTAble()}
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
    );
  }
}

Appointment.propTypes = {
  auth: PropTypes.object,
  getAllAppointments: PropTypes.func.isRequired,
  getCurentDayAppointment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appointments: state.appointment.appointments,
  appointment: state.appointment.appointment,
  todayAppointment: state.appointment.todayAppointment,
});
export default connect(mapStateToProps, {
  getAllAppointments,
  cancel,
  checked,
  getCurentDayAppointment,
})(Appointment);
