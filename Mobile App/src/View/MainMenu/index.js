import React from 'react';
import { Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
    createAppContainer,

} from 'react-navigation';
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createBottomTabNavigator
} from 'react-navigation-tabs';
import HomeView from '../Home';
import ReportView from '../ReportView';
import ProfileView from '../Profile';
import NewsCatalogView from '../NewsCatalogView';
import MyReport from '../MyReport';
import AddComplaint from '../AddComplaint';
import Maps from '../MapsView';


export default class MainView extends React.Component {
    static navigationOptions = {
        title: 'Home',
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <View style={{ width: '100%', backgroundColor: '#fff', height: '100%' }}>
                <MainTabView
                    username={this.state.username}
                    screenProps={{ rootNavigation: this.props.navigation }}
                />
            </View>
        );
    }
}
const HomeStack = createStackNavigator({
    Home: {
        screen: HomeView, //HomeView
        navigationOptions: {
            headerShown: false,
        }
    },

});
const ReportStack = createStackNavigator({
    ReportView: {
        screen: ReportView, //ReportView
        navigationOptions: {
            headerShown: false,
        }
    },
    AddComplaint: {
        screen: AddComplaint, //AddComplaint
        navigationOptions: {
            headerShown: false,
        }
    },
    MyReport: {
        screen: MyReport, //MyReport
        navigationOptions: {
            headerShown: false,
        }
    },

});
const NewsStack = createStackNavigator({
    NewsCatalogView: {
        screen: NewsCatalogView, //NewsCatalogView
    },
});

const Mapstack = createStackNavigator({
    Maps: {
        screen: Maps, // Maps
    },
});
const ProfileStack = createStackNavigator({
    ProfileView: {
        screen: ProfileView,
    },
});
const MainTabView = createAppContainer(
    createBottomTabNavigator(
        {
            Report: {
                screen: ReportStack,
                navigationOptions: {
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{
                                padding: 8,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                backgroundColor: '#0fd2ee',
                                height: 50,
                                marginTop: -10
                            }}>
                                <Icon containerStyle={{ marginTop: 8 }}
                                    name="page-add"
                                    type="foundation"
                                    color="#fff" />
                            </View>
                        ) : (
                            <View style={{
                                borderTopRightRadius: 20,
                            }}>
                                <Icon
                                    name="page-add"
                                    type="foundation"
                                    color="grey" />
                            </View>
                        ),
                },
            },
            News: {
                screen: NewsStack,
                navigationOptions: {
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{
                                padding: 8,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                backgroundColor: '#0fd2ee',
                                height: 50,
                                marginTop: -10
                            }}>
                                <Icon containerStyle={{ marginTop: 8 }}
                                    name="newspaper-o"
                                    type="font-awesome"
                                    color="#fff" />
                            </View>
                        ) : (
                            <Icon
                                name="newspaper-o"
                                type="font-awesome"
                                color="grey" />
                        ),
                },
            },

            Home: {
                screen: HomeStack,
                navigationOptions: {
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{
                                padding: 5,
                                borderRadius: 40,
                                backgroundColor: '#0fd2ee',
                                height: 60,
                                width: 60,
                                elevation: 15,
                                shadowColor: 'black',
                                shadowOffset: {
                                    width: 0,
                                    height: 5
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                                marginTop: -20,
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <Image
                                    style={{ width: 25, height: 22 }}
                                    source={require('../../assets/image/home-active.png')}
                                />
                            </View>
                        ) : (
                            <View style={{
                                padding: 5,
                                borderRadius: 40,
                                backgroundColor: '#fff',
                                height: 60,
                                width: 60,
                                elevation: 15,
                                marginTop: -20,
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <Image
                                    style={{ width: 25, height: 22 }}
                                    source={require('../../assets/image/home.png')}
                                />
                            </View>
                        ),
                },
            },

            Map: {
                screen: Mapstack,
                navigationOptions: {
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{
                                padding: 8,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                backgroundColor: '#0fd2ee',
                                height: 50,
                                marginTop: -10
                            }}>
                                <Icon containerStyle={{ marginTop: 8 }}
                                    name="location"
                                    type="entypo"
                                    color="#fff" />
                            </View>
                        ) : (
                            <Icon
                                name="location"
                                type="entypo"
                                color="grey" />
                        ),
                },
            },
            Profile: {
                screen: ProfileStack,
                navigationOptions: {
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{
                                padding: 8,
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                backgroundColor: '#0fd2ee',
                                height: 50,
                                marginTop: -10
                            }}>
                                <Icon containerStyle={{ marginTop: 8 }}
                                    name="setting"
                                    type="antdesign"
                                    color="#fff" />
                            </View>
                        ) : (
                            <Icon
                                name="setting"
                                type="antdesign"
                                color="grey" />
                        ),
                },
            },
            //The other screens
        },
        {
            pressColor: '#0fd2ee',
            tabBarOptions: {
                height: 120,
                activeTintColor: '#0fd2ee',
                inactiveTintColor: '#b9b9b9',
                showLabel: false,
                style: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    elevation: 40,
                    height: 60,
                    shadowOffset: { width: 0, height: 50 },
                    shadowColor: "black",
                    shadowOpacity: 1,
                    shadowRadius: 40,
                }
            },
            initialRouteName: 'Home',
            swipeEnabled: false,
        },
    ),
);
