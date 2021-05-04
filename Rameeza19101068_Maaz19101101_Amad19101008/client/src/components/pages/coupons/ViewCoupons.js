import React, { Component } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllCoupons, deleteCoupon } from '../../../actions/coupons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Alert from '../../layout/Alert';
import Loader from '../../layout/Loader';
import MPagination from '../../../components/pagination/MPagination';

import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts';

class ViewCoupons extends Component {
  state = {
    couponsStatus: 'active',
    page: 1,
  };

  async componentDidMount() {
    const { page, couponsStatus } = this.state;
    await this.props.getAllCoupons(this.state.page, couponsStatus);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, couponsStatus } = this.state;
    if (prevState.page !== page) {
      await this.props.getAllCoupons(this.state.page, couponsStatus);
    }
    if (prevState.couponsStatus !== couponsStatus) {
      await this.props.getAllCoupons(this.state.page, couponsStatus);
    }
  }

  getTAble = () => {
    const { coupons } = this.props;
    if (coupons) {
      if (coupons.length === 0) {
        return (
          <tr>
            <td colSpan={9} className='text-center'>
              Không tìm thấy mã giảm giá nào. Kiết quá đi!
            </td>
          </tr>
        );
      }
      return coupons.map((coupon, index) => (
        <tr key={coupon._id}>
          <td className='text-center'>{index + 1}</td>

          <td className='text-center'>
            {coupon.discount_amount}
            {coupon.coupon_type == 'percentage' ? ' %' : ' VND'}
          </td>
          <td className='text-center'>{coupon.code}</td>
          <td className='text-center'>{coupon.usage}</td>
          <td className='text-center'>
            {coupon.coupon_status === 'active' && (
              <span className='badge badge-success'>ĐANG CHẠY</span>
            )}
            {coupon.coupon_status === 'inactive' && (
              <span className='badge badge-warning'>Hết Hạn</span>
            )}
          </td>
          <td className='text-center'>
            <Link
              to={{ pathname: `/coupons/view/${coupon._id}` }}
              className='success p-0'
            >
              <i
                className='fa fa-eye font-medium-3 mr-2 '
                title='Xem Thông Tin'
              ></i>
            </Link>

            <Link
              to='/coupons'
              onClick={() => this.onDelete(coupon._id)}
              className='danger p-0'
            >
              <i className='ft-x font-medium-3 mr-2' title='Xoá Mã'></i>
            </Link>
          </td>
        </tr>
      ));
    }
  };

  onDelete = (id) => {
    confirmAlert({
      title: 'Xoá Mã Giảm Giá?',
      message: 'Bạn có chắc chắn muốn xoá mã giảm giá này không?',
      buttons: [
        {
          label: 'Có, xoá mã!',
          onClick: () => {
            this.props.deleteCoupon(id);
          },
        },
        {
          label: 'Hủy',
          onClick: () => {},
        },
      ],
    });
  };
  onChangePage = (page) => {
    this.setState({ page: page });
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to='/' />;
    }
    const { user } = auth;

    if (user && user.systemRole === 'Employee') {
      return <Redirect to='/Error' />;
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
                          <h4 className='card-title'>Mã Giảm Giá</h4>
                        </div>
                        <div className='card-content'>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-md-8'>
                                <label
                                  className='radio-inline'
                                  style={{ marginLeft: '10px' }}
                                >
                                  <input
                                    type='radio'
                                    name='activeUser'
                                    onChange={(e) =>
                                      this.setState({
                                        couponsStatus: 'active',
                                        page: 1,
                                      })
                                    }
                                    checked={
                                      this.state.couponsStatus === 'active'
                                    }
                                  />{' '}
                                  Đang Chạy
                                </label>
                                <label
                                  className='radio-inline'
                                  style={{ marginLeft: '10px' }}
                                >
                                  <input
                                    type='radio'
                                    name='InactiveUser'
                                    onChange={(e) =>
                                      this.setState({
                                        couponsStatus: 'inactive',
                                        page: 1,
                                      })
                                    }
                                    checked={
                                      this.state.couponsStatus === 'inactive'
                                    }
                                  />{' '}
                                  Hết Hạn
                                </label>
                              </div>

                              <div className='col-md-4'>
                                <Link
                                  to={{
                                    pathname: '/coupons/add',
                                  }}
                                  className='btn btn-primary pull-right'
                                >
                                  <i className='fa fa-plus'></i> Thêm Mã Mới
                                </Link>
                              </div>
                            </div>
                            <Alert />
                            <OCAlertsProvider />
                            {this.props.coupons_total > 10 && (
                              <MPagination
                                onChangePage={this.onChangePage}
                                currentPage={this.state.page}
                                products_total={this.props.coupons_total}
                              />
                            )}
                            <table className='table'>
                              <thead>
                                <tr>
                                  <th className='text-center'>STT</th>
                                  <th className='text-center'>Giảm Giá</th>
                                  <th className='text-center'>Mã</th>
                                  <th className='text-center'>Tổng Lược Xài</th>
                                  <th className='text-center'>Trạng Thái</th>
                                  <th className='text-center'>Hành Động</th>
                                </tr>
                              </thead>

                              <tbody>{this.getTAble()}</tbody>
                            </table>
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

ViewCoupons.propTypes = {
  getAllCoupons: PropTypes.func.isRequired,
  deleteCoupon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coupons: state.coupons.coupons,
  coupons_total: state.coupons.coupons_total,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllCoupons,
  deleteCoupon,
})(ViewCoupons);
