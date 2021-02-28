export default class AuthActions {
    static SIGNUP = "SIGNUP";
    static SIGNUP_FAILER = "SIGNUP_FAILER";
    static CREATEUSER = "CREATEUSER";
    static CREATEFBUSER = "CREATEFBUSER";
    static SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
    static LOGIN = "LOGIN";
    static FBLOGIN = "FBLOGIN";
    static FBLOGIN_SUCCESS = "FBLOGIN_SUCCESS";
    static LOGIN_SUCCESS = "LOGIN_SUCCESS";
    static LOGIN_FAILER = "LOGIN_FAILER";

    static LOGOUT = "LOGOUT";
    static LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

    static ISLOGGEDIN = "ISLOGGEDIN";
    //==============================================================
    static GETCRIMES = "GETCRIMES";
    static GETCOMPLAINTS = "GETCOMPLAINTS";
    static GETMISSING = "GETMISSING";
    static GETREPORTS = "GETREPORTS";
    static GETUSERREPORTS = "GETUSERREPORTS";
    static GETUSERS = "GETUSERS";
    static ADDMISSINGS = "ADDMISSINGS";
    static ADDCOMPLAINTS = "ADDCOMPLAINTS";

    static ADDCRIMES = "ADDCRIMES";

    static DELETEREPORTS = "DELETEREPORTS";
    static DELETE_REPORTS_EVENT = "DELETE_REPORTS_EVENT";
    static UPDATE_REPORTS_EVENT = "UPDATE_REPORTS_EVENT";
    static UPDATEREPORT = "UPDATEREPORT";
    static DELETECRIMES = "DELETECRIMES";

    static NULL = "NULL";

    constructor() { }

    static isLoggedin() {
        return {
            type: AuthActions.ISLOGGEDIN
        };
    }

    static signup(payload) {
        return {
            type: AuthActions.SIGNUP,
            payload
        };
    }

    static login(payload) {
        return {
            type: AuthActions.LOGIN,
            payload
        };
    }

    static fblogin() {
        return {
            type: AuthActions.FBLOGIN
        };
    }

    static logout() {
        return {
            type: AuthActions.LOGOUT
        };
    }

    //================================================

    static getCrimes(payload, store) {
        store.dispatch({
            type: AuthActions.GETCRIMES,
            payload
        })
    }

    static getComplaints(payload, store) {
        store.dispatch({
            type: AuthActions.GETCOMPLAINTS,
            payload
        })
    }

    static getMissings(payload, store) {
        store.dispatch({
            type: AuthActions.GETMISSING,
            payload
        })
    }
    static getUserReports(payload, store) {
        store.dispatch({
            type: AuthActions.GETUSERREPORTS,
            payload
        })
    }

    static getUsers(payload, store) {
        store.dispatch({
            type: AuthActions.GETUSERS,
            payload
        })
    }


    static getReports(payload, store) {
        store.dispatch({
            type: AuthActions.GETREPORTS,
            payload
        })
    }

    static deleteReports(payload) {
        return {
            type: AuthActions.DELETEREPORTS,
            payload
        }
    }


    static updateReports(payload, store) {
        return {
            type: AuthActions.UPDATEREPORT,
            payload
        }
    }
    static deleteReportsEvent(payload, store) {
        store.dispatch({
            type: AuthActions.DELETE_REPORTS_EVENT,
            payload
        })
    }
    static updateReportsEvent(payload, store) {
        store.dispatch({
            type: AuthActions.UPDATE_REPORTS_EVENT,
            payload
        })
    }

    static addCrimes(payload) {
        return {
            type: AuthActions.ADDCRIMES,
            payload
        }
    }

    static addComplaints(payload, store) {
        store.dispatch({
            type: AuthActions.ADDCOMPLAINTS,
            payload
        })
    }

    static addMissings(payload, store) {
        store.dispatch({
            type: AuthActions.ADDMISSINGS,
            payload
        })
    }
}







