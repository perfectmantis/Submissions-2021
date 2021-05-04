import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getUser, getCrime, getMissing, getComplaint } from '../../actions';
import { connect } from 'react-redux';

class AuthLoadingScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('userUID')
        if (token) {
            this.props.getUser(token)
            this.props.getCrime(token)
            this.props.getMissing(token)
            this.props.getComplaint(token)
            this.props.navigation.navigate("Main")
        } else {
            this.props.navigation.navigate('onBoardingScreen');
        }
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color="#20E2F1" />
            </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { loading, user, newUser } = auth;
    return { loading, user, newUser };
};
export default connect(mapStateToProps, {
    getUser,
    getCrime,
    getComplaint,
    getMissing
})(AuthLoadingScreen)
