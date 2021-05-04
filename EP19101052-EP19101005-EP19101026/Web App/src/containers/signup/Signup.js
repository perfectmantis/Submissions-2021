import React, { Component } from 'react'
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import AuthActions from "../../stores/action/auth";
import Paper from 'material-ui/Paper'
import SignupComponent from '../../components/signup/Signup';


class Signup extends Component {

    constructor() {
        super();
        this.handleSignup = this.handleSignup.bind(this);
    }

    _flag = true;
    componentWillReceiveProps() {
        setTimeout(() => {
            if (this.props.isRegistered && this._flag) {
                this._flag = false;
                browserHistory.push('/login');
            } else if (!this.props.isRegistered && !this._flag) {
                this._flag = true;
            }
        }, 5);
    }


    handleSignup(state) {
        this.props.signup(state);

    }

    render() {
        return (
            <div className='Login' style={{ marginLeft: '340px', marginTop: '67px', width: '50%' }}>
                <Paper className='Login-Panel'>
                    <SignupComponent click={this.handleSignup} authenticUser={this.props.activeUser} />
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isRegistered: state.auth['isRegistered'],
        activeUser: state.auth['activeUser']
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (data) => dispatch(AuthActions.signup(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);