import React, { Component } from 'react'
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import AuthActions from "../../stores/action/auth";
import Paper from 'material-ui/Paper'
// Components
import LoginComponent from '../../components/login/Login';

class Login extends Component {




  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this)
    this.handlefbLogin = this.handlefbLogin.bind(this)
  }

  _flag2 = true;
  handleLogin(state) {
    this._flag2 = false;
    this.props.login(state);
  }

  handlefbLogin() {
    this._flag2 = false;
    this.props.fblogin();
  }

  _flag = true;
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.isAuthenticated && this._flag && this.props.activeUser.type == "reporter") {
        this._flag = false;
        browserHistory.push('/user');
      } else if (this.props.isAuthenticated && this._flag && this.props.activeUser.type == "admin") {
        this._flag = false;
        browserHistory.push('/admin');
      }
      else if (!this.props.isAuthenticated && !this._flag) {
        this._flag = true;
      }
    }, 10);
  }

  render() {

    return (
      <div>
        <div style={{ marginLeft: '340px', marginTop: '67px', width: '50%' }}>
          <Paper>
            <LoginComponent click={this.handleLogin} click2={this.handlefbLogin} />
          </Paper>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth['isAuthenticated'],
    activeUser: state.auth['activeUser'],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(AuthActions.login(data)),
    fblogin: () => dispatch(AuthActions.fblogin())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)