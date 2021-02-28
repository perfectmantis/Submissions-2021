import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import ReportReducer from './reportReducer';


export default combineReducers({
    auth: AuthReducer,
    report: ReportReducer
});