import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    SIGNUP_USER,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    REMOVE_USER
} from '../actions/types';


const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    allUsers: null,
    newUser: 0,
    error: '',
    loading: false,
    userUpdate: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed', password: '', loading: false };
        case SIGNUP_USER:
            return { ...state, loading: true, error: '' };
        case SIGNUP_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: 2, newUser: 1, loading: false };
        case SIGNUP_USER_FAIL:
            return { ...state, error: 'Authentication Failed', password: '', loading: false };
        case FORGET_PASSWORD:
            return { ...state, loading: true, error: '' };
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload, loading: false, forgetLink: true };
        case FORGET_PASSWORD_FAIL:
            return { ...state, error: 'Failed', password: '', loading: false };
        case GET_USER:
            return { ...state, userUpdate: 0, loading: true, error: '' };
        case GET_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case GET_USER_FAIL:
            return { ...state, error: 'Failed', loading: false };
        case GET_ALL_USER:
            return { ...state, loading: true, error: '' };
        case GET_ALL_USER_SUCCESS:
            return { ...state, allUsers: action.payload, loading: false };
        case GET_ALL_USER_FAIL:
            return { ...state, error: 'Failed', loading: false };
        case UPDATE_USER:
            return { ...state, loading: true, error: '' };
        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, userUpdate: 1, editProfile: true };
        case UPDATE_USER_FAIL:
            return { ...state, error: 'Failed', loading: false, editProfile: false };
        case REMOVE_USER:
            return { ...state, user: null, loading: false, editProfile: false };
        default:
            return state;
    }
};