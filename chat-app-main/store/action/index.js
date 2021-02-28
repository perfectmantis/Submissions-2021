
import firebase from '../../config/firebase';



const facebook = (history) => {
return(dispatch)=>{
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth()
  .signInWithPopup(provider).then(function (result)  {
    
    var token = result.credential.accessToken;
    var user = result.user;
    let createuser = {
      name:user.displayName,
      uid:user.uid,
      photo:user.photoURL,
      email:user.email
    
    }

 firebase.database().ref('/').child(`users/${user.uid}`).set(createuser)
.then(() => {
  dispatch({type:'SETUSER', payload : createuser})
  history.push('/Chat')
})
 

 })  
    

 
  .catch(function (error) {

    var errorCode = error.code;
    var errorMessage = error.message;
    
    
  });
}
}


const getuser = () => {
  return(dispatch)=>{
    let users = [];
   

firebase.database().ref('/').child('users').on('child_added',(data)=>{
users.push(data.val())
})
dispatch({type:'SETFIREBASEUSER',payload:users})


}
}




export {
facebook,
getuser
}