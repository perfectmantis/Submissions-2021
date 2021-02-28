import React, { Component } from 'react'
import Sidebar from '../../layout/Sidebar'
import Header from '../../layout/Header'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getReport } from '../../../actions/report'
import { getAllUsers } from '../../../actions/user'
import { getAllCustomers } from '../../../actions/customer'
import Alert from '../../layout/Alert'
import Loader from '../../layout/Loader'

class Report extends Component {
  state = {
    id: '',
    customer: '',
    user: '',
    start: '',
    end: '',
    reportType: '',
    saving: false,
  }

  async componentDidMount() {
    this.props.getAllUsers()
    this.props.getAllCustomers()
  }
  handleChange = (e, id = '') => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.setState({ saving: true })

    const state = { ...this.state }
    const { user } = this.props.auth

    const report = {
      user: user._id,
      customer: state.customer,
      start: state.start,
      end: state.end,
      reportType: state.reportType,
    }
    await this.props.getReport(report)
    this.setState({ saving: false })
  }

  render() {
    const { auth } = this.props
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to='/' />
    }

    if (this.props.saved) {
      return <Redirect to='/dashboard' />
    }
    const { user, customer } = this.state
    const { customers } = this.props.customers
    const { users } = this.props
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
                          <i className='icon-basket-loaded'></i> Report
                        </h4>
                      </div>
                      <div className='card-body'>
                        <form onSubmit={(e) => this.onSubmit(e)}>
                          <Alert />
                          <div className='row'>
                            <div className='form-group col-6 mb-2'>
                              <label htmlFor='issueinput5'>
                                Select Customer
                              </label>
                              <select
                                name='customer'
                                className='form-control'
                                onChange={(e) => this.handleChange(e)}
                              >
                                <option value='DEFAULT'> -- select -- </option>
                                {customers &&
                                  customers.map((record) => (
                                    <option
                                      key={record._id}
                                      value={record._id}
                                      selected={record._id === customer}
                                    >
                                      {record.name + ' - ' + record.email}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className='form-group col-6 mb-2'>
                              <label htmlFor='issueinput5'>Select User</label>
                              <select
                                name='user'
                                className='form-control'
                                onChange={(e) => this.handleChange(e)}
                              >
                                <option value='DEFAULT'> -- select -- </option>
                                {users &&
                                  users.map((record) => (
                                    <option
                                      key={record._id}
                                      value={record._id}
                                      selected={record._id === user}
                                    >
                                      {record.username}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>

                          <div className='row'>
                            <div className='form-group col-md-6 mb-2'>
                              <label htmlFor='issueinput3'>Start Date</label>
                              <input
                                type='date'
                                id='issueinput3'
                                className='form-control'
                                name='start'
                                data-toggle='tooltip'
                                data-trigger='hover'
                                data-placement='top'
                                data-title='Date Opened'
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.start}
                              />
                            </div>
                            <div className='form-group col-md-6 mb-2'>
                              <label htmlFor='issueinput3'>End Date</label>
                              <input
                                type='date'
                                id='issueinput3'
                                className='form-control'
                                name='end'
                                data-toggle='tooltip'
                                data-trigger='hover'
                                data-placement='top'
                                data-title='Date Opened'
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.end}
                              />
                            </div>
                          </div>

                          <div className='row'>
                            <div className='form-group col-md-6 mb-2'>
                              <label htmlFor='issueinput3'>Report Type</label>{' '}
                              <br></br>
                              <input
                                type='radio'
                                name='reportType'
                                value='order'
                                onChange={(e) => this.handleChange(e)}
                                checked={this.state.reportType === 'order'}
                              />
                              <label className='radio-inline'>Order</label>
                              <br></br>
                              <input
                                type='radio'
                                name='reportType'
                                value='appointment'
                                onChange={(e) => this.handleChange(e)}
                                checked={
                                  this.state.reportType === 'appointment'
                                }
                              />
                              <label className='radio-inline'>
                                Appointment
                              </label>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='form-columns col-md-6 mb-2'>
                              {this.state.saving ? (
                                <Link className='mb-2 mr-2 btn btn-raised btn-primary'>
                                  <div
                                    className='spinner-grow spinner-grow-sm '
                                    role='status'
                                  ></div>
                                  &nbsp; Generating
                                </Link>
                              ) : (
                                <button
                                  to={{ pathname: `/report` }}
                                  type='submit'
                                  className='mb-2 mr-2 btn btn-raised btn-primary'
                                >
                                  <i className='ft-check' /> Generate Report
                                </button>
                              )}
                            </div>
                            <div className='form-columns col-md-6 mb-2'>
                              <Link
                                to={{
                                  pathname: '/report',
                                  data: {
                                    report: this.props.report.reports,
                                    reportType: this.state.reportType,
                                    startDate: this.state.start,
                                    endDate: this.state.end,
                                  }, // your data array of objects
                                }}
                                className='mb-2 mr-2 btn btn-raised btn-primary'
                              >
                                &nbsp; Generate PDF
                              </Link>
                            </div>
                          </div>
                        </form>
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

Report.propTypes = {
  saved: PropTypes.bool,
  getAllCustomers: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  auth: PropTypes.object,
  users: PropTypes.array,
  customers: PropTypes.object,
  getReport: PropTypes.func.isRequired,
  report: PropTypes.object,
}

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
  users: state.user.users,
  customers: state.customer,
  report: state.report,
})
export default connect(mapStateToProps, {
  getAllCustomers,
  getAllUsers,
  getReport,
})(Report)
