import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapComponent from '../../components/MapComponent';
import SearchComponent from '../../components/SearchComponent';
import SearchButton from '../../components/SearchButton';
import CarPrompt from '../../components/CarPrompt';
import styles from './styles';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const animation = useRef(new Animated.Value(height)).current;
  const mapRef = useRef(null);
  const navigation = useNavigation();
  let locationSubscription = useRef(null);

  useEffect(() => {
    requestLocationPermission();
    locationSubscription.current = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        mapRef.current.animateToRegion({
          ...initialRegion,
          latitude,
          longitude,
        });
      }
    );

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (fromLocation && toLocation) {
      setCoordinates([fromLocation, toLocation]);
      showCarPrompt();
    }
  }, [fromLocation, toLocation]);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const handleSearchButtonPress = () => {
    Animated.timing(animation, {
      toValue: height / 4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePlaceSelect = (data, details, type) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    if (type === 'from') {
      setFromLocation(location);
    } else {
      setToLocation(location);
      navigation.navigate('TripDetails', { fromLocation, toLocation: location });
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setToLocation(coordinate);
    navigation.navigate('TripDetails', { fromLocation, toLocation: coordinate });
  };

  const showCarPrompt = () => {
    Animated.timing(animation, {
      toValue: height - 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <MapComponent
        ref={mapRef}
        initialRegion={initialRegion}
        userLocation={userLocation}
        fromLocation={fromLocation}
        toLocation={toLocation}
        coordinates={coordinates}
        handleMapPress={handleMapPress}
      />
      <Animated.View style={[styles.searchContainer, { transform: [{ translateY: animation }] }]}>
        <SearchComponent handlePlaceSelect={handlePlaceSelect} />
      </Animated.View>
      <SearchButton onPress={handleSearchButtonPress} />
      {toLocation && <CarPrompt />}
    </View>
  );
}

export default HomeScreen;
