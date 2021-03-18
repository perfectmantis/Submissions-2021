import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../config/color';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function ViewImageScreen(prop) {
    return (
        <View style={styles.container}>
        <View style={styles.closeIcon}>
            <MaterialCommunityIcons name="close" color="white" size={30} />
        </View>
            <View style={styles.deleteIcon}>
            <MaterialCommunityIcons name="trash-can-outline" color="white" size={35} />
            </View>
            <Image resizeMode="contain" style={styles.image} source={require('../assets/chair.jpg')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    closeIcon: {
        position: "absolute",
        top: 40,
        left: 30
    },
    deleteIcon: {
        position: "absolute",
        top: 40,
        right: 30
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ViewImageScreen;