import axios from 'axios'
import {
  INVOICE_LOADING,
  INVOICE_SAVED,
  INVOICE_ERROR,
  GET_INVOICES,
  GET_INVOICE,
  INVOICES_ERROR,
  INVOICES_LOADING,
} from './types'
import { setAlert } from './alert'

// Add new product
export const addNewInvoice = (invoice) => async (dispatch) => {
  dispatch({ type: INVOICE_LOADING })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify(invoice)
  try {
    const res = await axios.post('/api/invoices/add', body, config)

    dispatch({
      type: INVOICE_SAVED,
    })

    dispatch(setAlert(res.data.msg, 'success'))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: INVOICE_ERROR,
    })
  }
}

// get All Invoices
export const getAllInvoices = () => async (dispatch) => {
  dispatch({ type: INVOICE_LOADING })
  try {
    const res = await axios.get(`/api/invoices`)

    dispatch({
      type: GET_INVOICES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: INVOICES_ERROR,
      payload: err.response,
    })
  }
}

// Get Invoice by ID
export const getInvoice = (id) => async (dispatch) => {
  dispatch({ type: INVOICES_LOADING })

  try {
    const res = await axios.get(`/api/rentinvoices/${id}`)
    dispatch({
      type: GET_INVOICE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: INVOICES_ERROR,
      payload: err.response,
    })
  }
}
