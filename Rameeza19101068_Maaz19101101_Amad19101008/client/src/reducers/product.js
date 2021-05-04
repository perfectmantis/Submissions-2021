import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  PRODUCT_LOADING,
  PRODUCT_SAVED,
  GET_PRODUCT,
  PRODUCT_DELETED,
  PRODUCT_UPDATED,
  GET_QTY,IMAGES_SAVED
} from "../actions/types";
const initialState = {
  product: null,
  products: null,
  products_total: null,
  loading: false,
  saved: false,
  images:null,
  generateReturnInvoice: false,
  qty:null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        saved: false,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.products,
        products_total: payload.total,
        loading: false,
        saved: false,
        generateReturnInvoice: false,
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
        generateReturnInvoice: false,
        saved: false,
      };
      case GET_QTY:
      return {
        ...state,
        qty: payload,
        loading: false,
        generateReturnInvoice: false,
        saved: false,
      };
    case IMAGES_SAVED:
      return{
        ...state,
        images:payload,
        saved:true,
        loading:false,
      }
    case PRODUCT_SAVED:
      return {
        ...state,
        saved: true,
        loading: false,
      };
    case PRODUCT_UPDATED:
      return {
        ...state,
        product: payload,
        saved: true,
        loading: false,
        generateReturnInvoice: true,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };


    case PRODUCT_DELETED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
