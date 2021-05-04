import React from 'react'
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import { browserHistory } from 'react-router';
import { Observable } from "rxjs";
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import AuthActions from "./../stores/action/auth";
import { authConfig } from '../config/firebase/firebaseConfig';
import { combineReducers } from 'redux';
import { FirebaseServie } from '../service/firebaseService';
import * as firebase from 'firebase';

const mainRef = FirebaseServie.mainRef;

export default (initialState = {}) => {

    // auth epics
    const signupEpic = (action$) =>
        action$.ofType(AuthActions.SIGNUP)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(mainRef.child(`users/${payload.userId}`).once('value'))
                    .map(snapshot => {
                        if (snapshot.val()) {
                            alert('User id exists sign up from different user id!')
                            return {
                                type: AuthActions.SIGNUP_FAILER,
                                payload: { isError: { status: true, msg: 'user id exists' } }
                            }
                        } else {
                            return {
                                type: AuthActions.CREATEUSER,
                                payload
                            }
                        }
                    });
            });



    const signInWithFacebook = (action$) =>
        action$.ofType(AuthActions.FBLOGIN)
            .switchMap(() => {
                const provider = new firebase.auth.FacebookAuthProvider();
                authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));
                return Observable.fromPromise(firebase.auth().signInWithPopup(provider))
                    .map(snapshot => {
                        if (snapshot) {
                            const { user: { uid, displayName, photoURL, email } } = snapshot;
                            var [fname, lname] = displayName.split(' ');
                            let uObj = {

                                userId: uid,
                                eml: email,
                                type: "reporter",
                                photoURL: photoURL,
                                fname: fname,
                                lname: lname
                            };
                            firebase.database().ref('/').child(`users/${uid}`).update(uObj);
                            firebase.database().ref('/').child(`auth/${uid}`).update(uObj);
                            localStorage.setItem('react-localStorage-user', JSON.stringify(snapshot));
                            return {
                                type: AuthActions.LOGIN_SUCCESS,
                                payload: uObj
                            }

                        } else {
                            return {
                                type: AuthActions.CREATEUSER,
                                payload
                            }
                        }
                    });
            });

    const createrMemberEpic = (action$) =>
        action$.ofType(AuthActions.CREATEUSER)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(payload.eml, payload.pwd))
                    .catch(err => {
                        alert(err.message)
                        return Observable.of({
                            type: AuthActions.SIGNUP_FAILER,
                            payload: { isError: { status: true, msg: err.message } }
                        });
                    })
                    .map((obj) => {
                        if (obj.type === 'SIGNUP_FAILER') {
                            return obj;
                        }

                        obj.updateProfile({
                            displayName: payload.userId,
                            photoURL: 'some/url'
                        });
                        let uObj = {
                            fuid: obj.uid,
                            userId: payload.userId,
                            eml: payload.eml,
                            type: "reporter",
                            fname: payload.fname,
                            photoURL: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500",
                            lname: payload.lname
                        };
                        firebase.database().ref('/').child(`users/${payload.userId}`).set(uObj);
                        firebase.database().ref('/').child(`auth/${obj.uid}`).set(uObj);
                        return {
                            type: AuthActions.SIGNUP_SUCCESS,
                            payload: uObj
                        }
                    });
            });


    const isLoggedInEpic = (action$) =>
        action$.ofType(AuthActions.ISLOGGEDIN)
            .switchMap(() => {
                let payload = JSON.parse(localStorage.getItem('react-localStorage-user'))
                if (payload && payload.type) {
                    return Observable.of({
                        type: AuthActions.LOGIN_SUCCESS,
                        payload
                    })
                } else {

                    return Observable.of({
                        type: AuthActions.NULL
                    })
                }
            })

    const loginEpic = (action$) =>
        action$.ofType(AuthActions.LOGIN)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.email, payload.password))
                    .catch(err => {
                        alert(err.message)

                        return Observable.of(err);
                    })
                    .switchMap((d) => {
                        if (d.message) {
                            alert(d.message)
                            return Observable.of({
                                type: AuthActions.LOGIN_FAILER,
                                payload: d.message
                            });
                        } else {
                            return Observable.fromPromise(firebase.database().ref('/').child(`users/${d.displayName}`).once('value'))
                                .map(u => {
                                    localStorage.setItem('react-localStorage-user', JSON.stringify(u.val()));
                                    return {
                                        type: AuthActions.LOGIN_SUCCESS,
                                        payload: u.val()
                                    }
                                })
                        }
                    })
            })


    const LogoutEpic = (action$) =>
        action$.ofType(AuthActions.LOGOUT)
            .switchMap(() => {
                localStorage.removeItem('react-localStorage-user');
                return Observable.fromPromise(firebase.auth().signOut())
                    .map(() => {
                        return {
                            type: AuthActions.LOGOUT_SUCCESS
                        }
                    })
                    .catch((err) => {
                        alert(err.message)
                        return Observable.of({
                            type: AuthActions.LOGOUT_SUCCESS
                        })
                    })
            })

    // reports epics    
    const getCrimes = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                if (payload && (payload.type == 'reporter')) {
                    mainRef.child(`crimes/${payload.userId}`).on('child_added', (snapshot) => {
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        AuthActions.getCrimes(obj, store);
                    })

                }
                return Observable.of({
                    type: AuthActions.NULL
                })
            })




    const getComplaints = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                if (payload && (payload.type == 'reporter')) {
                    mainRef.child(`complaints/${payload.userId}`).on('child_added', (snapshot) => {

                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        AuthActions.getComplaints(obj, store);

                    })
                }
                return Observable.of({
                    type: AuthActions.NULL
                })
            })

    const getMissings = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                if (payload && (payload.type == 'reporter')) {
                    mainRef.child(`missings/${payload.userId}`).on('child_added', (snapshot) => {
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        AuthActions.getMissings(obj, store);
                    })
                }
                return Observable.of({
                    type: AuthActions.NULL
                })
            })

    const getUserReports = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                if (payload && (payload.type == 'reporter')) {
                    mainRef.child(`userReports/${payload.userId}`).on('child_added', (snapshot) => {
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        AuthActions.getUserReports(obj, store);
                    })
                }
                return Observable.of({
                    type: AuthActions.NULL
                })
            })
    const getUsers = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                if (payload && (payload.type == 'admin')) {
                    mainRef.child(`users`).on('child_added', (snapshot) => {
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        AuthActions.getUsers(obj, store);
                    })
                }
                return Observable.of({
                    type: AuthActions.NULL
                })
            })

    const getAllReports = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                if (payload && (payload.type == 'admin')) {
                    mainRef.child('reports').on('child_added', (snapshot) => {
                        let obj = Object.assign({}, snapshot.val());
                        obj['$key'] = snapshot.key
                        AuthActions.getReports(obj, store);


                    })
                }

                return Observable.of({
                    type: AuthActions.NULL
                })
            })
    const addReports = (action$) =>
        action$.ofType(AuthActions.ADDCRIMES)
            .switchMap(({ payload }) => {
                payload['dated'] = firebase.database.ServerValue.TIMESTAMP;
                if (payload && (payload.role == 'Crime')) {
                    let Objkey = mainRef.child(`reports`).push(payload)
                    let objkey2 = mainRef.child(`crimes/${payload.userId}/${Objkey.key}`).set(payload)
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${Objkey.key}`)
                        .set(payload))
                        .map((data) => {
                            browserHistory.push("/crimes")
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
                else if (payload && payload.role == 'Missing') {
                    let Objkey = mainRef.child(`reports`).push(payload)
                    let objkey2 = mainRef.child(`missings/${payload.userId}/${Objkey.key}`).set(payload)
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${Objkey.key}`)
                        .set(payload))
                        .map((data) => {
                            browserHistory.push("/missing")
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
                else if (payload && payload.role == 'Complaint') {
                    let Objkey = mainRef.child(`reports`).push(payload)
                    let objkey2 = mainRef.child(`complaints/${payload.userId}/${Objkey.key}`).set(payload)
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${Objkey.key}`)
                        .set(payload))
                        .map((data) => {
                            browserHistory.push("/complaints")
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
            })



    const onReportsEventDeleteEpics = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                mainRef.child(`reports`).on('child_removed', (snapshot) => {
                    let obj = Object.assign({}, snapshot.val());
                    obj['$key'] = snapshot.key
                    AuthActions.deleteReportsEvent(obj, store);
                })
                return Observable.of({
                    type: AuthActions.NULL
                })
            })

    const deleteReport = (action$) =>
        action$.ofType(AuthActions.DELETEREPORTS)
            .switchMap(({ payload }) => {
                if (payload && (payload.role == 'Crime')) {
                    mainRef.child(`reports/${payload.$key}`).remove()
                    mainRef.child(`crimes/${payload.userId}/${payload.$key}`).remove()
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${payload.$key}`)
                        .remove())
                        .map((data) => {
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
                else if (payload && (payload.role == 'Complaint')) {
                    mainRef.child(`reports/${payload.$key}`).set({})
                    mainRef.child(`complaints/${payload.userId}/${payload.$key}`).set({})
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${payload.$key}`)
                        .set({}))
                        .map((data) => {
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
                else if (payload && (payload.role == 'Missing')) {
                    mainRef.child(`reports/${payload.$key}`).set({})
                    mainRef.child(`missings/${payload.userId}/${payload.$key}`).set({})
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${payload.$key}`)
                        .set({}))
                        .map((data) => {
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
            })


    const updateReport = (action$) =>
        action$.ofType(AuthActions.UPDATEREPORT)
            .switchMap(({ payload }) => {
                if (payload && (payload.role == 'Crime')) {
                    mainRef.child(`reports/${payload.$key}`).update({ adminStatus: "Case Approved" })
                    mainRef.child(`crimes/${payload.userId}/${payload.$key}`).update({ adminStatus: "Case Approved" })
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${payload.$key}`)
                        .update({ adminStatus: "Case Approved" }))
                        .map((data) => {
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
                else if (payload && (payload.role == 'Complaint')) {
                    mainRef.child(`reports/${payload.$key}`).update({ adminStatus: "Case Approved" })
                    mainRef.child(`complaints/${payload.userId}/${payload.$key}`).update({ adminStatus: "Case Approved" })
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${payload.$key}`)
                        .update({ adminStatus: "Case Approved" }))
                        .map((data) => {
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
                else if (payload && (payload.role == 'Missing')) {

                    mainRef.child(`reports/${payload.$key}`).update({ adminStatus: "Case Approved" })
                    mainRef.child(`missings/${payload.userId}/${payload.$key}`).update({ adminStatus: "Case Approved" })
                    return Observable.fromPromise(mainRef.child(`userReports/${payload.userId}/${payload.$key}`)
                        .update({ adminStatus: "Case Approved" }))
                        .map((data) => {
                            return {
                                type: AuthActions.NULL
                            }
                        })
                }
            })

    const onReportsEventUpdateEpics = (action$) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({ payload }) => {
                mainRef.child(`reports`).on('child_changed', (snapshot) => {

                    let obj = Object.assign({}, snapshot.val());
                    obj['$key'] = snapshot.key
                    AuthActions.updateReportsEvent(obj, store);
                })

                return Observable.of({
                    type: AuthActions.NULL
                })
            })

    const rootEpic = combineEpics(

        signupEpic,
        loginEpic,
        isLoggedInEpic,
        createrMemberEpic,
        signInWithFacebook,
        LogoutEpic,
        getCrimes,
        getAllReports,
        onReportsEventDeleteEpics,
        getComplaints,
        getCrimes,
        getMissings,
        getUserReports,
        getUsers,
        addReports,
        deleteReport,
        updateReport,
        onReportsEventUpdateEpics

    );

    const epicMiddleware = createEpicMiddleware(rootEpic);
    let middleware = applyMiddleware(epicMiddleware);
    const store = createStore(reducers,
        applyMiddleware(epicMiddleware)
    );
    return store;
}
