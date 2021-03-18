import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={[style, styles.screen]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
