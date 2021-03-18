import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../config/color";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={Colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
