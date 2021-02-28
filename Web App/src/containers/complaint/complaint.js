
import React, { Component } from 'react'
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
        textAlign: "center"
    }
}

class Complaint extends Component {

    showList1(obj) {
        return (obj) ? Object.keys(obj) : [];
    }


    render() {

        let crimeArray = this.showList1(this.props.complaints).map((val, indx) => {

            return <Card key={indx} style={{ width: '300px', marginBottom: '30px', marginLeft: '5px', marginRight: '30px' }}>
                <CardMedia>
                    <img src={'https://i.pinimg.com/originals/5a/cc/4b/5acc4b36bd558c9da8a103fc9df78e45.png'} style={{ height: "35vh" }} />
                </CardMedia>
                <CardHeader
                    title={this.props.complaints[val].role}
                    subtitle={`Reported by ${this.props.activeUser.fname} ${this.props.activeUser.lname}`}
                    avatar={this.props.activeUser.photoURL ? this.props.activeUser.photoURL : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500"}
                />
                <CardText color="rgba(62, 62, 62, 0.87)" style={{ padding: "0 0px 9px 18px", fontSize: "11px" }}>
                    {this.props.complaints[val].details}
                </CardText>
                <Divider />
                {
                    this.props.complaints[val].adminStatus == "Case In progress" ? (
                        <RaisedButton
                            label='Case On Pending'
                            secondary={true}
                            fullWidth={true}
                        />

                    ) : <RaisedButton
                        label='Case Approved'
                        primary={true}
                        fullWidth={true}
                    />

                }
            </Card>
        })

        return (
            <div>
                <h2 style={styles.headline}> Complaint Reports </h2>
                {
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '20px' }}>


                        {crimeArray}
                    </div>

                }
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        activeUser: state.auth['activeUser'],
        complaints: state.ReportsReducer['complaints'],
    };
}

export default connect(mapStateToProps, null)(Complaint);