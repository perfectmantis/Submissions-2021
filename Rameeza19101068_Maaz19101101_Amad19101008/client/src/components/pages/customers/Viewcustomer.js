import React, { Component } from 'react'
import Sidebar from '../../layout/Sidebar'
import Header from '../../layout/Header'
import {
  deleteCustomer,
  getAllCustomers,
  findCustomers,
} from '../../../actions/customer'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from '../../layout/Alert'
import Loader from '../../layout/Loader'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'

class ViewCustomer extends Component {
  state = {
    filter: '',
    search: '',
  }
  async componentDidMount() {
    await this.props.getAllCustomers()
  }

  handleChange = (e, id = '') => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async searchTable() {
    // e.preventDefault();
    const searchVal = this.state.search
    if (searchVal) {
      await this.props.findCustomers(searchVal)
    } else {
      await this.props.getAllCustomers()
    }
  }

  getTAble = () => {
    const { customers } = this.props

    if (customers) {
      var m_cust = []
      customers.forEach((customer, c_index) => {
        m_cust.push({
          contactnumber: customer.contactnumber,
          name: customer.name,
          online_acc: customer.online_account && customer.online_account.exist,
          membership:
            customer.online_account && customer.online_account.membership,
          actions: (
            <>
              <Link
                to={{ pathname: `/customer/editcustomer/${customer._id}` }}
                className='success p-0'
              >
                <i
                  className='ft-edit-3 font-medium-3 mr-2 '
                  title='Edit User'
                ></i>
              </Link>
              <Link
                to='/customer'
                onClick={() => this.onDelete(customer._id)}
                className='danger p-0'
              >
                <i className='ft-x font-medium-3 mr-2' title='Delete'></i>
              </Link>
            </>
          ),
        })
      })

      
    }
    if (customers) {
      const columns = [
        {
          dataField: 'contactnumber',
          text: 'Contact Number',
          sort: true,
        },
        {
          dataField: 'name',
          text: 'Customer Name',
          sort: true,
        },
        {
          dataField: 'online_acc',
          text: 'Online Account',
          sort: true,
        },
        {
          dataField: 'membership',
          text: 'Membership',
          sort: true,
        },
        {
          dataField: 'actions',
          text: 'Actions',
          sort: true,
        },
      ]
      const defaultSorted = [
        {
          dataField: 'contactnumber',
          order: 'asc',
        },
      ]
      const MySearch = (props) => {
        let input
        const handleClick = () => {
          props.onSearch(input.value)
        }
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
                  to='/customer/addcustomer'
                  className='btn btn-primary pull-right'
                >
                  {' '}
                  <i className='fa fa-plus'></i> New Customer
                </Link>
              </div>{' '}
            </div>
          </>
        )
      }

      return (
        <ToolkitProvider
          // bootstrap4
          keyField='id'
          data={m_cust.length === 0 ? [] : m_cust}
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
      )
    }
  }

  onDelete = (id) => {
    confirmAlert({
      title: 'Delete Customer',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.deleteCustomer(id)
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    })
  }

  render() {
    const { auth } = this.props
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to='/' />
    }
    const {user} = auth;
    if(user && user.systemRole ==="Employee"){
      if(user && !user.sections.includes("Customers")){
        return <Redirect to="/Error"/>

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
                <section id='extended'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'>ALL CUSTOMERS</h4>
                        </div>

                        <div className='card-content'>
                          <div className='card-body table-responsive'>
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
    )
  }
}

ViewCustomer.propTypes = {
  auth: PropTypes.object,
  getAllCustomers: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  findCustomers: PropTypes.func.isRequired,
  customers: PropTypes.array,
}
const mapStateToProps = (state) => ({
  customers: state.customer.customers,
  searchedCustomer: state.customer.searchedCustomer,
  auth: state.auth,
})
export default connect(mapStateToProps, {
  getAllCustomers,
  deleteCustomer,
  findCustomers,
})(ViewCustomer)
