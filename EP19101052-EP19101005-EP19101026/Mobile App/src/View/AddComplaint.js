import React from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import globals from '../utils/globals';
import { Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Picker } from 'native-base'
import { connect } from 'react-redux';
import { addReport } from '../actions';
import { ActivityIndicator } from 'react-native';

const Montserrat = Platform.OS == "android" ? "Montserrat-Regular" : "Montserrat-Regular"

class AddComplaint extends React.Component {
    static navigationOptions = {
        title: 'VeiwEditProfile',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            action_taken: '',
            city: '',
            details: '',
            reportType: '',
            city: '',
            isDateTimePickerVisible: false,
            selectedDate: ''
        };
    }


    handleChange = (text, key) => {
        this.setState({ [key]: text });
    };
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        let show = moment(date).format('YYYY-MM-DD')
        this.setState({ selectedDate: show })
        this.hideDateTimePicker();
    };

    onSubmit = () => {
        const { action_taken, city, details, reportType } = this.state
        let obj = {
            userImage: this.props.user.photoURL,
            userId: this.props.user.userId,
            userName: this.props.user.fname + " " + this.props.user.lname,
            adminStatus: "Case In progress",
            action: action_taken,
            city: city,
            details: details,
            role: reportType,
            dated: Date.now(),
        }
        const navigation = this.props.navigation
        this.props.addReport(obj, navigation);
    }
    render() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight, backgroundColor: 'white', flex: 1 }}>
                <StatusBar backgroundColor={'white'} translucent barStyle="dark-content" />
                <View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%' }} />
                <ScrollView>

                    <View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%', marginTop: 10, marginBottom: -10 }} />

                    <View style={{ marginTop: 10 }}>
                        <ListOption
                            placeholder="Action Taken"
                            onChangeText={(text) => this.handleChange(text, 'action_taken')}
                            text={this.state.action_taken}
                        />
                        <ListOption
                            placeholder="City"
                            onChangeText={(text) => this.handleChange(text, 'city')}
                            text={this.state.city}
                        />
                        <ListOption
                            placeholder="Details"
                            onChangeText={(text) => this.handleChange(text, 'details')}
                            text={this.state.details}
                        />
                        <View style={localStyles.listItemContainer}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginLeft: 20
                                }}
                            >
                                <TouchableOpacity onPress={this.showDateTimePicker} style={{
                                }}>
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        maximumDate={Date.now()}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                    {this.state.selectedDate ?
                                        <Text style={{ padding: 10, paddingTop: 15, fontFamily: Montserrat }}>{this.state.selectedDate}</Text>
                                        : <Text style={{ padding: 10, paddingTop: 15, color: 'grey', fontFamily: Montserrat }}>Select date</Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%' }} />
                        <View style={localStyles.listItemContainer}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginLeft: 20
                                }}
                            >
                                <Picker
                                    selectedValue={this.state.reportType}
                                    onValueChange={(value) => this.setState({ reportType: value })}
                                    note
                                    placeholder="Add your report type"
                                    mode="dropdown"
                                >
                                    <Picker.Item disabled label={"Add your report type"} value={''} />
                                    <Picker.Item label={"missing"} value={"Missing"} />
                                    <Picker.Item label={"complaint"} value={"Complaint"} />
                                    <Picker.Item label={"crime"} value={"Crime"} />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%' }} />
                    </View>
                </ScrollView>
                {
                    this.props.loading ?
                        <Button
                            title=""
                            icon={<ActivityIndicator color={"#fff"} />}
                            titleStyle={{ fontFamily: 'Montserrat-Regular' }}
                            containerStyle={{ width: '90%', marginLeft: 20 }}
                            buttonStyle={{ borderRadius: 5, height: 50, backgroundColor: '#0fd2ee', marginVertical: 20 }}
                        />
                        :
                        <Button
                            title="Register Report"
                            titleStyle={{ fontFamily: 'Montserrat-Regular' }}
                            onPress={() => this.onSubmit()}
                            disabled={!this.state.action_taken || !this.state.city || !this.state.details || !this.state.reportType || !this.state.selectedDate}
                            containerStyle={{ width: '90%', marginLeft: 20 }}
                            buttonStyle={{ borderRadius: 5, height: 50, backgroundColor: '#0fd2ee', marginVertical: 20 }}
                        />
                }
            </View>
        );
    }
}

class ListOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChangeText, text } = this.props;
        return (
            <View>
                <View style={localStyles.listItemContainer}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 20
                        }}
                    >
                        <TextInput
                            placeholder={this.props.placeholder}
                            underlineColorAndroid="transparent"
                            style={{ width: 200, height: 50, fontFamily: 'Montserrat-Regular', marginLeft: 10 }}
                            onChangeText={(text) => onChangeText(text)}
                            value={text}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: globals.COLOR.LIGHTEST_GREY, height: 1, width: '100%' }} />
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        flex: 1,
        borderTopColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOptionStyle: {
        fontWeight: '300',
        color: 'black'
    }
});


const mapStateToProps = ({ report, auth }) => {
    const { loading } = report;
    const { user } = auth;
    return { loading, user };
};

export default connect(mapStateToProps, {
    addReport,
})(AddComplaint);