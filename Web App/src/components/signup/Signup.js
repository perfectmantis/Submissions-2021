import React, { Component, PropTypes } from 'react'

import { Link } from "react-router";
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const buttonStyle = {    width: '30%',
    minWidth: '192px',
    marginTop: '1.5rem',
    textAlign: 'center',
    color: 'blue'   }

const LoginFormStyle = {
    display: 'flex',
    msFlexDirection: 'column',
    flexDirection: 'column',
    msFlexAlign: 'center',
    alignItems: 'center',
    padding: '16px',margin:'0px'
}

const fieldStyle = { width: '80%' }

class SignupComponent extends Component{

    constructor() {
        super();
        this.state = {
            userId: "",
            fname: "",
            lname: "",
            eml: "",
            pwd: "",
             errors: {
            userId: null,
            fname: null,
            lname: null,
            eml: null,
            pwd: null, }
        };

        this._onSubmit = this._onSubmit.bind(this);
        this.handlerInput = this.handlerInput.bind(this);

        // setTimeout(() => {
        //     console.log('this.props.authenticUser ', this.props.authenticUser);
        // }, 5000)
    }

    handlerInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _onSubmit(e) {

        e.preventDefault();
        console.log(this.state)
       const { eml, pwd,userId,fname, lname,errors } = this.state

      if (!eml || !pwd || !userId|| !fname|| !lname) {
        if (!eml) errors.eml = 'Email is Required'
        if (!pwd) errors.pwd = 'Password is Required'
        if (!userId) errors.cuid = 'User ID is Required'
        if (!fname) errors.fname = 'First Name is Required'
        if (!lname) errors.lname = 'Last Name is Required'
        return this.setState({ errors })
      }

      this.setState({ errors: { 
           cuid: null,
            fname: null,
            lname: null,
            eml: null,
            pwd: null,}})
      this.props.click(this.state);


    }

    render() {
        return (
            
            <form style={LoginFormStyle} className='LoginForm'  onSubmit={this._onSubmit}>

                <TextField
                    hintText='User ID'
                    name="userId"
                    floatingLabelText='User ID'
                    onChange={this.handlerInput}
                     errorText={this.state.errors.userId}
                    style={fieldStyle}/>
                <TextField
                    hintText='First Name'
                    name="fname"
                    floatingLabelText='First Name'
                     errorText={this.state.errors.fname}
                    onChange={this.handlerInput}
                    style={fieldStyle}/>
                <TextField
                    hintText='Last Name'
                    name="lname"
                    floatingLabelText='Last Name'
                     errorText={this.state.errors.lname}
                    onChange={this.handlerInput}
                    style={fieldStyle}/>

                <TextField
                    hintText='Email'
                    name="eml"
                    floatingLabelText='Email'
                    onChange={this.handlerInput}
                     errorText={this.state.errors.eml}
                    style={fieldStyle}
                />
                <TextField
                    hintText='password'
                    name="pwd"
                    floatingLabelText='Password'
                    onChange={this.handlerInput}
                     errorText={this.state.errors.pwd}
                    style={fieldStyle}
                    type='password'
                />
                <div className='LoginForm-Submit'>
                    <RaisedButton
                        label='Sign Up'
                        primary
                        type='submit'
                        style={buttonStyle}
                    />
                </div>

            </form>
        )
    }
}

export default SignupComponent;