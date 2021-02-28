const initialstate = {
  users:[],
currentuser: {}

}
export default(state=initialstate,dispatchkadata) =>{
    switch(dispatchkadata.type){
    case 'SETUSER':
        return({
            
            ...state,
             currentuser:   dispatchkadata.payload
        })
  
  
        case 'SETFIREBASEUSER':
          return({
              
              ...state,
               users: dispatchkadata.payload
          })
      }
        
  
      

    
    return state
    
    }

  