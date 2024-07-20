import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import TripOptions from '../../components/TripOptions';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import styles from './styles'; // Correctly import the styles

const TripDetailsScreen = ({ route, navigation }) => {
  const { fromLocation, toLocation } = route.params || {};
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(fromLocation);
  const [tripStarted, setTripStarted] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([fromLocation]);
  const [isSpeechPaused, setIsSpeechPaused] = useState(false);
  const mapRef = useRef(null);

  const midPoint = fromLocation && toLocation ? {
    latitude: (fromLocation.latitude + toLocation.latitude) / 2,
    longitude: (fromLocation.longitude + toLocation.longitude) / 2,
  } : { latitude: 0, longitude: 0 };

  useEffect(() => {
    let locationSubscription;

    if (tripStarted) {
      Speech.speak('Trip started, moving towards destination.');
      locationSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          const newCoordinate = { latitude, longitude };
          setCurrentLocation(newCoordinate);
          setRouteCoordinates(prevCoords => [...prevCoords, newCoordinate]);
          console.log(`Current coordinates: Latitude ${latitude}, Longitude ${longitude}`);
          
          // Zoom to fit the route
          mapRef.current.fitToCoordinates([...routeCoordinates, newCoordinate], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });

          if (!isSpeechPaused) {
            Speech.speak(`Current coordinates: Latitude ${latitude}, Longitude ${longitude}`);
          }
        }
      );
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.then(sub => sub.remove());
      }
    };
  }, [tripStarted, isSpeechPaused]);

  const handleSelectCar = (option) => {
    setSelectedCar(option);
    console.log(`Selected car: ${option.title}`);
  };

  const handleStartTrip = () => {
    setTripStarted(true);
  };

  const handlePauseSpeech = () => {
    setIsSpeechPaused(true);
    Speech.stop();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: midPoint.latitude,
          longitude: midPoint.longitude,
          latitudeDelta: Math.abs(fromLocation?.latitude - toLocation?.latitude) * 2 || 0.0922,
          longitudeDelta: Math.abs(fromLocation?.longitude - toLocation?.longitude) * 2 || 0.0421,
        }}
      >
        {fromLocation && <Marker coordinate={fromLocation} />}
        {toLocation && <Marker coordinate={toLocation} />}
        {currentLocation && <Marker coordinate={currentLocation} />}
        <Polyline
          coordinates={[fromLocation, toLocation]}
          strokeColor="#1faadb" // Blue color for the static route
          strokeWidth={5}
        />
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000000" // Black color for the dynamic route
          strokeWidth={5}
        />
      </MapView>
      <View style={styles.tripDetailsContainer}>
        {selectedCar ? (
          <View>
            {tripStarted ? (
              <>
                <Text style={styles.movingText}>Moving towards destination...</Text>
                <Button title="Pause Speech" onPress={handlePauseSpeech} />
              </>
            ) : (
              <Button title="Start Trip" onPress={handleStartTrip} />
            )}
          </View>
        ) : (
          <>
            <Text style={styles.tripHeader}>Choose a trip</Text>
            <TripOptions onSelectCar={handleSelectCar} />
          </>
        )}
      </View>
    </View>
  );
};



export default TripDetailsScreen;
