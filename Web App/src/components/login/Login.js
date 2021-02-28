import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const buttonStyle = {
    width: '30%',
    minWidth: '192px',
    marginTop: '1.5rem',
    textAlign: 'center',
    color: 'blue'
}
const LoginFormStyle = {
    display: 'flex',
    msFlexDirection: 'column',
    flexDirection: 'column',
    msFlexAlign: 'center',
    alignItems: 'center',
    padding: '16px', margin: '0px'
}
const fieldStyle = { width: '80%' }


export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {
                eml: null,
                pwd: null,
            }
        }

        this.handlerInput = this.handlerInput.bind(this);
    }

    handlerInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div style={LoginFormStyle} className='LoginForm'>
                <TextField
                    floatingLabelText='Email'
                    name="email"
                    errorText={this.state.errors.eml}
                    style={fieldStyle}
                    onChange={this.handlerInput}
                />
                <TextField
                    floatingLabelText='Password'
                    name='password'
                    type='password'
                    errorText={this.state.errors.pwd}
                    style={fieldStyle}
                    onChange={this.handlerInput}
                />
                <div className='LoginForm-Submit'>
                    <RaisedButton
                        label='Login'
                        primary
                        type='submit'
                        style={buttonStyle}
                        onClick={() => {
                            const { email, password, cuid, fname, lname, errors } = this.state
                            if (!email || !password) {
                                if (!email) errors.eml = 'Email is Required'
                                if (!password) errors.pwd = 'Password is Required'
                                return this.setState({ errors })

                            }
                            this.setState({
                                errors: {
                                    eml: null,
                                    pwd: null,
                                }
                            })
                            this.props.click(this.state)
                        }}
                    />
                </div>
                <br />
            </div>
        )
    }
}