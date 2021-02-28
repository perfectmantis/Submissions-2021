import * as firebase from "firebase";
import configiration from "./../config/firebase/firebaseConfig";

firebase.initializeApp(configiration.firebaseDev);

export class FirebaseServie {
    static mainRef = firebase.database().ref();
    static storage = firebase.storage().ref();
    static auth = firebase.auth;

     saveImageToFirebase(filename, file) {
        console.log(FirebaseServie.storage);
        return new Promise((resolve, reject) => {
            var uploadRef = FirebaseServie.storage.child('images').child(filename).put(file);
            uploadRef.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                // Handle unsuccessful uploads
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                 resolve(uploadRef.snapshot.downloadURL)
                 var downloadURL = uploadRef.snapshot.downloadURL;
                console.log('SNAPSHOT URL:::: ',downloadURL);
            });
            /*uploadRef.on('state_changed', null, (err) => {
                reject(err)
            }, () => {
                resolve(uploadRef.snapshot.downloadURL)
            });*/
        })
    }
}