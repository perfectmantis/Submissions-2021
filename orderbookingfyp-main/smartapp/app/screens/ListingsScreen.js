import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import routes from '../navigation/routes';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Colors from '../config/color';
import listingsApi from '../api/listings';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';
import color from '../config/color';
import moment from 'moment';

export default function ListingsScreen({ navigation }) {
  const { data: listings, loading, error, request: getListings } = useApi(
    listingsApi.getListings
  );

  useEffect(() => {
    getListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <AppButton title='Retry' onPress={getListings} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <AppText style={styles.heading}>My Orders</AppText>
      <FlatList
        style={styles.list}
        data={listings}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.customer}
            total={'Rs. ' + item.amount}
            paymentStatus={item.paymentStatus}
            orderStatus={item.orderStatus}
            date={moment(item.date).format('DD-MMM-2020')}
            id={item._id}
            // imageUrl={item.images[0].url}
            // thumbnailUrl={item.images[0].thumbnailUrl}
            onPress={() => navigation.navigate(routes.LISTINGS_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 10,
    backgroundColor: Colors.light,
  },
  list: {
    padding: 10,
    backgroundColor: Colors.light,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: color.white,
    marginBottom: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cbc9c9',
  },
});
