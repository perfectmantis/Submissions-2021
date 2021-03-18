import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText';
import ListItem from '../components/ListItem';

import Colors from '../config/color';
import moment from 'moment';

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <View>
      {/* <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        uri={listing.images[0].url}
        tint="light"
      /> */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.customer}</AppText>
        <AppText style={styles.price}>Rs. {listing.amount}</AppText>
        <AppText style={styles.price}>
          {moment(listing.date).format('DD-MMM-2020')}
        </AppText>
        <AppText style={styles.price}>Rs. {listing.orderStatus}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  price: {
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
