import {
    GET_CUSTOMERS,
    CUSTOMERS_ERROR,
   CUSTOMER_LOADING,
   CUSTOMER_SAVED,
    GET_CUSTOMER,
   CUSTOMER_DELETED,
   SEARCHED_CUSTOMER,
   GET_INSIGHT,
   INSIGHT_ERROR,
   INSIGHT_LOADING,
   CUSTOMER_UPDATED
  } from "../actions/types";
  const initialState = {
    customer: null,
    customers: null,
    loading: false,
    saved: false,
    searchedCustomer:null,
    insight:null,
    insightFound:null,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case INSIGHT_LOADING:
      case CUSTOMER_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      case GET_CUSTOMERS:
        return {
          ...state,
          customers: payload,
          loading: false,
          saved: false,
        };
        case SEARCHED_CUSTOMER:
          return {
            ...state,
            searchedCustomer: payload,
            loading: false,
            saved: false,
          };
  
      case GET_CUSTOMER:
        return {
          ...state,
          customer: payload,
          loading: false,
        };
        case GET_INSIGHT:
          return {
            ...state,
            insight: payload,
            loading: false,
            insightFound:true

          };
  
      case CUSTOMER_SAVED:
        return {
          ...state,
          saved: true,
          loading: false,
        };
        case CUSTOMER_UPDATED:
        return {
          ...state,
          saved: true,
          loading: false,
        };
        case INSIGHT_ERROR:
      case CUSTOMERS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          insightFound:false
        };
  
      case CUSTOMER_DELETED:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  