/**
 * Created by Admin on 12/28/2016.
 */
import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router';

// redux/firebase
import { connect } from 'react-redux'
import AuthActions from "./../../stores/action/auth";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// Components
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/fingerprint'
import Feedback from 'material-ui/svg-icons/action/feedback'
import MenuIcons from 'material-ui/svg-icons/navigation/menu'
import ContentInbox from 'material-ui/svg-icons/action/accessibility'
import ContentDrafts from 'material-ui/svg-icons/action/home'
import ContentSend from 'material-ui/svg-icons/action/view-quilt'
import Face from 'material-ui/svg-icons/action/face';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
// import Logo from './../../assets/images/logo.png'
const buttonStyle = { color: 'white', textDecoration: 'none' }
const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'bottom' }
const avatarSize = 50;


class App extends Component {
    // 

    constructor() {
        super();
        this.state = { open: false }

        setTimeout(() => {
            this.props.isLoggedin()
        }, 5)
        this.logoutFunc = this.logoutFunc.bind(this);
        this.handleToggle = this.handleToggle.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }

    handleToggle() {
        debugger
        this.setState({ open: !this.state.open })
    }

    handleClose() {
        debugger

        this.setState({ open: true })
    }


    _flag = true;
    componentWillReceiveProps() {
        setTimeout(() => {
            if (!this.props.isAuthenticated && this._flag && this.props.location.pathname != "/signup") {
                this._flag = false;
                browserHistory.push('/');
            } else if (this.props.isAuthenticated && !this._flag) {
                this._flag = true;
            }
        }, 5);

    }
    logoutFunc() {

        if (this.props.activeUser.fbuser) {
            localStorage.removeItem('react-localStorage-user');
            browserHistory.push('/')
        }
        this.props.logout();


    }

    onClickDiv = (column) => {

        if (column == "user") {

            browserHistory.push('/user')

        } else if (column == "complaints") {

            browserHistory.push('/complaints')

        } else if (column == "missing") {

            browserHistory.push('/missing')

        } else if (column == "fileReports") {

            browserHistory.push('/fileReports')

        } else if (column == "crimes") {

            browserHistory.push('/crimes')
        }
        this.setState({ open: false })

    }

    render() {

        const css = `
      .app-bar{
    -moz-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    left: 0;
    width: auto !important;
    right: 0 !important;
    position: fixed !important;
}

.app-content{
    -moz-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    padding-top: 64px !important;
}

.app-bar.expanded{
    left: 255px;
}

.app-content.expanded{
    padding-left: 255px;
}
.app-root{
    -moz-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -o-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
    left: 0;
    width: auto !important;
    right: 0 !important;
    position: fixed !important;
}

.app-root.expanded{
    left: 255px;
}

 .navigation-container {
      margin: auto;
}

.navigation-logo {
      cursor: pointer;
      font-size: 22;
      color: white;
      font-weight: light;
      background-color: #00BCD4;
      padding-left: 40px;
      height: 64px;
    }
.navigation-avatar-div {
        padding: 15px 0 20px 15px;
        background-image:  url('../../images/menu-bg.png');
        height: 60px;
      }
.navigation-icon {
        float: left;
        display: block;
        margin-right: 15px;
        box-shadow: 0px 0px 0px 8px rgba(0,0,0,0.2);
      }
.navigation-span {
        padding-top: 12px;
        display: block;
        color: white;
        font-weight: 300px;
        text-shadow: 1px 1px #444;
      }

.navigation-menuItem {
      color: white;
      font-size: 14px
}      
.bigAvatar: {
    width: 50,
    height: 50,
  }
  .bigAvatar2: {
    width: 100,
    height: 100,
  }

 `
        const pic = <Avatar src={this.props.activeUser.photoURL ? this.props.activeUser.photoURL : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500"} className="bigAvatar2" />
        const mainMenu = (
            <div >
                {/*<FlatButton*/}
                {/*label='Complaint Reports'*/}
                {/*style={buttonStyle}*/}
                {/*onClick={() => browserHistory.push('/')}*/}
                {/*/>*/}
                {/*<FlatButton*/}
                {/*label='Crime Reports'*/}
                {/*style={buttonStyle}*/}
                {/*onClick={() => browserHistory.push('/')}*/}
                {/*/>*/}

                <FlatButton
                    label='Sign Up'
                    style={buttonStyle}
                    onClick={() => browserHistory.push('/signup')}
                />
                <FlatButton
                    label='Login'
                    style={buttonStyle}
                    onClick={() => browserHistory.push('/login')}
                />
            </div>
        )

        const rightMenu = this.props.isAuthenticated ? (
            <div style={{ paddingRight: "30px", marginTop: "-10px" }}>


                <IconMenu
                    iconButtonElement={<IconButton>
                        <Avatar src={this.props.activeUser.photoURL ? this.props.activeUser.photoURL : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500"} className="bigAvatar" /></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <div>
                        <CardHeader
                            title={`${this.props.activeUser.fname} ${this.props.activeUser.lname}`}
                            titleStyle={{ fontSize: "15px", fontWeight: "bold" }}
                            subtitleStyle={{ marginTop: "8px" }}
                            subtitle={this.props.activeUser.eml}
                            avatar={pic}

                        />

                        {/*<p style={{color: "#ff4081"}}>Admin</p>*/}
                        <Divider />
                        <RaisedButton label="Logout" primary={true} onClick={this.logoutFunc} style={{ margin: "12px" }} />

                        {/*<RaisedButton label="Profile" secondary={true} onClick={this.logoutFunc} style={{ margin: "12px" }} />*/}
                    </div>



                </IconMenu>
                {/*<FlatButton
                        label='LogOut'
                        style={buttonStyle}
                        onClick={this.logoutFunc}
                    />*/}
            </div>
        ) : mainMenu


        /* return (
         <AppBar
         title={
         <Link to='/' style={buttonStyle}>
         iq
         </Link>
         }
         className='Navbar'
         iconElementRight={mainMenu}
         />
         )*/

        const sideMenu = (this.props.isAuthenticated && this.state.open && this.props.activeUser.type == "reporter") ? (

            <Drawer
                docked={true}
                open={this.state.open}
                onRequestChange={(open) => this.setState({ open })}
            >
                <MenuIcons onClick={this.handleToggle} style={{ cursor: "pointer", marginLeft: '20px', marginBottom: "30px" }} />
                <img style={{ height: "10vh", marginTop: "10px", marginLeft: "25px" }} src={'https://i.ibb.co/LdLnnmJ/logo.png'} />

                <List style={{ marginTop: "25px" }}>

                    <ListItem primaryText="My Reports" onClick={() => this.onClickDiv('user')} leftIcon={<ContentSend />} />
                    <ListItem primaryText="Crimes" onClick={() => this.onClickDiv('crimes')} leftIcon={<Fingerprint />} />
                    <ListItem primaryText="Complaints" onClick={() => this.onClickDiv('complaints')} leftIcon={<RecordVoiceOver />} />
                    <ListItem primaryText="Missing" onClick={() => this.onClickDiv('missing')} leftIcon={<Face />} />
                    <ListItem primaryText="File Report" onClick={() => this.onClickDiv('fileReports')} leftIcon={<Feedback />} />

                </List>

            </Drawer>

        ) :
            <Drawer
                docked={true}
                open={this.state.open}
                onRequestChange={(open) => this.setState({ open })} >

                <MenuIcons onClick={this.handleToggle} style={{ cursor: "pointer", marginLeft: '20px', marginBottom: "30px" }} />
                <img style={{ height: "10vh", marginTop: "10px", marginLeft: "25px" }} src="https://i.ibb.co/LdLnnmJ/logo.png" />


            </Drawer>
        return (
            <div>

                <style>
                    {css}
                </style>

                <AppBar
                    className={`app-bar  ${(this.state.open && this.props.isAuthenticated ? ' expanded' : '')}`}
                    title="Crime management system"
                    showMenuIconButton={this.props.isAuthenticated && !this.state.open}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementRight={rightMenu}
                />
                {sideMenu}
                {<div className={`app-content  ${(this.state.open ? ' expanded' : '')}`}> {this.props.children} </div>}
                {/* {this.props.children}*/}
            </div>


        )

    }
}
function mapStateToProps(state) {
    console.log(state.auth)
    return {
        isAuthenticated: state.auth['isAuthenticated'],
        activeUser: state.auth['activeUser'],
    };
}

// for call isLoggedin
function mapDispatchToProps(dispatch) {
    return {
        isLoggedin: () => dispatch(AuthActions.isLoggedin()),
        logout: () => dispatch(AuthActions.logout())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
