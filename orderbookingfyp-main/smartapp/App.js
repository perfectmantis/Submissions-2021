import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationRef from "./app/navigation/rootNavigation";
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import OfflineNotice from "./app/components/OfflineNotice";
import { Text } from 'react-native';

export default function App() {
  return (
    <>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
