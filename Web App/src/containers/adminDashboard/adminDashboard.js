
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux';


import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ContentInbox from 'material-ui/svg-icons/action/search'
import AuthActions from "../../stores/action/auth";

import { Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { white, grey800 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import Face from 'material-ui/svg-icons/action/face';
import Assessment from 'material-ui/svg-icons/action/assessment';
import { LineChart, AreaChart, ColumnChart, BarChart } from 'react-chartkick'
import 'chart.js'
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar'
import moment from 'moment'
import Fingerprint2 from 'material-ui/svg-icons/communication/location-on';
// styles 

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign: "center"
  },
  tab: {
    padding: '2px 34px',
    width: '140px',
    height: '72px',
    color: '#4b4b4b'
  },
  show: {
    height: 600,
  },
  hide: {
    display: "none"
  },
  paper: {
    minWidth: 270,
    maxWidth: 270,
  },
  content: {
    padding: '5px 10px',
    marginLeft: 90,
    height: 80
  },
  number: {
    display: 'block',
    fontWeight: typography.fontWeightMedium,
    fontSize: 18,
    color: grey800
  },
  text: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: grey800
  },
  iconSpan: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: cyan600
  }, iconSpan2: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: pink600
  }, iconSpan3: {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: purple600
  },
  icon: {
    height: 48,
    width: 48,
    marginTop: 20,
    maxWidth: '100%'

  },
  crimeSummaryContainer: {
    paddingLeft: 10,
    height: 'auto',
    // margin: 'auto',
    marginBottom: 20
  },
  infoBoxDiv: {
    float: "left",
    margin: 10
  },
  clear: {
    clear: 'both'
  }
};



class Adminhome extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      crime: "crime",
      filteredList: [],
      searchText: ''
    }
    this.approved = this.approved.bind(this)
    this.rejected = this.rejected.bind(this)
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    });

  };

  showList1(obj) {
    return (obj) ? Object.keys(obj) : [];

  }

  approved(obj) {
    this.props.updateReports(obj)
  }

  rejected(obj) {
    this.props.deleteReports(obj)
    this.handleTouchTap()
  }
  handleShowChartCrime(value) {
    this.setState({
      crime: value
    });

  }
  handleShowChartComplaints(e) {
    this.setState({
      crime: "Complaint"
    });

  }
  handleShowChartMissing(e) {
    this.setState({
      crime: "Missing"
    });

  }

  filtered = (value) => {
    if (value) {
      const re = new RegExp(value, 'i');
      var allReports = Object.keys(this.props.reports).map((k) => this.props.reports[k]);
      var filtered = allReports.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.match(re)));
      this.setState({ filteredList: filtered })
    } else {
      this.setState({ filteredList: allReports })
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.reports) {
      var allReports = Object.keys(nextprops.reports).map((k) => nextprops.reports[k]);
      this.setState({
        filteredList: allReports
      })
    }
  }

  componentDidMount() {
    var allReports = Object.keys(this.props.reports).map((k) => this.props.reports[k]);
    this.setState({
      filteredList: allReports
    })
  }

  sorted = (allItems) => {
    return allItems.sort((a, b) => moment(b.dated) - moment(a.dated));
  }

  render() {

    const { crime } = this.state
    var allReports = Object.keys(this.props.reports).map((k) => this.props.reports[k]);
    var missingCounter = 0;
    var crimeCounter = 0;
    var complaintCounter = 0;
    var dated = 0;
    allReports.filter((rep, ind) => {
      if (rep.role == 'Missing') {
        missingCounter += 1;
      } else if (rep.role == 'Crime') {
        crimeCounter += 1;
        dated += rep.dated
      } else if (rep.role == 'Complaint') {
        complaintCounter += 1;
      }
    })
    return (
      <div>

        <Tabs inkBarStyle={{ backgroundColor: "none", color: 'none' }}>
          <Tab style={{ backgroundColor: "white" }} >
            <div>
              <h2 style={styles.headline}> Welcome Admin To Crime Reports </h2>
              <Card style={{ margin: '20px', paddingBottom: '20px' }}>
                <CardHeader
                  title="All Users Reports"
                  style={{ marginLeft: '20px' }}
                />

                <div style={styles.crimeSummaryContainer}>
                  <div onClick={(e) => { this.handleShowChartCrime("crime"); }} style={styles.infoBoxDiv}>
                    <Paper style={styles.paper}>
                      <span style={styles.iconSpan}>
                        <Fingerprint color={white}
                          style={styles.icon}
                        />
                      </span>

                      <div style={styles.content}>
                        <span style={styles.text}>Crimes</span>
                        <span style={styles.number}>{crimeCounter}</span>
                      </div>

                    </Paper>
                  </div>
                  <div onClick={(e) => { this.handleShowChartCrime('Complaint'); }} style={styles.infoBoxDiv}>
                    <Paper style={styles.paper}>
                      <span style={styles.iconSpan2}>
                        <RecordVoiceOver color={white}
                          style={styles.icon}
                        />
                      </span>

                      <div style={styles.content}>
                        <span style={styles.text}>Complaints</span>
                        <span style={styles.number}>{complaintCounter}</span>
                      </div>
                    </Paper>
                  </div>
                  <div onClick={(e) => { this.handleShowChartCrime('Missing'); }} style={styles.infoBoxDiv}>
                    <Paper style={styles.paper}>
                      <span style={styles.iconSpan3}>
                        <Face color={white}
                          style={styles.icon}
                        />
                      </span>

                      <div style={styles.content}>
                        <span style={styles.text}>Missings</span>
                        <span style={styles.number}>{missingCounter}</span>
                      </div>
                    </Paper>
                  </div>

                </div>
                <div style={crime === 'crime' ? styles.show : styles.hide}>
                  <ColumnChart colors={["#C7E5F9", "#30AAFC"]} data={[["Crime", crimeCounter], ["Complaints", complaintCounter], ["Missing", missingCounter]]} />
                </div>
                <div style={crime === 'Complaint' ? styles.show : styles.hide}>
                  <AreaChart colors={["#C7E5F9", "#30AAFC"]} data={[["Crime", crimeCounter], ["Complaints", complaintCounter], ["Missing", missingCounter]]} />
                </div>
                <div style={crime === 'Missing' ? styles.show : styles.hide}>
                  <BarChart colors={["#C7E5F9", "#30AAFC"]} data={[["Crime", crimeCounter], ["Complaints", complaintCounter], ["Missing", missingCounter]]} />
                </div>
                <div style={styles.clear} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                  <TextField
                    style={{ margin: '30px', marginBottom: '10px', width: '100%' }}
                    hintText="Search..."
                    onChange={(e) => this.filtered(e.target.value)}

                  />
                </div>

                {
                  this.sorted(this.state.filteredList).map((val, indx) => {
                    return <Card key={indx} style={{ margin: '30px', marginBottom: '10px' }}>
                      <CardHeader
                        title={val.role}
                        subtitle={`Reported by ${val.userName}`}
                        avatar={val.userImage}
                        style={{ display: "inline-flex" }}
                      />
                      <div style={{ display: "inline-flex", float: "right", fontSize: "smaller", margin: "15px", color: "grey" }}>{moment(val.dated).fromNow()}</div>
                      <CardText>

                        <Fingerprint2 /> {val.city}
                        <br />
                        <br />
                        {val.details}

                      </CardText>
                      <CardActions>
                        <RaisedButton label="Approve" disabled={val.adminStatus == "Case Approved"} primary={true} onClick={() => this.approved(val)} />
                        <RaisedButton label="Reject" secondary={true} onClick={() => this.rejected(val)} />
                      </CardActions>
                    </Card>
                  })
                }
              </Card>

            </div>
          </Tab>
        </Tabs>

        <Snackbar
          open={this.state.open}
          message="Case has been Successfully Removed"
          autoHideDuration={4000}
        />

      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteReports: (data) => dispatch(AuthActions.deleteReports(data)),
    updateReports: (data) => dispatch(AuthActions.updateReports(data))
  };
}
function mapStateToProps(state) {

  return {
    activeUser: state.auth['activeUser'],
    reports: state.ReportsReducer['reports'],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Adminhome);