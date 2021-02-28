import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import USER from '../assets/images/avatar.png';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment'

function MyReports({ navigation, crimes, missings, complaints }) {
    let data = navigation?.state?.params.type === 'Crime' ? crimes : navigation?.state?.params.type === 'Missing' ? missings : complaints
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
                    <Text style={{ fontSize: 16, fontWeight: 'normal', fontFamily: 'Montserrat-Regular' }}>My Reports</Text>
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
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 100
                        }}>

                            <Icon type="entypo" name="mobile" size={60} containerStyle={{ backgroundColor: '#fff', padding: 15, borderRadius: 100 }} color="#05445E" />
                            <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 'bold' }}>You have no {navigation?.state?.params.type ? navigation?.state?.params.type : 'Complaint'} Reports</Text>
                        </View>
                    )
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: '100%', minHeight: 150, elevation: 5, marginBottom: 10, backgroundColor: '#fff', borderRadius: 2 }}>
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
                                        <Text style={{ textAlign: 'right', fontFamily: 'Montserrat-Regular' }}>
                                            {item?.city}
                                        </Text>
                                    </View>
                                    <Text style={{ color: "red", marginTop: 5, textAlign: 'right', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                        {moment(item?.dated).fromNow()}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.adminStatus, { backgroundColor: item?.adminStatus === 'Case In progress' ? "rgb(255, 64, 129)" : 'rgb(0, 188, 212)' }]}>
                                <Text style={{ color: '#fff' }}>{item?.adminStatus}</Text>
                            </View>
                        </View>
                    )
                }}
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
    },
    adminStatus: {
        width: '100%',
        marginTop: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = ({ auth, report }) => {
    const { user } = auth;
    const { loading, crimes, missings, complaints } = report;
    return { loading, user, crimes, missings, complaints };
};
export default connect(mapStateToProps)(MyReports)
