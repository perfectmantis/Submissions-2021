import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../config/color";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export default function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) {
      alert("You need to enable permission to access the library");
    }
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.console.log("error loading image", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
          <MaterialCommunityIcons
            color={color.medium}
            name="camera"
            size={40}
          />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.light,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
});
