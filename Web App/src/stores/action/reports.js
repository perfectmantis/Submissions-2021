import { store } from '../index';
export default class ReportsActions {
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

    static getCrimes(payload) {
        store.dispatch({
            type: ReportsActions.GETCRIMES,
            payload
        })
    }

    static getComplaints(payload) {
        store.dispatch({
            type: ReportsActions.GETCOMPLAINTS,
            payload
        })
    }

    static getMissings(payload) {
        store.dispatch({
            type: ReportsActions.GETMISSING,
            payload
        })
    }
    static getUserReports(payload) {
        store.dispatch({
            type: ReportsActions.GETUSERREPORTS,
            payload
        })
    }

    static getUsers(payload) {
        store.dispatch({
            type: ReportsActions.GETUSERS,
            payload
        })
    }


    static getReports(payload) {
        store.dispatch({
            type: ReportsActions.GETREPORTS,
            payload
        })
    }

    static deleteReports(payload) {
        return {
            type: ReportsActions.DELETEREPORTS,
            payload
        }
    }


    static updateReports(payload) {
        return {
            type: ReportsActions.UPDATEREPORT,
            payload
        }
    }
    static deleteReportsEvent(payload) {
        store.dispatch({
            type: ReportsActions.DELETE_REPORTS_EVENT,
            payload
        })
    }
    static updateReportsEvent(payload) {
        store.dispatch({
            type: ReportsActions.UPDATE_REPORTS_EVENT,
            payload
        })
    }

    static addCrimes(payload) {
        return {
            type: ReportsActions.ADDCRIMES,
            payload
        }
    }

    static addComplaints(payload) {
        store.dispatch({
            type: ReportsActions.ADDCOMPLAINTS,
            payload
        })
    }

    static addMissings(payload) {
        store.dispatch({
            type: ReportsActions.ADDMISSINGS,
            payload
        })
    }
}
