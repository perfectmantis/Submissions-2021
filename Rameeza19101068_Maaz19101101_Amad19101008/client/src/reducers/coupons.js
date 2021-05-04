import {
  GET_COUPONS,
  COUPON_ERROR,
  COUPON_LOADING,
  COUPON_SAVED,
  GET_COUPON,
  COUPON_DELETED,
  COUPON_UPDATED,
} from "../actions/types";
const initialState = {
  coupon: null,
  coupons: null,
  coupons_total: null,
  loading: false,
  saved: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COUPON_LOADING:
      return {
        ...state,
        loading: true,
        saved: false,
      };

    case GET_COUPONS:
      return {
        ...state,
        coupons: payload.coupons,
        coupons_total: payload.total,
        loading: false,
        saved: false,
      };

    case GET_COUPON:
      return {
        ...state,
        coupon: payload,
        loading: false,
        saved: false,
      };
   

    case COUPON_SAVED:
      return {
        ...state,
        saved: true,
        loading: false,
      };
    case COUPON_UPDATED:
      return {
        ...state,
        saved: true,
        loading: false,
        generateReturnInvoice: true,
      };
    case COUPON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case COUPON_DELETED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
