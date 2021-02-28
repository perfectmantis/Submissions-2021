import React from 'react';
import {connect} from 'react-redux'
import { facebook} from '../../store/action'





class Home extends React.Component{
    render(){

        return(
            <div height='2000px' style={{ backgroundColor:'lightblue',color: 'darkblue',height:'1000px',marginBottom:'400px'}}>
            
            
            
            
            <div style={{height:'200px', marginBottom:'50px', marginLeft:'500px',fontSize:50}} > CHAT APP</div>
            
            
                <h1 style={{ marginLeft: '570px',fontSize:'40'}}>HELLO</h1>
            
            <button className="faceebookhover" style={{  marginLeft: '570px',fontSize:'40', backgroundColor:'lightblue',color: 'darkblue',borderRadius:50,borderColor:'darkblue',color:'darkblue',height:'40px'}} onClick={()=>this.props.facebook(this.props.history)}>facebook login</button>
            </div>
        )
    }
}



const setting = (dispatch) => ({

    facebook: (history) => dispatch(facebook(history))
    
})

export default connect(null,setting) (Home);