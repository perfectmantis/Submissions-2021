import React, { Component, Fragment } from 'react';
import {
	StyleSheet,
	Image,
	ActivityIndicator,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	StatusBar
} from 'react-native';
import { Button } from 'react-native-elements';
import globals from '../utils/globals';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import logo from '../assets/images/logo.png';

class LoginComponent extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = { password: '', email: '', loading: false, invalidEmail: false, showPass: false };
	}


	login = () => {
		const { email, password } = this.state;
		const navigation = this.props.navigation;
		this.props.loginUser(email, password, navigation);
	}
	checkEmail() {
		let me = this
		const { email } = me.state;
		const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/
		if (regex.test(email)) {
			if (email != '') {
				this.setState({ invalidEmail: false })
			} else {
				me.setState({ email: '' })
			}
		} else {
			// alert("invalid email")
			me.setState({ email: '', invalidEmail: true })
		}
	}
	checkPass() {
		let me = this;
		const { Pass } = this.state;
		const regex = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
		if (regex.test(Pass)) {
			if (Pass != '') {
				this.setState({ invalidPass: false })
			} else {
				me.setState({ Pass: '' })
			}
		} else {
			me.setState({ invalidPass: true })
		}
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={this._keyboardDidHide}>
				<View style={styles.container}>
					<StatusBar backgroundColor={'white'} barStyle="dark-content" translucent />
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
										marginTop: 100,
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
											title="Login"
											titleStyle={{ color: '#fff', fontFamily: 'Montserrat-Regular' }}
											containerStyle={{ width: '100%', marginLeft: 0 }}
											disabled={!this.state.email || !this.state.password}
											buttonStyle={{ borderColor: '#20E2F1', backgroundColor: this.state.email && this.state.password ? "#20E2F1" : "transparent", borderWidth: 1 }}
											onPress={() => {
												this.login()
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
									this.props.navigation.navigate('ForgetPassword');
								}}
							><Text style={[styles.buttonText, { color: '#fff', marginTop: 20, fontFamily: 'Montserrat-Regular' }]}>Forgot Password?</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.navigate('Signup');
								}}
							>
								<Text style={[styles.buttonText, { color: '#20E2F1', fontSize: 13, marginTop: 10, fontFamily: 'Montserrat-Regular' }]}>
									Register
						</Text>
							</TouchableOpacity>
						</View>}
				</View>
			</TouchableWithoutFeedback>
		);
	}
};

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
	const { loading, user, newUser } = auth;
	return { loading, user, newUser };
};

export default connect(mapStateToProps, {
	loginUser,
})(LoginComponent);

