import axios from "axios";
import {
  EVENT_SAVED,
  EVENT_ERROR,
  GET_EVENTS,GET_EVENT,
  EVENTS_LOADING,
  EVENT_UPDATED,GET_BEVENTS
} from "./types";
import { setAlert } from "./alert";

// Add new event
export const addEvent = (event) => async (dispatch) => {
  dispatch({ type: EVENTS_LOADING });
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post("/api/events/add",event, config);

    dispatch({
      type: EVENT_SAVED,
    });

    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EVENT_ERROR,
    });
  }
};

// Add new event
export const addBirthdayEvent = (event,id) => async (dispatch) => {
  dispatch({ type: EVENTS_LOADING });
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post(`/api/events/${id}/addBirthdayEvents`,event, config);

    dispatch({
      type: EVENT_SAVED,
    });

    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EVENT_ERROR,
    });
  }
};

// get All events
export const getAllEvents = () => async (dispatch) => {
  dispatch({ type: EVENTS_LOADING });
  try {
    const res = await axios.get(`/api/events`);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }
};
// get All events
export const getAllBirthdayEvents = () => async (dispatch) => {
  dispatch({ type: EVENTS_LOADING });
  try {
    const res = await axios.get(`/api/events/bdayEvent`);
    dispatch({
      type: GET_BEVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }
};

export const getEventbyID = (id) => async (dispatch) => {
  dispatch({ type: EVENTS_LOADING });

  try {
    const res = await axios.get(`/api/events/${id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: err.response,
    });
  }
};

// Update event

export const updateEvent = (event, id) => async (dispatch) => {
  dispatch({ type: EVENTS_LOADING });

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(`/api/events/${id}`, event, config);

    dispatch({
      type: EVENT_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllEvents());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EVENT_ERROR,
    });
  }
};