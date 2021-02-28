import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import Image1 from '../assets/images/logo.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import globals from '../utils/globals';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions';
import { KeyboardAvoidingView } from 'react-native';

const MontserratBold = Platform.OS == "android" ? "Montserrat-Bold" : "Montserrat-Bold";

class ForgotPassword extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    onSubmit = () => {
        const { email } = this.state;
        const navigation = this.props.navigation;
        this.props.forgotPassword(email, navigation);
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={{ width: "90%", alignItems: "center", }}>
                    <Image
                        source={Image1}
                        resizeMode="contain"
                        style={{ height: 70, marginBottom: 10 }}
                    />
                    <Text style={{
                        fontFamily: MontserratBold,
                        fontSize: 18,
                        color: '#fff'
                    }}>Forget Password</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
                    <View style={styles.textFieldContainer}>
                        <TextInput
                            ref={(input) => {
                                this.emailTextInput = input;
                            }}
                            style={{
                                height: 40,
                                width: '100%',
                                backgroundColor: '#fff',
                                color: '#000',
                                borderRadius: 3,
                                paddingLeft: 10,
                                fontFamily: 'Montserrat-Regular'
                            }}
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                            underlineColorAndroid="transparent"
                            selectionColor={globals.COLOR.LIGHT_GREY_TEXT}
                            placeholder="Email"
                            placeholderTextColor={globals.COLOR.LIGHT_GREY_TEXT}
                            autoCapitalize={'none'}
                            returnKeyType={'next'}
                            textContentType={'emailAddress'}
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                                this.onSubmit();
                            }}
                        />
                    </View>
                    <View style={styles.signinBtnViewStyle}>
                        <Button
                            onPress={() => {
                                this.onSubmit();
                            }}
                            titleStyle={{ color: '#fff', fontFamily: 'Montserrat-Regular' }}
                            containerStyle={{ width: '100%', marginLeft: 0 }}
                            buttonStyle={{ borderColor: '#20E2F1', backgroundColor: this.state.Email ? "#20E2F1" : "transparent", borderWidth: 1 }}
                            title="RESET"
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B1B41',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    textFieldContainer: {
        width: '80%',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        borderColor: "#CECECE"
    },
    signinBtnViewStyle: {
        width: '80%',
        marginTop: 10
    },
});


const mapStateToProps = ({ auth }) => {
    const { loading } = auth;
    return { loading };
};

export default connect(mapStateToProps, {
    forgotPassword,
})(ForgotPassword)
