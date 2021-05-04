import axios from 'axios'
import {
  ALTERNOTES_LOADING,
  ALTERNOTES_ERROR,
  GET_ALTERNOTES,
  ADD_ALTERNOTE,
  DONE_ALTERNOTE,
} from './types'
import { setAlert } from './alert'

//POST api/alternotes
//GET api/alternotes
//PUT api/alternotes/:id/done

// add alter note.
export const addAlterNote = (note) => async (dispatch) => {
  dispatch({ type: ALTERNOTES_LOADING })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(note)
  try {
    const res = await axios.post('/api/alternotes', body, config)

    dispatch(setAlert(res.data.errors[0].msg, 'success'))

    dispatch({
      type: ADD_ALTERNOTE,
      payload: res.data.alterNote,
    })
  } catch (err) {
    console.log(err)

    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// get all alternotes
export const getAlterNotes = (id) => async (dispatch) => {
  dispatch({ type: ALTERNOTES_LOADING })

  try {
    const res = await axios.get(`/api/alternotes/${id}`)

    dispatch({
      type: GET_ALTERNOTES,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: ALTERNOTES_ERROR,
    })
  }
}

// mark as done
export const markDone = (id) => async (dispatch) => {
  dispatch({ type: ALTERNOTES_LOADING })

  try {
    const res = await axios.put(`/api/alternotes/${id}/done`)

    dispatch({
      type: DONE_ALTERNOTE,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: ALTERNOTES_ERROR,
    })
  }
}
