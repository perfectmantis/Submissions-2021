import React, { Component, PropTypes } from 'react'


export default class User extends Component {


    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
