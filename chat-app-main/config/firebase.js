import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/database'
 
var firebaseConfig = {
  apiKey: "AIzaSyB8riRFlznCh1k75zk_obEXeCDrpvPJ2Zo",
  authDomain: "chatapp-982a8.firebaseapp.com",
  projectId: "chatapp-982a8",
  storageBucket: "chatapp-982a8.appspot.com",
  messagingSenderId: "1043698963896",
  appId: "1:1043698963896:web:ecce3248e3cf426bf16b4d",
  measurementId: "G-V3GM81V18E"
};
// Initialize Firebase
              
 firebase.initializeApp(firebaseConfig);
 export default firebase;
