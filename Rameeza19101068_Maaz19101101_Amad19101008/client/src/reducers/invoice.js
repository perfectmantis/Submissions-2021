import {
    GET_INVOICES,
    INVOICES_ERROR,
   INVOICE_LOADING,
   INVOICE_SAVED,
    GET_INVOICE,
   INVOICE_DELETED,
  } from "../actions/types";
  const initialState = {
    invoice: null,
    invoices: null,
    loading: false,
    saved: false,
    generateReturnInvoice : false,

    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case INVOICE_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      case GET_INVOICES:
        return {
          ...state,
          invoices: payload,
          loading: false,
          saved: false,
        };
  
      case GET_INVOICE:
        return {
          ...state,
          invoice: payload,
          loading: false,
        };
  
      case INVOICE_SAVED:
        return {
          ...state,
          saved: true,
          loading: false,
          generateReturnInvoice : true
        };
      case INVOICES_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      case INVOICE_DELETED:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  