import { auth, fireBase } from '../utils/firebase'
import { AsyncStorage } from 'react-native';

import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
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
} from './types';
import Toast from 'react-native-simple-toast';

const snapshotToArray = snapshot => Object.entries(snapshot).map(e => Object.assign(e[1], { uid: e[0] }))

export const signupUser = (values, navigation) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER });
        fireBase.database().ref('/').child(`users/${values.userId}`).once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    signupUserFail(dispatch, 'User id exists sign up from different user id!');
                    Toast.show(
                        "User id exists sign up from different user id!",
                        Toast.LONG,
                    )
                } else {
                    auth.createUserWithEmailAndPassword(values.email, values.password)
                        .then(user => {
                            user.user.updateProfile({
                                displayName: values.userId,
                                photoURL: 'some/url'
                            });
                            fireBase.database().ref('/').child(`users/${values.userId}`)
                                .set({
                                    fuid: user.user.uid,
                                    userId: values.userId,
                                    eml: values.email,
                                    type: "reporter",
                                    fname: values.firstname,
                                    photoURL: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500",
                                    lname: values.lastname
                                })
                                .then(res => {
                                    fireBase.database().ref('/').child(`auth/${user.user.uid}`).set({
                                        fuid: user.user.uid,
                                        userId: values.userId,
                                        eml: values.email,
                                        type: "reporter",
                                        fname: values.firstname,
                                        photoURL: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500",
                                        lname: values.lastname
                                    });
                                    // AsyncStorage.setItem('userUID', user.user.uid)
                                    Toast.show(
                                        "You have successfully signup.",
                                        Toast.SHORT,
                                    )
                                    signupUserSuccess(dispatch, user)
                                    navigation.navigate("Login")
                                })
                                .catch(error => {
                                    signupUserFail(dispatch, error)
                                })
                        })
                        .catch((error) => {
                            signupUserFail(dispatch, error);
                        });
                }
            })
            .catch((err) => {
                getUserFail(dispatch, err)
            })
    };
};

export const loginUser = (email, Pass, navigation) => {

    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        auth.signInWithEmailAndPassword(email, Pass)
            .then(user => {
                AsyncStorage.setItem('userUID', user.user.displayName);
                loginUserSuccess(dispatch, user)
                Toast.show('You have successfully logged in.', Toast.SHORT)
                navigation.navigate("AuthLoading")

            })
            .catch((error) => {
                loginuserFail(dispatch, error);
            });
    };
};

export const getUser = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_USER });
        fireBase.database().ref('/').child(`users/${id}`).once('value')
            .then((snapshot) => {
                getUserSuccess(dispatch, snapshot.val())
            })
            .catch((err) => {
                getUserFail(dispatch, err)
            })
    };
};

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch({ type: GET_ALL_USER });
        fireBase.database().ref(`Users`).on("value", snapshot => {
            if (snapshot.val()) {
                getAllUsersSuccess(dispatch, snapshotToArray(snapshot.val()))
            } else {
                getAllUsersFail(dispatch)
            }
        })
    };
};

export const removeUserFromState = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_USER });
    };
};


export const updateUser = (id, value, hideToast) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_USER });
        fireBase.database().ref('users/' + id).update(value)
            .then((res) => {
                if (!hideToast) {
                    Toast.show('Your profile has been updated!', Toast.SHORT)
                }
                dispatch({ type: UPDATE_USER_SUCCESS })
            })
            .catch((err) => {
                Toast.show('something went wrong!', Toast.SHORT)
                dispatch({ type: UPDATE_USER_FAIL })
            })
    };
};

export const forgotPassword = (email, navigation) => {
    return (dispatch) => {
        dispatch({ type: FORGET_PASSWORD });
        auth.sendPasswordResetEmail(email)
            .then((res) => {
                Toast.show('Password reset email sent successfully!', Toast.SHORT)
                navigation.navigate("Login")
                dispatch({ type: FORGET_PASSWORD_SUCCESS })
            })
            .catch((err) => {
                Toast.show(err.message, Toast.SHORT)
                dispatch({ type: FORGET_PASSWORD_FAIL })
            })
    };
};


const signupUserSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUP_USER_SUCCESS
    });
}
const signupUserFail = (dispatch, error) => {
    dispatch({
        type: SIGNUP_USER_FAIL
    });
    alert(error)
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

}

const loginuserFail = (dispatch, error) => {
    alert(error)
    dispatch({ type: LOGIN_USER_FAIL });
};

const getUserFail = (dispatch, error) => {
    dispatch({ type: GET_USER_FAIL });
};

const getUserSuccess = (dispatch, user) => {
    dispatch({
        type: GET_USER_SUCCESS,
        payload: user
    });
}

const getAllUsersFail = (dispatch) => {
    dispatch({ type: GET_ALL_USER_FAIL });
};

const getAllUsersSuccess = (dispatch, user) => {
    dispatch({
        type: GET_ALL_USER_SUCCESS,
        payload: user
    });
}
