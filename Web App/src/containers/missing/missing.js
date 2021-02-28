
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


class Missing extends Component {

    showList1(obj) {
        return (obj) ? Object.keys(obj) : [];
    }

    render() {
        let crimeArray = this.showList1(this.props.missings).map((val, indx) => {
            return <Card key={indx} style={{ width: '300px', marginBottom: '30px', marginLeft: '5px', marginRight: '30px' }}>
                <CardMedia>
                    <img src={"data:image/jpeg;base64,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"} style={{ height: "35vh" }} />
                </CardMedia>
                <CardHeader
                    title={this.props.missings[val].role}
                    subtitle={`Reported by ${this.props.activeUser.fname} ${this.props.activeUser.lname}`}
                    avatar={this.props.activeUser.photoURL ? this.props.activeUser.photoURL : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500"}
                />
                <CardText color="rgba(62, 62, 62, 0.87)" style={{ padding: "0 0px 9px 18px", fontSize: "11px" }}>
                    {this.props.missings[val].details}
                </CardText>
                <Divider />
                {
                    this.props.missings[val].adminStatus == "Case In progress" ? (
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
                <h2 style={styles.headline}> Missing Reports </h2>
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
        missings: state.ReportsReducer['missings']

    };
}

export default connect(mapStateToProps, null)(Missing);