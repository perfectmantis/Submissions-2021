import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import image1 from '../assets/images/graphic-btcmdpi.png';
import image2 from '../assets/images/graphic-ethmdpi.png';
import image4 from '../assets/images/graphic-usdmdpi.png';
import USER from '../assets/images/avatar.png';
import { getAllReports } from '../actions';
import { connect } from 'react-redux';
import { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment'

class HomeView extends Component {
    static navigationOptions = {
        header: null,
    };
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.props.getAllReports()
        })
    }

    // useEffect(() => {
    //     if (allReports) {
    //         console.warn('allReports', allReports)
    //     }
    // }, [allReports])

    render() {
        if (this.props.loading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color="#20E2F1" />
                </View>)
        }
        let data = this.props.allReports && this.props.allReports
        data = data && data.sort((a, b) => moment(b.dated) - moment(a.dated));
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 10,
                    justifyContent: 'center', width: '100%',
                    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
                }}
            >
                <StatusBar backgroundColor={'white'} translucent barStyle="dark-content" />
                <View style={{ alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'normal', fontFamily: 'Montserrat-Regular' }}>All Users Reports</Text>
                    </View>
                </View>
                <FlatList
                    data={data}
                    noIndent={true}
                    keyExtractor={(item) => item.uid}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                flex: 1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 50
                            }}>

                                <Icon type="entypo" name="mobile" size={60} containerStyle={{ backgroundColor: '#fff', padding: 15, borderRadius: 100 }} color="#05445E" />
                                <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold' }}>You have no list</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <ImageBackground source={item?.role === 'Complaint' ? image2 : item?.role === 'Missing' ? image1 : image4} style={{ width: '100%', height: 150 }}>
                                <View style={styles.cardInner}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                                        <View style={{ width: 50 }}>
                                            <Image
                                                style={{ width: 30, height: 30, marginRight: 10 }}
                                                source={USER}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5, fontFamily: 'Montserrat-Bold' }}>
                                                {item?.role}
                                            </Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                                                Reported by {item?.userName}
                                            </Text>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                                {item?.details}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon name="location-pin" type="entypo" />
                                            <Text style={{ textAlign: 'right', fontFamily: 'Montserrat-Regular', textTransform: 'capitalize' }}>
                                                {item?.city}
                                            </Text>
                                        </View>
                                        <Text style={{ color: "red", marginTop: 5, textAlign: 'right', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                            {moment(item?.dated).fromNow()}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        )
                    }}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        width: '100%',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    cardInner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingTop: 40
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const mapStateToProps = ({ auth, report }) => {
    const { user } = auth;
    const { loading, allReports } = report;
    return { loading, user, allReports };
};
export default connect(mapStateToProps, {
    getAllReports,
})(HomeView)
