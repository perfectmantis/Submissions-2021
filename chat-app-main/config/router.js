import React from "react"
import {BrowserRouter as Router,Route,} from "react-router-dom";
import Home from "../pages/Home"
import Chat from "../pages/Chat"


class AppRouter extends React.Component{
    render(){
        return(

<Router>
<Route exact path='/' component={Home}/>
<Route exact path='/Chat' component={Chat}/>

</Router>

        )
    }
}
export default AppRouter;