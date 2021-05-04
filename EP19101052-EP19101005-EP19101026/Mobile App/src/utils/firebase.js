import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBK5cF6mv6uZa9mA5ygmfCfhMdl7LwynRo",
    authDomain: "crime-management-system-f3071.firebaseapp.com",
    databaseURL: "https://crime-management-system-f3071-default-rtdb.firebaseio.com",
    projectId: "crime-management-system-f3071",
    storageBucket: "crime-management-system-f3071.appspot.com",
    messagingSenderId: "320248036388",
    appId: "1:320248036388:web:554bd09760cb65841c2cb1",
    measurementId: "G-8SM1CJMXEY"
};

// if (!firebase.apps.length) {
    firebase.initializeApp(config);
// }
export const auth = firebase.auth();
export const fireBase = firebase;
export default firebase;
