import {
    GET_ALL_REPORTS_SUCCESS,
    GET_ALL_REPORTS_FAIL,
    GET_ALL_REPORTS,
    GET_CRIME_SUCCESS,
    GET_CRIME_FAIL,
    GET_CRIME,
    GET_MISSING,
    GET_MISSING_SUCCESS,
    GET_MISSING_FAIL,
    GET_COMPLAINT,
    GET_COMPLAINT_SUCCESS,
    GET_COMPLAINT_FAIL,
    ADD_REPORT_SUCCESS,
    ADD_REPORT_FAIL,
    ADD_REPORT,
    REMOVE_USER
} from '../actions/types';


const INITIAL_STATE = {
    allReports: null,
    crimes: null,
    missings: null,
    complaints: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_REPORTS:
            return { ...state, loading: true, error: '' };
        case GET_ALL_REPORTS_SUCCESS:
            return { ...state, allReports: action.payload, loading: false };
        case GET_ALL_REPORTS_FAIL:
            return { ...state, loading: false };
        case GET_CRIME:
            return { ...state, loading: true, error: '' };
        case GET_CRIME_SUCCESS:
            return { ...state, crimes: action.payload, loading: false };
        case GET_CRIME_FAIL:
            return { ...state, loading: false };
        case GET_MISSING:
            return { ...state, loading: true, error: '' };
        case GET_MISSING_SUCCESS:
            return { ...state, missings: action.payload, loading: false };
        case GET_MISSING_FAIL:
            return { ...state, loading: false };
        case GET_COMPLAINT:
            return { ...state, loading: true, error: '' };
        case GET_COMPLAINT_SUCCESS:
            return { ...state, complaints: action.payload, loading: false };
        case GET_COMPLAINT_FAIL:
            return { ...state, loading: false };
        case ADD_REPORT:
            return { ...state, loading: true, error: '' };
        case ADD_REPORT_SUCCESS:
            return { ...state, loading: false };
        case ADD_REPORT_FAIL:
            return { ...state, loading: false };
        case REMOVE_USER:
            return {
                ...state, allReports: null,
                crimes: null,
                missings: null,
                complaints: null,
            };
        default:
            return state;
    }
};