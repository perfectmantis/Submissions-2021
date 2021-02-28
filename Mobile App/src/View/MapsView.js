import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import MapView, { Circle } from 'react-native-maps';

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapsView extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: 24.9107, longitude: 67.0311,
        }
    }

    render() {
        const { latitude, longitude } = this.state;
        let myLocation = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsTraffic={true}
                    // ref={map => (this.map = map)}
                    loadingEnabled={false}
                    // onRegionChange={this.onRegionChange}
                    initialRegion={myLocation}
                >
                    <Circle
                        radius={3000}
                        strokeColor={'red'}
                        strokeWidth={3}
                        center={myLocation} />
                </MapView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapsView;
