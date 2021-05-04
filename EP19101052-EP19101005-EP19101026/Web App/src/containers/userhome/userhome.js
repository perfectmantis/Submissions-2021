
import React, { Component, PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar'
import moment from 'moment'
import Fingerprint from 'material-ui/svg-icons/communication/location-on';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign:"center"
  }}

 class Userhome extends Component {

    constructor() {
        super();
        this.state = {
             open: true
        }
    }
     showList1(obj) {
         return (obj) ? Object.keys(obj) : [];
     }

    render () {
        return (
        <div>
<h2 style={styles.headline}> Welcome {`${this.props.activeUser.fname} ${this.props.activeUser.lname}`} To Crime Management System </h2>
  {/*<img style={{ height: "7vh", marginTop: "10px",  }} src="http://orig10.deviantart.net/a871/f/2015/353/6/5/crime_scene_tape_by_mrangrydog-d9kqd8a.png" />*/}

                <Card style={{margin:'20px',paddingBottom:'10px'}}>
                        <CardHeader
                            title="View Reports"
                            style={{marginLeft:'20px'}}
                        />
                    {
                        this.showList1(this.props.userReports).map((val, indx) => {
                            return<Card key={indx} style={{margin:'30px',marginBottom:'10px'}}>

                                <CardHeader
                                    title={this.props.userReports[val].role}
                                    subtitle={`Reported by ${this.props.userReports[val].userName}`}
                                    avatar={this.props.userReports[val].userImage}
                                    style={{display:"inline-flex"}}
                                />
                                <div style={{display:"inline-flex",float:"right",fontSize:"smaller",margin:"15px",color:"grey"}}>{moment(this.props.userReports[val].dated).fromNow()}</div>
                                <CardText>

                                   <Fingerprint /> {this.props.userReports[val].city}
                                    <br/>
                                    <br/>
                                     {this.props.userReports[val].details}
                                     <br/>
                                </CardText>

                            </Card>

                        })
                    }
                    </Card>



     <Snackbar
          open={this.state.open}
          message="Welcome to Crime Report"
          autoHideDuration={4000}
        />
            </div>
      

        )
    }
}


function mapStateToProps(state) {
   
    return {
        activeUser: state.auth['activeUser'],
        userReports: state.ReportsReducer['userReports']
    };
}

export default connect(mapStateToProps,null)(Userhome);