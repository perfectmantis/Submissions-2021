import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, ScrollView, Image, AsyncStorage } from 'react-native';
import globals from '../utils/globals';
import { Icon } from 'react-native-elements';
import { removeUserFromState, getUser } from '../actions';
import { connect } from 'react-redux';

class NewProfileView extends React.Component {
	static navigationOptions = {
		title: 'Profile',
		header: null
	};

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			middleName: '',
			lastName: '',
			email: '',
			id: '',
			userVerified: false,
			imageUri: require('../assets/images/avatar.png')
		};

	}

	componentWillMount() {

	}

	componentDidMount() {
		this.props.navigation.addListener('didFocus', () => {
			const user = this.props.user
			if (user) {
				this.setState({
					firstName: this.props.user.fname,
					lastName: this.props.user.lname,
					email: this.props.user.eml
				})
			}
		})
	}


	logout = () => {
		try {
			AsyncStorage.removeItem("userUID")
			this.props.removeUserFromState()
			this.props.screenProps.rootNavigation.navigate('AuthLoading')
		}
		catch (exception) {
			alert("Something went wrong!")
		}
	}
	render() {
		return (
			<View style={{ marginTop: StatusBar.currentHeight, backgroundColor: 'white', flex: 1 }}>
				<StatusBar backgroundColor={'white'} translucent barStyle="dark-content" />
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'column', marginLeft: 15, marginBottom: 15 }}>
						<View style={{ flex: 3, paddingTop: 0, flexDirection: 'row' }}>
							<Text style={localStyles.textNameStyle}>{this.state.firstName}</Text>
						</View>
						{/* <TouchableOpacity
							onPress={() => this.props.navigation.navigate('VeiwEditProfileView', { id: this.state.id })}
							style={{ flex: 1, paddingTop: 0, flexDirection: 'row' }}
						>
					</TouchableOpacity> */}
						<Text style={localStyles.textIdStyle}>{this.state.email}</Text>
					</View>
					<TouchableOpacity
						style={{
							marginLeft: 15,
							marginTop: 30,
							marginBottom: 10,
							marginRight: 20,
						}}
					>
						{this.state.imageUri ? (
							<Image
								style={{
									width: 40,
									height: 40,
									borderRadius: 22
								}}
								source={this.state.imageUri}
							/>
						) : (
							<View
								style={{
									width: 40,
									height: 40,
									borderRadius: 100,
									backgroundColor: 'grey'
								}}
							/>
						)}
					</TouchableOpacity>
				</View>
				<View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%' }} />
				<ScrollView>
					<ListOption
						name="Security"
						type="evilicon"
						route="SecurityView"
						navigation={this.props.navigation}
						iconname="lock"
					/>
					<ListOption name="Support" iconname="star" />
					<ListOption
						name="Sign out"
						iconname="ios-log-in"
						type="ionicon"
						logout={this.logout}
						route="Login"
						navigation={this.props.screenProps.rootNavigation}

					/>
				</ScrollView>
			</View>
		);
	}
}

class ListOption extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comingSoon: false
		};
	}

	render() {
		return (
			<View>
				<TouchableOpacity
					style={localStyles.listItemContainer}
					onPress={() => {
						if (this.props.name == 'Sign out') {
							this.props.logout()
						}
					}}
				>
					<Icon containerStyle={{ marginLeft: 15 }} name={this.props.iconname} type={this.props.type} />
					<View style={{ flex: 1, marginLeft: 20 }}>
						<Text style={[localStyles.textOptionStyle, { marginLeft: this.props.name == 'Verification' && this.props.userVerified ? 8 : 0 }]}>{this.props.name}</Text>
					</View>
				</TouchableOpacity>
				<View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%' }} />
			</View>
		);
	}
}


const localStyles = StyleSheet.create({
	container: {
		height: 150,
		backgroundColor: globals.COLOR.LIGHT_GREY,
		position: 'relative'
	},
	listItemContainer: {
		flexDirection: 'row',
		flex: 1,
		paddingVertical: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textNameStyle: {
		fontSize: 24,
		fontWeight: '300',
		color: 'black',
		alignSelf: 'flex-end',
		fontFamily: 'Montserrat-Regular'
	},
	textIdStyle: {
		fontSize: 12,
		fontWeight: '300',
		color: 'black',
		alignSelf: 'flex-end',
		fontFamily: 'Montserrat-Regular'
	},
	textOptionStyle: {
		fontSize: 14,
		fontWeight: '300',
		fontFamily: 'Montserrat-Regular',
		color: 'black'
	}
});

const mapStateToProps = ({ auth }) => {
	const { loading, user } = auth;
	return { loading, user };
};

export default connect(mapStateToProps, {
	removeUserFromState,
	getUser
})(NewProfileView)