import {
  ALTERNOTES_LOADING,
  ALTERNOTES_ERROR,
  GET_ALTERNOTES,
  ADD_ALTERNOTE,
  DONE_ALTERNOTE,
} from '../actions/types'

const initialState = {
  alternotes: [],
  loading: false,
  error: '',
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ALTERNOTES_LOADING:
      return {
        ...state,
        loading: true,
        alternotes: [],
      }

    case GET_ALTERNOTES:
      return {
        ...state,
        alternotes: payload,
        loading: false,
      }

    case ADD_ALTERNOTE:
      return {
        ...state,
        alternotes: [payload, ...state.alternotes],
        loading: false,
        error: '',
      }

    // update it later.
    case DONE_ALTERNOTE:
      return {
        ...state,
        loading: false,
      }

    case ALTERNOTES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}
