import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../config/color";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NewListingButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={color.white}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    borderRadius: 40,
    width: 80,
    height: 80,
    bottom: 40,
    borderColor: color.white,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
