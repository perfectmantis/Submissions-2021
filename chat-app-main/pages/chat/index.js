import userEvent from '@testing-library/user-event';
import React from 'react';
import {connect} from 'react-redux'
import {getuser} from '../../store/action'
import firebase from '../../config/firebase'
class Chat extends React.Component{
constructor(){
super()
this.state={
    chat_user:{},
baattein:[], 
message:''
}
}
    componentDidMount(){
        this.props.getuser()
    }
uidmerger(uid1,uid2){
if(uid1<uid2){
    return uid1+uid2
}    else{
    return uid2+uid1
}



}


    sendmessage = ()=>{
let current_ucer= this.props.currentuser
let chat_user=this.state.chat_user
let merger= this.uidmerger(current_ucer.uid,chat_user.uid)

firebase.database().ref('/').child(`baattein/${merger}`).push({
    message:this.state.message,
 name:chat_user.name,
 uid: chat_user.uid
})
this.setState({
    message:''
})

 //     this.state.baattein.push({
//message: this.state.message
//})
//this.setState({
  //  baattein: this.state.baattein,
    //message:''
//})    




}

getmessage =(uid) =>{
    firebase.database().ref('/').child(`baattein/${uid}`).on('child_added',(message)=>{
        this.state.baattein.push(message.val())
        this.setState({
            baattein:this.state.baattein
        })
    })
}





    baattein = (user)=>{
        this.setState({
            chat_user: user
        })
        //let current_ucer= this.props.currentuser
        let current_ucer= this.props.currentuser  
           let merger= this.uidmerger(current_ucer.uid,user.uid)
          this.getmessage(merger)
    
    }



    render(){
        let current_ucer = this.props.currentuser
        //console.log('firebase user==>',this.props.users)
        return(
            <div  style={{ backgroundColor:'lightblue',color: 'darkblue',height:'1000px',}}>
                <h4 style={{marginLeft:'470px',fontSize:40}}>WELCOME({current_ucer.name})</h4>
                <h6 style={{marginLeft:'520px',fontSize:25}}>{current_ucer.email}</h6>         
              <img  style={{marginLeft:'630px'}} src={current_ucer.photo} alt="" width='70' />
  
           
           
             <div/>
        
    <div style={{marginLeft:'570px'}}>
        <h1>CHAT USERS</h1>
        <ul>
        {this.props.users.map((v,i)=>{
           
return v.uid!==current_ucer.uid && <li key = {i}> 
                          { v.name} 
             <img style={{marginLeft:'15px',style:'flex'}} src={v.photo} alt='' width = '30'/>


           <button style={{marginLeft:'15px',backgroundColor:'skyblue',borderRadius:'20px',width:'90px'}} onClick={()=>this.baattein(v)}>Baatein</button></li>
})}
</ul> 
</div>
<div style= {{backgroundColor: 'violet',textAlign:'center',borderRadius: '5px', width: '400px',marginLeft:'490px'}}>
  
            <h3 style={{style: 'flex'}}>Chat</h3>
             {Object.keys ( this.state.chat_user).length ? 
            <div>       
               <h3> <img style={{marginRight:'30px',textAlign:'center',display:'inline'}} src={this.state.chat_user.photo} alt='' width='40'  />{this.state.chat_user.name}</h3>

<ul>
{this.state.baattein.map((v,i) =>{

return <li style={{color:v.uid === current_ucer.uid ? 'black' : 'white'}} key={i}>
{v.message}

</li>


    })}

</ul>


             <input value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} type='text' placeholder='enter your message'/>
             <button style={{marginLeft:'15px',marginBottom:'20px',backgroundColor:'lightpink',borderRadius:'20px',width:'90px'}} onClick={()=>this.sendmessage()}>send</button>
            
                            </div>
             : 
             <h4>no user</h4>
 
             

            }
            </div>
            </div>
            
        )
    
    }
}
const reduxmein = (state) => ({

currentuser: state.currentuser,
users: state.users    
})

const userarhahai = (dispatch) => ({

    getuser: () => dispatch(getuser())
    
})





export default connect(reduxmein,userarhahai)(Chat);