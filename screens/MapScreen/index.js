import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import * as Location from 'expo-location';
import MapComponent from '../../components/MapComponent';
import styles from './styles';

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setStartLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleSelectEndLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setEndLocation({ latitude, longitude });

    setRoute([
      { latitude: startLocation.latitude, longitude: startLocation.longitude },
      { latitude, longitude },
    ]);
  };

  return (
    <View style={styles.container}>
      <MapComponent
        region={region}
        startLocation={startLocation}
        endLocation={endLocation}
        handleSelectEndLocation={handleSelectEndLocation}
        route={route}
      />
      <Button
        title="Book Trip"
        onPress={() => navigation.navigate('Booking', { startLocation, endLocation })}
        disabled={!startLocation || !endLocation}
      />
    </View>
  );
};

export default MapScreen;
