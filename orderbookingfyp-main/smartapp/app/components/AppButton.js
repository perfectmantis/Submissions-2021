import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../config/color";

function AppButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    width: "100%",
    height: 50,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AppButton;
