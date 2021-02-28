/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Route from './src/navigation/AppNavigator'
import Store from './src/store/store'
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Route />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
