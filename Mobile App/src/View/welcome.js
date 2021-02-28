import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Image,
    Platform,
    View,
} from 'react-native';
import Image1 from '../assets/images/logo.png';
import { Button } from 'react-native-elements';

const Montserrat = Platform.OS == "android" ? "Montserrat-Regular" : "Montserrat-Regular"

class Welcome extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View
                style={styles.container}>
                <Image
                    source={Image1}
                    resizeMode="contain"
                    style={{ width: 150, marginTop: 10 }}
                />
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate("Signup")}
                        titleStyle={{ fontFamily: Montserrat }}
                        buttonStyle={{ backgroundColor: 'rgba(0,0,0,0.6)', width: 150, borderRadius: 5 }}
                        title="Sign up" />
                    <Button
                        onPress={() => this.props.navigation.navigate("Login")}
                        titleStyle={{ fontFamily: Montserrat }}
                        containerStyle={{ marginBottom: 20, marginTop: 10 }}
                        buttonStyle={{ backgroundColor: 'rgba(0,0,0,0.6)', width: 150, borderRadius: 5 }}
                        title="Login" />
                </View>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B1B41',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

export default Welcome;
