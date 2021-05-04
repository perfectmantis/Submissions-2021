import {
  GET_APPOINTMENTS,
  APPOINTMENTS_ERROR,
  APPOINTMENT_LOADING,
  APPOINTMENT_SAVED,
  GET_APPOINTMENT,
  APPOINTMENT_DELETED,
  APPOINTMENTS_CANCEL,
  APPOINTMENTS_CHECKEDIN,
  GET_TODAYS_APPOINTMENTS,APPOINTMENT_UPDATED
} from "../actions/types";
const initialState = {
  appointment: null,
  appointments: null,
  todayAppointment: null,
  loading: false,
  saved: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case APPOINTMENT_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
        loading: false,
        saved: false,
      };
    case APPOINTMENTS_CANCEL:
    case APPOINTMENTS_CHECKEDIN:
    case GET_APPOINTMENT:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case GET_TODAYS_APPOINTMENTS:
      return {
        ...state,
        todayAppointment: payload,
        loading: false,
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case APPOINTMENT_SAVED:
      return {
        ...state,
        saved: true,
        loading: false,
      };
      case APPOINTMENT_UPDATED:
        return {
          ...state,
          saved: true,
          loading: false,
        };
    case APPOINTMENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case APPOINTMENT_DELETED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
