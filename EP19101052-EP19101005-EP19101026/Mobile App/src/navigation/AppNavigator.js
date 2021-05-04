import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';
import {
  Home,
  Login,
  Profile,
  Signup,
  Welcome,
  MultiScreens,
  ForgetPassword,
  MainTab,
  AuthLoading,
} from '../View';
const NewStack = createStackNavigator(
  {
    Login: { screen: Login },
    ForgetPassword: { screen: ForgetPassword },
    Profile: { screen: Profile },
    Signup: { screen: Signup },
    Home: { screen: Home },
    Main: { screen: MainTab },
    AuthLoading: { screen: AuthLoading },
  },
  {
    initialRouteName: 'AuthLoading',
  },
);


const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    Signup: {screen: Signup},
    ForgetPassword: {screen: ForgetPassword},
  },
  {
    initialRouteName: 'Login',
  },
);
const onBoardingStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
    MultiScreens: {
      screen: MultiScreens,
    },
  },
  {
    initialRouteName: 'MultiScreens',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    onBoardingScreen: onBoardingStack,
    Main: MainTab,
    Login: Login,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  },
);

const Routes = createAppContainer(AppNavigator);

export default Routes;
