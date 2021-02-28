import {
    REPORT_ERROR,
    REPORT_LOADING,
    GET_REPORT,
} from "../actions/types";
const initialState = {
    reports: null,
    loading: false,
    saved: false,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REPORT_LOADING:
            return {
                ...state,
                loading: true,
            };

        case GET_REPORT:
            return {
                ...state,
                reports: payload,
                loading: false,
            };

        case REPORT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };


        default:
            return state;
    }
}
