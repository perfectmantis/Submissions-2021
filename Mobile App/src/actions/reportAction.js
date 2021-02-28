import firebase, { auth, fireBase } from '../utils/firebase'
import {
    GET_ALL_REPORTS,
    GET_ALL_REPORTS_SUCCESS,
    GET_ALL_REPORTS_FAIL,
    GET_CRIME,
    GET_CRIME_SUCCESS,
    GET_CRIME_FAIL,
    GET_MISSING,
    GET_MISSING_SUCCESS,
    GET_MISSING_FAIL,
    GET_COMPLAINT,
    GET_COMPLAINT_SUCCESS,
    GET_COMPLAINT_FAIL,
    ADD_REPORT,
    ADD_REPORT_SUCCESS,
    ADD_REPORT_FAIL,
} from './types';
import Toast from 'react-native-simple-toast';

const snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { uid: e[0] }))


export const getAllReports = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_REPORTS });
        try {
            await firebase.database().ref(`reports`).on("value", (snapshot) => {
                if (snapshot.val()) {
                    let data = snapshotToArray(snapshot.val())
                    getAllReportsSuccess(dispatch, data)
                } else {
                    getAllReportsFail(dispatch)
                }
            })

        } catch (error) {
            getAllReportsFail(dispatch)
        }
    }
}

export const getCrime = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_CRIME });
        firebase.database().ref('crimes/' + id).once("value", snapshot => {
            if (snapshot.val()) {
                dispatch({ type: GET_CRIME_SUCCESS, payload: snapshotToArray(snapshot.val()) })
            } else {
                dispatch({ type: GET_CRIME_FAIL })
            }
        })
    }
}

export const getMissing = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_MISSING });
        firebase.database().ref('missings/' + id).once("value", snapshot => {
            if (snapshot.val()) {
                dispatch({ type: GET_MISSING_SUCCESS, payload: snapshotToArray(snapshot.val()) })
            } else {
                dispatch({ type: GET_MISSING_FAIL })
            }
        })
    }
}

export const getComplaint = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_COMPLAINT });
        firebase.database().ref('complaints/' + id).once("value", snapshot => {
            if (snapshot.val()) {
                dispatch({ type: GET_COMPLAINT_SUCCESS, payload: snapshotToArray(snapshot.val()) })
            } else {
                dispatch({ type: GET_COMPLAINT_FAIL })
            }
        })
    }
}

export const addReport = (payload, navigation) => {
    return (dispatch) => {
        dispatch({ type: ADD_REPORT });
        let mainRef = firebase.database().ref()
        if (payload && (payload.role == 'Crime')) {
            let Objkey = mainRef.child(`reports`).push(payload)
            let objkey2 = mainRef.child(`crimes/${payload.userId}/${Objkey.key}`).set(payload)
            mainRef.child(`userReports/${payload.userId}/${Objkey.key}`)
                .set(payload)
                .then(res => {
                    Toast.show(
                        "Crime report has been registered!",
                        Toast.LONG,
                    )
                    navigation.navigate('ReportView')
                    dispatch({ type: ADD_REPORT_SUCCESS });
                }).catch(err => {
                    Toast.show(
                        err.message,
                        Toast.LONG,
                    )
                    dispatch({ type: ADD_REPORT_FAIL });
                })


        }
        else if (payload && payload.role == 'Missing') {
            let Objkey = mainRef.child(`reports`).push(payload)
            let objkey2 = mainRef.child(`missings/${payload.userId}/${Objkey.key}`).set(payload)
            mainRef.child(`userReports/${payload.userId}/${Objkey.key}`)
                .set(payload)
                .then(res => {
                    Toast.show(
                        "Missing report has been registered!",
                        Toast.LONG,
                    )
                    navigation.navigate('ReportView')
                    dispatch({ type: ADD_REPORT_SUCCESS });
                }).catch(err => {
                    Toast.show(
                        err.message,
                        Toast.LONG,
                    )
                    dispatch({ type: ADD_REPORT_FAIL });
                })
        }
        else if (payload && payload.role == 'Complaint') {

            let Objkey = mainRef.child(`reports`).push(payload)
            let objkey2 = mainRef.child(`complaints/${payload.userId}/${Objkey.key}`).set(payload)
            mainRef.child(`userReports/${payload.userId}/${Objkey.key}`)
                .set(payload)
                .then(res => {
                    Toast.show(
                        "Complaint report has been registered!",
                        Toast.LONG,
                    )
                    navigation.navigate('ReportView')
                    dispatch({ type: ADD_REPORT_SUCCESS });
                }).catch(err => {
                    Toast.show(
                        err.message,
                        Toast.LONG,
                    )
                    dispatch({ type: ADD_REPORT_FAIL });
                })
        }
    };
};


const getAllReportsFail = (dispatch) => {
    dispatch({ type: GET_ALL_REPORTS_FAIL });
};

const getAllReportsSuccess = (dispatch, user) => {
    dispatch({
        type: GET_ALL_REPORTS_SUCCESS,
        payload: user
    });
}