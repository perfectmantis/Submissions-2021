import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Keyboard,
    Image,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements'
import globals from '../utils/globals';
import { connect } from 'react-redux';
import { signupUser } from '../actions';
import logo from '../assets/images/logo.png';

class SignupView extends React.Component {
    static navigationOptions = {
        title: "",
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            userId: '',
            keyboardIsShowing: null,
            loading: false,
        }

        this._keyboardWillHide = this._keyboardWillHide.bind(this)
        this._keyboardWillShow = this._keyboardWillShow.bind(this)
    }



    componentWillMount() {
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)

    }

    componentWillUnmount() {
        this.keyboardWillHideListener.remove()
        this.keyboardWillShowListener.remove()
    }

    _keyboardWillHide() {
        Keyboard.dismiss()
        this.setState({ keyboardIsShowing: false })
    }

    _keyboardWillShow() {
        this.setState({ keyboardIsShowing: true })
    }

    validateEmail(text) {
        this.setState({ email: text, validEmail: text })
    }

    // signUpUser() {
    //    this.props.navigation.navigate("Login")
    // }
    signUpUser = () => {
        const {
            firstname,
            lastname,
            username,
            email,
            password,
            confirmPassword,
            userId
        } = this.state;
        let values = {
            firstname,
            lastname,
            username,
            email,
            password,
            confirmPassword,
            userId
        }
        const navigation = this.props.navigation;
        this.props.signupUser(values, navigation)
    }
    render() {
        if (this.state.loading)
            return (
                <View style={localStyles.loader} >
                    <ActivityIndicator size="large" color="#20E2F1" />
                </View>
            );
        return (
            <TouchableWithoutFeedback onPress={this._keyboardDidHide}>
                <View style={styles.container}>
                    <Image resizeMode="contain" style={{ width: '70%', height: 100 }} source={logo} />
                    {this.state.loading ?

                        <View style={styles.loader} >
                            <ActivityIndicator size="large" color="#20E2F1" />
                        </View>
                        :
                        <View style={{ width: '100%', alignItems: 'center' }}>

                            <View style={styles.textFieldContainer}>
                                <TextInput
                                    ref={(input) => {
                                        this.emailTextInput = input;
                                    }}
                                    style={{
                                        height: 40,
                                        width: '100%',
                                        marginTop: 50,
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        borderRadius: 3,
                                        paddingLeft: 10,
                                        fontFamily: 'Montserrat-Regular'
                                    }}
                                    onChangeText={(text) => this.setState({ userId: text })}
                                    value={this.state.userId}
                                    underlineColorAndroid="transparent"
                                    selectionColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    placeholder="User Id"
                                    placeholderTextColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    textContentType={'givenName'}
                                    blurOnSubmit={false}
                                />
                            </View>
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
                                    onChangeText={(text) => this.setState({ firstname: text })}
                                    value={this.state.firstname}
                                    underlineColorAndroid="transparent"
                                    selectionColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    placeholder="First Name"
                                    placeholderTextColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    textContentType={'givenName'}
                                    blurOnSubmit={false}
                                />
                            </View>
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
                                    onChangeText={(text) => this.setState({ lastname: text })}
                                    value={this.state.lastname}
                                    underlineColorAndroid="transparent"
                                    selectionColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    placeholder="Last Name"
                                    placeholderTextColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    textContentType={'givenName'}
                                    blurOnSubmit={false}

                                />
                            </View>
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
                                        this.passwordTextInput.focus();
                                    }}
                                />
                            </View>
                            <View style={styles.textFieldContainer}>
                                <TextInput
                                    ref={(input) => {
                                        this.passwordTextInput = input;
                                    }}
                                    style={{ height: 40, backgroundColor: '#fff', borderRadius: 3, color: '#000', paddingLeft: 10, fontFamily: 'Montserrat-Regular' }}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    value={this.state.password}
                                    underlineColorAndroid="transparent"
                                    selectionColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    placeholder="Password"
                                    placeholderTextColor={globals.COLOR.LIGHT_GREY_TEXT}
                                    secureTextEntry={true}
                                    autoCapitalize={'none'}
                                    returnKeyType={'done'}
                                    textContentType={'password'}
                                    onSubmitEditing={() => {
                                        this.props.navigation.navigate('Home');
                                    }}
                                />
                            </View>
                            <View style={styles.textFieldContainer}>
                                {
                                    this.props.loading ?
                                        <Button
                                            title=""
                                            icon={<ActivityIndicator color={"#fff"} />}
                                            titleStyle={{ color: '#fff', fontFamily: 'Montserrat-Regular' }}
                                            containerStyle={{ width: '100%', marginLeft: 0 }}
                                            buttonStyle={{ borderColor: '#20E2F1', backgroundColor: this.state.email && this.state.password ? "#20E2F1" : "transparent", borderWidth: 1 }}
                                        />
                                        :
                                        <Button
                                            title="Sign Up"
                                            titleStyle={{ color: '#fff', fontFamily: 'Montserrat-Regular' }}
                                            containerStyle={{ width: '100%', marginLeft: 0 }}
                                            disabled={!this.state.email || !this.state.password}
                                            buttonStyle={{ borderColor: '#20E2F1', backgroundColor: this.state.email && this.state.password ? "#20E2F1" : "transparent", borderWidth: 1 }}
                                            onPress={() => {
                                                this.signUpUser()
                                            }}
                                        />
                                }
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    flexDirection: 'row',
                                    width: '100%',
                                    position: 'absolute',
                                    bottom: 0
                                }}
                            >
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Login');
                                }}
                            >
                                <Text style={[styles.buttonText, { color: '#20E2F1', fontSize: 13, marginTop: 10, fontFamily: 'Montserrat-Regular' }]}>
                                    Already have an account?
						</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B1B41'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainInput: {
        height: 40,
        borderColor: 'gray',
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 12
    },
    horizontalBar: {
        width: '100%',
        height: 1,
        backgroundColor: globals.COLOR.LIGHT_GREY
    },
    optionLabel: {
        flex: 1,
        marginLeft: 20,
        color: 'black',
        fontSize: 12,
        fontWeight: '600'
    },
    textFieldContainer: {
        width: '80%',
        marginTop: 10
    }
});


const mapStateToProps = ({ auth }) => {
    const { loading } = auth;
    return { loading };
};

export default connect(mapStateToProps, {
    signupUser,
})(SignupView)