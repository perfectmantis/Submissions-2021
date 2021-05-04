import React, { Component } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCouponById,
  AddCouponNote,
  changeCouponStatus,
} from '../../../actions/coupons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Alert from '../../layout/Alert';
import Loader from '../../layout/Loader';
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts';
import axios from 'axios';
import { setAlert } from '../../../actions/alert';
class CouponDetail extends Component {
  state = {
    note_text: '',
    coupon_notes: [],
    new_tags: [],
    tag: '',
  };
  async componentDidMount() {
    if (this.props.match.params.couponId) {
      const couponId = this.props.match.params.couponId;
      await this.props.getCouponById(couponId);
      const { coupon } = this.props;
      this.setState({
        coupon_notes: coupon.coupon_notes ? coupon.coupon_notes : [],
        new_tags: coupon.tags ? coupon.tags.split(',') : [],
      });
    }
  }

  onChangeStats = async (status) => {
    const couponId = this.props.match.params.couponId;
    await this.props.changeCouponStatus(status, couponId);
  };

  onSubmitNote = async (e) => {
    e.preventDefault();
    const { coupon } = this.props;
    const { note_text, coupon_notes } = this.state;
    if (note_text == '' || note_text == undefined) {
      OCAlert.alertError('Thêm Ghi Chú', { timeOut: 3000 });
      return;
    }
    const data = [...coupon_notes, { title: note_text }];
    this.setState({ note_text: '' });
    try {
      const res = await axios.post(`/api/coupons/add_note/${coupon._id}`, {
        notes: JSON.stringify(data),
      });
      this.setState({ coupon_notes: res.data.result });
      OCAlert.alertSuccess('Thêm Ghi Chú Thành Công', { timeOut: 3000 });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        OCAlert.alertError('Lỗi Hệ Thống :(', { timeOut: 3000 });
        return;
      }
    }
  };

  onUpdateTags = async () => {
    const { coupon } = this.props;
    const { new_tags } = this.state;
    if (new_tags.length == 0) {
      OCAlert.alertError('Cần thêm tags cho mã giảm giá này để phân loại', {
        timeOut: 6000,
      });
      return;
    }
    const coma_tags = new_tags.length ? new_tags.join() : '';

    try {
      const res = await axios.post(`/api/coupons/update_tags/${coupon._id}`, {
        new_tags: coma_tags,
      });
      OCAlert.alertSuccess('Tags của mã giảm giá cập nhật thành công!', {
        timeOut: 5000,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        OCAlert.alertError('Lỗi Hệ Thống :(', { timeOut: 3000 });
        return;
      }
    }
  };

  calculation = (coupon) => {
    return coupon.max_life - coupon.usage;
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
    const { coupon } = this.props;
    const { coupon_notes } = this.state;
    console.log('coupon', coupon && coupon.used_orders);
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
                          <h4 className='card-title'> Thông Tin Giảm Giá</h4>
                        </div>
                        <div className='card-content'>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-md-6'>
                                <ul>
                                  <li>Mã : {coupon ? coupon.code : ''} </li>
                                  <li>Loại : Giảm Giá </li>
                                  <li>
                                    {coupon && coupon.coupon_type == 'amount'
                                      ? 'VNĐ'
                                      : 'Phần Trăm'}{' '}
                                    : {coupon ? coupon.discount_amount : ''}
                                    {coupon && coupon.coupon_type == 'amount'
                                      ? ' VNĐ'
                                      : ' %'}
                                  </li>

                                  <li>
                                    Giảm Tối Đa :{' '}
                                    {coupon && coupon.max_payout
                                      ? `${coupon.max_payout} VNĐ`
                                      : 'None'}
                                    {coupon &&
                                    coupon.max_payout &&
                                    coupon.coupon_type == 'amount'
                                      ? 'VNĐ'
                                      : ''}
                                  </li>

                                  <li>
                                    Giá Trị Tối Thiểu Đơn Hàng:{' '}
                                    {coupon && coupon.min_requirement
                                      ? `${coupon.min_requirement} VNĐ`
                                      : ''}{' '}
                                  </li>
                                  <li>
                                    Sản Phẩm Giảm Giá:{' '}
                                    {coupon && coupon.eligibility
                                      ? `${coupon.eligibility}`
                                      : ''}{' '}
                                    {coupon &&
                                      coupon.product_ids.map((a) => (
                                        <span
                                          style={{
                                            marginRight: '10px',
                                            backgroundColor: 'gray',
                                            color: '#fff',
                                            padding: '3px',
                                          }}
                                        >
                                          {a}
                                        </span>
                                      ))}
                                  </li>

                                  <li>
                                    Tối Đa Mỗi Khách:{' '}
                                    {coupon && coupon.number_of_use_per_customer
                                      ? `${coupon.number_of_use_per_customer} lần`
                                      : ''}{' '}
                                  </li>

                                  <li>
                                    Tối Đa Lần Sử Dụng :{' '}
                                    {coupon && coupon.max_life
                                      ? `${coupon.max_life} lần`
                                      : ''}{' '}
                                  </li>

                                  <li>
                                    Ngày Bắt Đầu:{' '}
                                    {coupon && coupon.start_date
                                      ? `${coupon.start_date.split('T')[0]}`
                                      : ''}{' '}
                                  </li>

                                  <li>
                                    Ngày Hết Hạn :{' '}
                                    {coupon && coupon.end_date
                                      ? `${coupon.end_date.split('T')[0]}`
                                      : ''}{' '}
                                  </li>
                                </ul>
                                <div className='col-md-12'>
                                  {coupon &&
                                  coupon.coupon_status == 'active' ? (
                                    <button
                                      onClick={() =>
                                        this.onChangeStats('inactive')
                                      }
                                      className='btn btn-danger'
                                    >
                                      VÔ HIỆU HÓA MÃ GIẢM GIÁ
                                    </button>
                                  ) : coupon &&
                                    coupon.coupon_status == 'inactive' ? (
                                    <button
                                      onClick={() =>
                                        this.onChangeStats('active')
                                      }
                                      className='btn btn-primary'
                                    >
                                      Bật Mã Giảm Giá
                                    </button>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <h5>Tổng Quan Sử Dụng</h5>
                                Mã này được sử dụng tối đa :{' '}
                                {coupon && coupon.max_life
                                  ? `${coupon.max_life} lần`
                                  : ''}{' '}
                                <div className='row mt-2'>
                                  <div className='col-md-12'>
                                    Tổng Lược Sử Dụng:
                                    <p>
                                      {' '}
                                      {coupon && coupon.usage
                                        ? `${coupon.usage} lần`
                                        : 0}
                                    </p>
                                  </div>
                                  <div className='col-md-12'>
                                    Số Lần Còn Lại:
                                    <p>
                                      {' '}
                                      {`${
                                        coupon && this.calculation(coupon)
                                      } lần`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-12'>
                      <Alert />
                      <OCAlertsProvider />
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'> Ghi Chú</h4>
                        </div>
                        <div className='card-content'>
                          <div className='card-body'>
                            <form onSubmit={this.onSubmitNote}>
                              <div className='row mb-3'>
                                <div className='col-md-8'>
                                  <div class='form-group'>
                                    <label for='exampleFormControlTextarea1'>
                                      Ghi Chú
                                    </label>

                                    <input
                                      type='text'
                                      onChange={(e) =>
                                        this.setState({
                                          note_text: e.target.value,
                                        })
                                      }
                                      value={this.state.note_text}
                                      className='form-control'
                                      rows='3'
                                    />
                                  </div>
                                </div>{' '}
                                <div className='col-md-2 mt-3'>
                                  {' '}
                                  <button
                                    type={'submit'}
                                    className='btn btn-primary pull-right'
                                  >
                                    {' '}
                                    <i className='fa fa-plus'></i> Thêm Ghi Chú{' '}
                                  </button>
                                </div>
                              </div>
                            </form>
                            <div className='row'>
                              <div className='col-md-12'>
                                <ul>
                                  {coupon_notes &&
                                    coupon_notes.map((item, index) => {
                                      return (
                                        <li key={item._id}>{item.title}</li>
                                      );
                                    })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-12'>
                      <Alert />
                      <OCAlertsProvider />
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'>
                            Cập nhật Tags cho mã này
                          </h4>
                        </div>
                        <div className='card-content'>
                          <div className='card-body'>
                            <div className='row mb-3'>
                              <div className='col-md-9'>
                                <input
                                  type='text'
                                  id='Coupon tags'
                                  className='form-control border-primary'
                                  placeholder='Bấm Tags và nhấn enter'
                                  onChange={(e) =>
                                    this.setState({
                                      tag: e.target.value,
                                    })
                                  }
                                  value={this.state.tag}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      const { tag } = this.state;
                                      if (tag == '') {
                                        OCAlert.alertError(
                                          'Bấm Tags và Nhấn Enter',
                                          {
                                            timeOut: 5000,
                                          }
                                        );
                                        return;
                                      } else {
                                        this.setState({
                                          new_tags: [
                                            ...this.state.new_tags,
                                            tag,
                                          ],
                                          tag: '',
                                        });
                                      }
                                    }
                                  }}
                                />
                                <p>
                                  {this.state.new_tags &&
                                    this.state.new_tags.map((entry1, index) => {
                                      return (
                                        <span
                                          className='product_tag'
                                          onClick={() => {
                                            let result = this.state.new_tags.filter(
                                              (k) => k !== entry1
                                            );
                                            this.setState({
                                              new_tags: result,
                                            });
                                          }}
                                          key={index}
                                        >
                                          {entry1}
                                        </span>
                                      );
                                    })}
                                </p>
                              </div>
                              <div className='col-md-2 mt-3'>
                                {' '}
                                <button
                                  onClick={this.onUpdateTags}
                                  className='btn btn-warning pull-right'
                                >
                                  {' '}
                                  <i className='fa fa-plus'></i> Cập Nhật Tags{' '}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'>
                            {' '}
                            Đơn Hàng Sử Dụng Mã Giảm Giá Này
                          </h4>
                        </div>
                        <div className='card-content'>
                          <div className='card-body'>
                            <table class='table'>
                              <thead>
                                <tr>
                                  <th scope='col'>STT</th>
                                  <th scope='col'>Đơn Hàng #</th>
                                  <th scope='col'>Khách Hàng</th>
                                  <th scope='col'>Trạng Thái</th>
                                </tr>
                              </thead>
                              <tbody>
                                {coupon &&
                                  coupon.used_orders.map((i, index) => (
                                    <tr>
                                      <th key={index} scope='row'>
                                        {index + 1}
                                      </th>
                                      <td>{i.orderNumber}</td>
                                      <td>
                                        {i.customer ? i.customer.name : ''}
                                      </td>
                                      <td>{i.status}</td>
                                    </tr>
                                  ))}
                              </tbody>
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
                Quyền sở hữu của &nbsp;{' '}
                <a
                  href='https://www.sutygon.com'
                  rel='noopener noreferrer'
                  id='pixinventLink'
                  target='_blank'
                  className='text-bold-800 primary darken-2'
                >
                  SUTYGON-BOT{' '}
                </a>
                , All rights reserved.{' '}
              </span>
            </p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

CouponDetail.propTypes = {
  getCouponById: PropTypes.func.isRequired,
  AddCouponNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coupon: state.coupons.coupon,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCouponById,
  AddCouponNote,
  changeCouponStatus,
})(CouponDetail);
