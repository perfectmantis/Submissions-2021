import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Image2 from '../assets/images/logo.png'
import Image3 from '../assets/images/missing-02.png'
import Carousel from 'react-native-snap-carousel';

import Image4 from '../assets/images/screen3.png'
const Montserrat = Platform.OS == "android" ? "Montserrat-Regular" : "Montserrat-Regular"
const MontserratBold = Platform.OS == "android" ? "Montserrat-Bold" : "Montserrat-Bold"

class OnBoarding extends Component {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
        drawerLockMode: 'locked-closed'
    };
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            activeSlide: 0,
            entries: [
                { image: Image2, title: 'A crime is an unlawful act punishable by a state or other authority ', Name: "Crime" },
                { image: Image4, title: 'A complaints statement that something is unsatisfactory or unacceptable', Name: "Complaints" },
                { image: Image3, title: 'A thing not able to be found because it is not in its expected place', Name: "Missing" },
            ]
        }


    }
    onSlideChangeHandle = (index, total) => {
        this.setState({ activeSlide: index })
        if (index == 3) {
            this.setState({ signin: true })
        } else {
            this.setState({ signin: false })
        }
    }


    _signUp = () => {
        this.props.navigation.navigate('SignUp')
    }
    _signIn = () => {
        this.props.navigation.navigate("Welcome")
    }
    _renderItem = ({ item }) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
                <Image resizeMode="contain" style={{ height: 200 }} source={item.image} />
            </View>
        );
    };



    render() {
        const { activeSlide, entries } = this.state;

        const sliderWidth = Dimensions.get('window').width;
        return (
            <View style={styles.container}>
                <View style={{
                    width: "100%",
                    height: '10%',
                    zIndex: 2,
                    justifyContent: "space-between",
                    flexDirection: "row", alignItems: 'center'
                }}>
                    <View />
                    <TouchableOpacity onPress={() => this._signIn()}>
                        <Text style={{ fontSize: 18, color: '#fff', fontFamily: Montserrat, marginRight: 10 }}>Skip</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        onSnapToItem={(index) => {
                            this.onSlideChangeHandle(index)
                        }}
                        itemWidth={sliderWidth}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: activeSlide == 0 ? 10 : 5, height: 5, backgroundColor: activeSlide == 0 ? '#fff' : '#939393', borderRadius: 20 }} />
                        <View style={{ width: activeSlide == 1 ? 10 : 5, height: 5, backgroundColor: activeSlide == 1 ? '#fff' : '#939393', marginHorizontal: 5, borderRadius: 10 }} />
                        <View style={{ width: activeSlide == 2 ? 10 : 5, height: 5, backgroundColor: activeSlide == 2 ? '#fff' : '#939393', borderRadius: 20 }} />
                    </View>
                    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
                        <Text style={[styles.centerTextHeading]}>{entries[activeSlide].Name}</Text>
                        <Text style={[styles.centerText, { color: '#fff', fontSize: 12, fontFamily: Montserrat, marginVertical: 5 }]}>{entries[activeSlide].title}</Text>
                    </View>
                </View>
                <View style={styles.signinBtnViewStyle}>
                    <Button
                        onPress={() => this._signIn()}
                        buttonStyle={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            height: 45,
                            borderRadius: 100,

                        }}
                        icon={<Icon
                            name="arrowright"
                            type="antdesign"
                            color="#fff"
                            size={24}
                        />}
                        titleStyle={{ fontFamily: MontserratBold }}
                        containerStyle={{ width: 45 }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1B1B41',
        justifyContent: 'space-between'
    },
    slide: {
        width: '100%',
        alignItems: 'flex-end',
    },
    signinBtnViewStyle: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    
    centerText: {
        fontSize: 20,
        width: '85%',
        color: '#2962ff',
        textAlign: 'center',
    },
    centerTextHeading: {
        fontSize: 20,
        width: '85%',
        color: '#fff',
        textAlign: 'center',
        fontFamily: MontserratBold
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 50
    },
});

export default OnBoarding;