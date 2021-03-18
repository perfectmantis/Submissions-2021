import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../config/color";

export default function ListItemSeperator() {
  return <View style={styles.seperator} />;
}

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.light,
  },
});
