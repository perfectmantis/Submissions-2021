import React, { useEffect, Fragment } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    AsyncStorage,
    StatusBar
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { getCrime, getMissing, getComplaint } from '../actions';
import { connect } from 'react-redux';

function ReportView({ navigation, user, getCrime, getMissing, getComplaint, crimes, missings, complaints }) {

    useEffect(() => {
        navigation.addListener('didFocus', async () => {
            const userUID = await AsyncStorage.getItem('userUID')
            if (userUID) {
                getCrime(userUID)
                getMissing(userUID)
                getComplaint(userUID)
            }
        })
    }, [])

    useEffect(() => {
        if (crimes) {
        }
    }, [crimes])

    const list = [
        {
            name: 'Crime',
            number: crimes?.length > 0 ? crimes?.length : 0,
            color: "rgb(0,172,193)",
            icon: 'md-finger-print',
            type: 'ionicon'
        },
        {
            name: 'Complaints',
            number: complaints?.length > 0 ? complaints?.length : 0,
            color: "rgb(216,27,96)",
            icon: 'sound',
            type: 'foundation'
        },
        {
            name: 'Missing',
            number: missings?.length > 0 ? missings?.length : 0,
            color: "rgb(142,36,170)",
            icon: 'smileo',
            type: 'antdesign'
        },
    ]
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
            <ScrollView style={styles.container}>
                <View style={{ alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'normal', fontFamily: 'Montserrat-Regular' }}>My Complaints</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    {
                        list && list.map(item => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        width: '90%', backgroundColor: '#fff', height: 100,
                                        borderRadius: 5,
                                        elevation: 2,
                                        marginVertical: 5
                                    }}
                                    onPress={() => navigation.navigate('MyReport', { type: item.name })}
                                >
                                    <View style={styles.cardInner}>
                                        <View style={{
                                            width: 80, height: 100,
                                            borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
                                            backgroundColor: item.color,
                                            alignItems: 'center', justifyContent: 'center',
                                            marginRight: 10
                                        }}>
                                            <Icon name={item.icon} type={item.type} color="#fff" size={50} />
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Regular' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular' }}>{item.number}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <Button title="Add Complaint" titleStyle={{ fontFamily: 'Montserrat-Bold' }} buttonStyle={{
                backgroundColor: '#0fd2ee',
                borderRadius: 2, width: '95%', marginLeft: 10,
                height: 50,
                padding: 0,
                marginBottom: 10
            }}
                onPress={() => navigation.navigate('AddComplaint')}
            />
        </View>
    );
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
        width: '100%',
        flex: 1
    },
    cardInner: {
        flexDirection: 'row',
        width: '100%',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const mapStateToProps = ({ auth, report }) => {
    const { user } = auth;
    const { loading, crimes, missings, complaints } = report;
    return { loading, user, crimes, missings, complaints };
};
export default connect(mapStateToProps, {
    getCrime,
    getMissing,
    getComplaint
})(ReportView)
