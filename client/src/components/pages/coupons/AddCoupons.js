import React, { Component } from 'react';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import Alert from '../../layout/Alert';
import {
  addNewCoupon,
  updateCoupon,
  getCouponById,
} from '../../../actions/coupons';
import Loader from '../../layout/Loader';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts';
import moment from 'moment';
class AddCoupons extends Component {
  state = {
    couponId: '',
    // fields
    discount_amount: '',
    coupon_type: 'percentage', //percentage or amount
    max_payout: '',
    min_requirement: '',
    number_of_use_per_customer: '',
    max_life: '',
    note: '',
    code: '',
    start_date: '',
    end_date: '',
    tag: '',
    tags: [],
    eligibility: 'all',
    product_ids: [],
    product_tags: [],
    productId: '',
    productTag: '',
  };

  async componentDidMount() {
    if (this.props.match.params.couponId) {
      const couponId = this.props.match.params.couponId;
      await this.props.getCouponById(couponId);
      const { coupon } = this.props;
      if (coupon) {
        this.setState({
          couponId: coupon._id,
          discount_amount: coupon.discount_amount,
          coupon_type: coupon.coupon_type,
          max_payout: coupon.max_payout,
          number_of_use_per_customer: coupon.number_of_use_per_customer,
          max_life: coupon.max_life,
          note: coupon.note,
          code: coupon.code,
          start_date: coupon.start_date,
          end_date: coupon.end_date,
          // tags: coupon.tags,
          eligibility: coupon.eligibility,
          // product_ids: coupon.product_ids,
          product_tags: coupon.product_tags,
        });
      }
    }
  }
  makeid = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  between(x, min, max) {
    if (Number(x) >= min && Number(x) <= max) {
      return true;
    }
    return false;
  }

  onSubmit = async () => {
    if (this.state.discount_amount === '') {
      OCAlert.alertError('Giảm giá bao nhiêu?', { timeOut: 5000 });
      return;
    }

    if (this.state.coupon_type === 'percentage') {
      if (
        Number(this.state.discount_amount) < 0.5 ||
        Number(this.state.discount_amount) > 100
      ) {
        OCAlert.alertError('Phần trăm phải từ 0.5% đến 100%', {
          timeOut: 5000,
        });
        return;
      }
    }

    if (
      this.state.coupon_type == 'percentage' &&
      this.state.max_payout === ''
    ) {
      OCAlert.alertError('Giảm Giá Tối Đa bao nhiêu VNĐ?', { timeOut: 7000 });
      return;
    }
    if (this.state.max_life === '') {
      OCAlert.alertError('Tổng cộng số lần phiếu giảm giá này được sử dụng?', {
        timeOut: 7000,
      });
      return;
    }
    if (this.state.number_of_use_per_customer === '') {
      OCAlert.alertError(
        'Mỗi khách hàng được phép sử dụng phiếu giảm giá này bao nhiêu lần?',
        {
          timeOut: 7000,
        }
      );
      return;
    }

    if (
      Number(this.state.number_of_use_per_customer) >
      Number(this.state.max_life)
    ) {
      OCAlert.alertError(
        'Tổng Sử Dụng phải LỚN HƠN số lượng tối đa mỗi khách hàng',
        {
          timeOut: 7000,
        }
      );
      return;
    }

    if (this.state.number_of_use_per_customer === '') {
      OCAlert.alertError(
        'Mỗi khách hàng được phép sử dụng phiếu giảm giá này bao nhiêu lần?',
        {
          timeOut: 3000,
        }
      );
      return;
    }
    if (this.state.code === '') {
      OCAlert.alertError('Mã phiếu giảm giá là gì?', { timeOut: 4000 });
      return;
    }
    if (this.state.start_date === '') {
      OCAlert.alertError('Cần ngày ra hiệu lực', { timeOut: 4000 });
      return;
    }
    if (this.state.end_date === '') {
      OCAlert.alertError('Cần ngày hết hiệu lực', { timeOut: 4000 });
      return;
    }
    if (this.state.tags.length == 0) {
      OCAlert.alertError('Hãy chọn một số tag để phân loại coupon', {
        timeOut: 4000,
      });
      return;
    }
    const startDate = new Date(this.state.start_date).getTime();
    const endDate = new Date(this.state.end_date).getTime();

    if (startDate > endDate) {
      OCAlert.alertError(`Ngày bắt đầu phải ở trước ngày hết hạn`, {
        timeOut: 3000,
      });
      return;
    }

    if (this.state.eligibility !== 'all') {
      if (
        this.state.product_ids.length == 0 &&
        this.state.product_tags.length == 0
      ) {
        OCAlert.alertError('Cần chọn sản phẩm hợp lệ để nhận phiếu giảm giá', {
          timeOut: 6000,
        });
        return;
      }
    }

    const {
      tags,
      discount_amount,
      coupon_type,
      max_payout,
      number_of_use_per_customer,
      max_life,
      note,
      code,
      start_date,
      end_date,
      product_ids,
      product_tags,
      eligibility,
      min_requirement,
    } = this.state;
    const coma_tags = tags.length ? tags.join() : '';
    const formData = {
      discount_amount,
      coupon_type,
      max_payout,
      number_of_use_per_customer,
      max_life,
      note,
      code,
      start_date,
      end_date,
      tags: coma_tags,
      eligibility,
      product_ids: product_ids,
      product_tags: product_tags,
    };

    if (min_requirement) {
      formData['min_requirement'] = min_requirement;
    }

    if (this.state.couponId === '') {
      await this.props.addNewCoupon(formData);

      this.setState({
        discount_amount: '',
        max_payout: '',
        number_of_use_per_customer: '',
        max_life: '',
        note: '',
        code: '',
        start_date: '',
        end_date: '',
        tags: [],
        min_requirement: '',
        // eligibility: "all",
        product_ids: [],
        product_tags: [],
      });
    } else {
      await this.props.updateCoupon(formData, this.state.couponId);
    }
    return;
  };
  handleChange = (e, type) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { coupon_type } = this.state;
    return (
      <React.Fragment>
        <Loader />
        <div className='wrapper menu-collapsed'>
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>

          <div className='main-panel'>
            <div className='main-content'>
              <div className='content-wrapper'>
                <div className='form-body'>
                  <div className='card'>
                    <div className='card-header'>
                      <h4 className='form-section'>
                        <i className='fa fa-gift'></i> Thêm Mã Mới
                      </h4>
                    </div>

                    <div className='card-body'>
                      <div
                        className='form form-horizontal form-bordered' //
                      >
                        <Alert />
                        <OCAlertsProvider />
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group row'>
                              <div className='col-md-3'>
                                <label className='radio-inline'>
                                  <input
                                    type='radio'
                                    name='coupon_type'
                                    value='phần trăm %'
                                    onChange={(e) =>
                                      this.setState({
                                        coupon_type: 'percentage',
                                      })
                                    }
                                    checked={
                                      this.state.coupon_type === 'percentage'
                                    }
                                    value='male'
                                    required
                                  />{' '}
                                  Phần trăm %
                                </label>
                              </div>

                              <div className='col-md-3'>
                                <label className='radio-inline'>
                                  <input
                                    type='radio'
                                    name='coupon_type'
                                    value='VNĐ'
                                    onChange={(e) =>
                                      this.setState({
                                        coupon_type: 'amount',
                                      })
                                    }
                                    required
                                    checked={
                                      this.state.coupon_type === 'amount'
                                    }
                                  />{' '}
                                  Tiền VNĐ
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='discount_amount'
                              >
                                {this.state.coupon_type == 'percentage'
                                  ? 'Phần trăm %'
                                  : 'VNĐ'}{' '}
                                Giảm*
                              </label>
                              <div className={`col-md-8`}>
                                <div class='input-group'>
                                  <input
                                    type='number'
                                    min={0}
                                    id='discount_amount'
                                    className='form-control border-primary'
                                    placeholder={`${
                                      this.state.coupon_type == 'percentage'
                                        ? 'Phần Trăm %'
                                        : 'Tiền VNĐ'
                                    } `}
                                    // required
                                    // data-validation-required-message="This field is required"
                                    name='discount_amount'
                                    onChange={(e) =>
                                      this.handleChange(e, 'discount_amount')
                                    }
                                    // onBlur={(e) => this.validateUserName(e)}
                                    value={this.state.discount_amount}
                                  />
                                  <span class='input-group-addon p-1 px-2'>
                                    {coupon_type == 'percentage' ? '%' : 'VNĐ'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {coupon_type == 'percentage' && (
                            <div className='col-md-6'>
                              <div className='form-group row'>
                                <label
                                  className='col-md-4 label-control'
                                  htmlFor='max_payout'
                                >
                                  Giảm Tối Đa
                                </label>
                                <div className='col-md-8'>
                                  <div class='input-group'>
                                    <input
                                      type='number'
                                      min={0}
                                      id='max_payout'
                                      className='form-control border-primary'
                                      placeholder='Giảm Tối Đa (VNĐ) '
                                      name='max_payout'
                                      // required
                                      onChange={(e) =>
                                        this.handleChange(e, 'max_payout')
                                      }
                                      value={this.state.max_payout}
                                    />
                                    <span class='input-group-addon p-1 px-2'>
                                      VNĐ
                                    </span>{' '}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='min_requirement'
                              >
                                Giá Trị Tối Thiểu (không bắt buộc)
                              </label>
                              <div className='col-md-8'>
                                <div class='input-group'>
                                  <input
                                    type='number'
                                    min={0}
                                    id='min_requirement'
                                    className='form-control border-primary'
                                    placeholder='Giá trị tối thiểu của đơn hàng (VNĐ)'
                                    name='min_requirement'
                                    // required
                                    onChange={(e) =>
                                      this.handleChange(e, 'min_requirement')
                                    }
                                    value={this.state.min_requirement}
                                  />
                                  <span class='input-group-addon p-1 px-2'>
                                    VNĐ
                                  </span>{' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='max_life'
                              >
                                Lượng Sử Dụng Tối Đa *
                              </label>
                              <div className='col-md-8'>
                                <div class='input-group'>
                                  <input
                                    type='number'
                                    min={0}
                                    id='max_life'
                                    className='form-control border-primary'
                                    placeholder='Số lần sử dụng tối đa của mã này'
                                    name='max_life'
                                    // required
                                    onChange={(e) =>
                                      this.handleChange(e, 'max_life')
                                    }
                                    // onBlur={(e) => this.validateEmail(e)}
                                    value={this.state.max_life}
                                  />
                                  <span class='input-group-addon p-1 px-2'>
                                    Lần
                                  </span>{' '}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='number_of_use_per_customer'
                              >
                                Tối Đa Mỗi Khách*
                              </label>
                              <div className='col-md-8'>
                                <div class='input-group'>
                                  <input
                                    type='number'
                                    min={0}
                                    id='number_of_use_per_customer'
                                    className='form-control border-primary'
                                    placeholder='Số lần khách hàng được xài mã này'
                                    name='number_of_use_per_customer'
                                    // required
                                    onChange={(e) =>
                                      this.handleChange(
                                        e,
                                        'number_of_use_per_customer'
                                      )
                                    }
                                    // onBlur={(e) => this.validateEmail(e)}
                                    value={
                                      this.state.number_of_use_per_customer
                                    }
                                  />
                                  <span class='input-group-addon p-1 px-2'>
                                    Lần
                                  </span>{' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='start_date'
                              >
                                Ngày Bắt Đầu*
                              </label>
                              <div className='col-md-8'>
                                <input
                                  type='date'
                                  min={moment().format('YYYY-MM-DD')}
                                  id='start_date'
                                  className='form-control border-primary'
                                  placeholder='Number of Use*'
                                  name='start_date'
                                  // required
                                  onChange={(e) =>
                                    this.handleChange(e, 'start_date')
                                  }
                                  // onBlur={(e) => this.validateEmail(e)}
                                  value={this.state.start_date}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='end_date'
                              >
                                Ngày Hết Hạn*
                              </label>
                              <div className='col-md-8'>
                                <input
                                  min={
                                    new Date(
                                      new Date().setDate(
                                        new Date().getDate() + 1
                                      )
                                    )
                                      .toISOString()
                                      .split('T')[0]
                                  }
                                  type='date'
                                  id='end_date'
                                  className='form-control border-primary'
                                  placeholder='Number of Use*'
                                  name='end_date'
                                  // required
                                  onChange={(e) =>
                                    this.handleChange(e, 'end_date')
                                  }
                                  // onBlur={(e) => this.validateEmail(e)}
                                  value={this.state.end_date}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group row'>
                              <label
                                className='col-md-2 label-control'
                                htmlFor='code'
                              >
                                Mã Giảm Giá
                              </label>
                              <div className='col-md-4'>
                                <input
                                  type='text'
                                  id='code'
                                  className='form-control border-primary'
                                  placeholder='Mã Giảm Giá'
                                  name='code'
                                  // required
                                  onChange={(e) =>
                                    this.setState({
                                      code: e.target.value,
                                    })
                                  }
                                  value={this.state.code}
                                />
                              </div>
                              <div className='col-md-3'>
                                <button
                                  className={'btn btn-warning'}
                                  type={'button'}
                                  onClick={() => {
                                    this.setState({
                                      code: this.makeid(8),
                                    });
                                  }}
                                >
                                  Hoặc TẠO MÃ NGẪU NHIÊN
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group row'>
                              <label
                                className='col-md-4 label-control'
                                htmlFor='note'
                              >
                                Ghi Chú
                              </label>
                              <div className='col-md-8 '>
                                <textarea
                                  onChange={(e) =>
                                    this.setState({ note: e.target.value })
                                  }
                                  cols='40'
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group row'>
                              <label
                                className='col-md-2 label-control'
                                htmlFor='Coupon tags'
                              >
                                Tags*
                              </label>
                              <div className='col-md-9'>
                                <input
                                  type='text'
                                  id='Coupon tags'
                                  className='form-control border-primary'
                                  placeholder='Coupon tags'
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
                                          'Viết tags và bấm enter',
                                          {
                                            timeOut: 3000,
                                          }
                                        );
                                        return;
                                      } else {
                                        this.setState({
                                          tags: [...this.state.tags, tag],
                                          tag: '',
                                        });
                                      }
                                    }
                                  }}
                                />
                                <p>
                                  {this.state.tags &&
                                    this.state.tags.map((entry1, index) => {
                                      return (
                                        <span
                                          className='product_tag'
                                          onClick={() => {
                                            let result = this.state.tags.filter(
                                              (k) => k !== entry1
                                            );
                                            this.setState({
                                              tags: result,
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
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <p>Sản phẩm nào sẽ được nhận mã giảm giá?</p>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group row'>
                              <div className='col-md-3'>
                                <label className='radio-inline'>
                                  <input
                                    type='radio'
                                    name='eligibility'
                                    value='all'
                                    onChange={(e) =>
                                      this.setState({
                                        eligibility: 'all',
                                      })
                                    }
                                    checked={this.state.eligibility === 'all'}
                                    value='male'
                                    required
                                  />{' '}
                                  Tất cả sản phẩm
                                </label>
                              </div>
                              <div className='col-md-3'>
                                <label className='radio-inline'>
                                  <input
                                    type='radio'
                                    name='eligibility'
                                    value='only'
                                    onChange={(e) =>
                                      this.setState({
                                        eligibility: 'only',
                                      })
                                    }
                                    required
                                    checked={this.state.eligibility === 'only'}
                                  />{' '}
                                  Chỉ Duy Nhất
                                </label>
                              </div>

                              <div className='col-md-3'>
                                <label className='radio-inline'>
                                  <input
                                    type='radio'
                                    name='eligibility'
                                    value='exclude'
                                    onChange={(e) =>
                                      this.setState({
                                        eligibility: 'exclude',
                                      })
                                    }
                                    required
                                    checked={
                                      this.state.eligibility === 'exclude'
                                    }
                                  />{' '}
                                  Ngoại Trừ
                                </label>
                              </div>

                              <div className='col-md-3'>
                                <label className='radio-inline'>
                                  <input
                                    type='radio'
                                    name='eligibility'
                                    value='each'
                                    onChange={(e) =>
                                      this.setState({
                                        eligibility: 'each',
                                      })
                                    }
                                    required
                                    checked={this.state.eligibility === 'each'}
                                  />{' '}
                                  Từng Sản Phẩm
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.eligibility !== 'all' && (
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='form-group row'>
                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    id='productId'
                                    className='form-control border-primary'
                                    placeholder='Điền 6 chữ số ID và bấm enter'
                                    name='productId'
                                    minLength={6}
                                    maxLength={6}
                                    onChange={(e) => {
                                      this.setState({
                                        productId: e.target.value,
                                      });
                                    }}
                                    value={this.state.productId}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        const { productId } = this.state;
                                        if (
                                          productId &&
                                          productId.length == 6
                                        ) {
                                          this.setState({
                                            product_ids: [
                                              ...this.state.product_ids,
                                              productId,
                                            ],
                                            productId: '',
                                          });
                                        } else {
                                          OCAlert.alertError(
                                            'Mã sản phẩm cần phải có 6 chữ số',
                                            {
                                              timeOut: 5000,
                                            }
                                          );
                                          return;
                                        }
                                      }
                                    }}
                                  />
                                  <p>
                                    {this.state.product_ids &&
                                      this.state.product_ids.map(
                                        (entry2, index) => {
                                          return (
                                            <span
                                              className='product_tag'
                                              onClick={() => {
                                                let result = this.state.product_ids.filter(
                                                  (k) => k !== entry2
                                                );
                                                this.setState({
                                                  product_ids: result,
                                                });
                                              }}
                                              key={index}
                                            >
                                              {entry2}
                                            </span>
                                          );
                                        }
                                      )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='form-group row'>
                                <div className='col-md-8'>
                                  <input
                                    type='text'
                                    id='productTag'
                                    className='form-control border-primary'
                                    placeholder='Điền tags của sản phẩm và bấm enter'
                                    onChange={(e) =>
                                      this.setState({
                                        productTag: e.target.value,
                                      })
                                    }
                                    value={this.state.productTag}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        const { productTag } = this.state;
                                        if (productTag == '') {
                                          OCAlert.alertError(
                                            'Điền tags của sản phẩm và bấm enter',
                                            {
                                              timeOut: 5000,
                                            }
                                          );
                                          return;
                                        } else {
                                          this.setState({
                                            product_tags: [
                                              ...this.state.product_tags,
                                              productTag,
                                            ],
                                            productTag: '',
                                          });
                                        }
                                      }
                                    }}
                                  />
                                  <p>
                                    {this.state.product_tags &&
                                      this.state.product_tags.map(
                                        (entry1, index) => {
                                          return (
                                            <span
                                              className='product_tag'
                                              onClick={() => {
                                                let result = this.state.product_tags.filter(
                                                  (k) => k !== entry1
                                                );
                                                this.setState({
                                                  product_tags: result,
                                                });
                                              }}
                                              key={index}
                                            >
                                              {entry1}
                                            </span>
                                          );
                                        }
                                      )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className='form-actions top mt-3'>
                          <div className='col-md-6'>
                            <button
                              className='btn btn-primary'
                              onClick={() => this.onSubmit()}
                            >
                              Xuất Mã Giảm Giá
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className='footer footer-static footer-light'>
              <p className='clearfix text-muted text-sm-center px-2'>
                <span>
                  Quyền sở hữu của &nbsp;{' '}
                  <a
                    href='https://www.sutygon.com'
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
        </div>
      </React.Fragment>
    );
  }
}

AddCoupons.propTypes = {
  getCouponById: PropTypes.func.isRequired,
  // auth: PropTypes.object,
  // saved: PropTypes.bool,
  // updateUser: PropTypes.func.isRequired,
  addNewCoupon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  saved: state.user.saved,
  user: state.user.profile,
});
export default connect(mapStateToProps, {
  addNewCoupon,
  getCouponById,
})(AddCoupons);
