import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Colors from "../config/color";
import AppText from "./AppText";
import { hide } from "expo/build/launch/SplashScreen";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import App from '../../App';
import { color } from 'react-native-reanimated';

function Card({ title, orderStatus, paymentStatus, total, date, id, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {/* <Image
          style={styles.image}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        /> */}
        <View style={styles.detailsContainer}>
          <AppText style={styles.orderNumber}>Order# {id}</AppText>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.label}>Order Status: <AppText style={orderStatus === "Ready" ? styles.orderStatusReady : styles.orderStatusShipped}>{orderStatus}</AppText></AppText>
          <AppText style={styles.label}>Payment Status: <AppText  style={paymentStatus === "Paid" ? styles.paymentStatusPaid : styles.paymentStatusPending}>{paymentStatus}</AppText></AppText>
          <AppText style={styles.label}>Date: <AppText style={styles.date}>{date}</AppText></AppText>
          <AppText style={styles.label}>Total: <AppText style={styles.total}>{total}</AppText></AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginBottom: 20,
    overflow: "hidden",
    fontSize: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.medium
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  label: {
    color: Colors.medium,
    fontSize: 15,
  },
  orderNumber: {    
    color: Colors.dark,
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    color: Colors.dark,
    marginBottom: 7,
    fontSize: 18,
    fontWeight: "bold",
  },
  orderStatusReady: {
    color: "#3e79f7",
    fontSize: 14,
    backgroundColor: "#e9effa",
    borderRadius: 100,
    padding: 20,
    position: "absolute"
  },
  orderStatusShipped: {
    color: "#04d182",
    fontSize: 14,
    backgroundColor: "#e4f6ef"
  },
  paymentStatusPending: {
    fontSize: 16,
    color: "orange",
    fontWeight: "bold"
  },
  paymentStatusPaid: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold"
  },
  date: {
    fontSize: 16,

  },
  total: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default Card;
