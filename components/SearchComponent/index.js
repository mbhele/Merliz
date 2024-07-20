import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get('window');

const SearchComponent = ({ handlePlaceSelect, navigation }) => {
  const [expanded, setExpanded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const pickupRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        address: 'Current Location',
      });
    })();
  }, []);

  const handleExpand = () => {
    setExpanded(true);
  };

  const setDefaultLocation = () => {
    if (userLocation && pickupRef.current) {
      pickupRef.current.setAddressText(userLocation.address);
    }
  };

  return (
    <View style={expanded ? styles.containerExpanded : styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan your ride</Text>
      </View>
      <View style={styles.searchInputs}>
        <View style={styles.searchInputRow}>
          <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
          <GooglePlacesAutocomplete
            ref={pickupRef}
            placeholder="Pickup location"
            onPress={(data, details = null) => handlePlaceSelect(data, details, 'from')}
            query={{
              key: 'AIzaSyAG8YFYpxHJSBvM7bnoWl2tNxDF05Usfow',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInput: styles.textInput,
              container: styles.autoCompleteContainer,
              listView: styles.listView,
            }}
            enablePoweredByContainer={false}
            textInputProps={{
              onFocus: () => {
                setDefaultLocation();
              },
            }}
          />
        </View>
        <View style={styles.searchInputRow}>
          <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            onPress={(data, details = null) => handlePlaceSelect(data, details, 'to')}
            query={{
              key: 'AIzaSyAG8YFYpxHJSBvM7bnoWl2tNxDF05Usfow',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInput: styles.textInput,
              container: styles.autoCompleteContainer,
              listView: styles.listView,
            }}
            enablePoweredByContainer={false}
            onFocus={handleExpand}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.locationList}>
        <Text style={styles.locationItem}>Bellville</Text>
        <Text style={styles.locationItem}>De Lapa</Text>
        <Text style={styles.locationItem}>Aandklas</Text>
        <Text style={styles.locationItem}>V&A Waterfront</Text>
        <Text style={styles.locationItem}>Cape Town International Airport (CPT)</Text>
        <Text style={styles.locationItem}>Yours Truly</Text>
        <Text style={styles.locationItem}>Mojo Market</Text>
        <Text style={styles.locationItem}>Kloof Street House</Text>
        <TouchableOpacity>
          <Text style={styles.locationItem}>Set location on map</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.locationItem}>Saved places</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  containerExpanded: {
    height: height * 0.9,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchInputs: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  autoCompleteContainer: {
    flex: 1,
    marginBottom: 8,
  },
  listView: {
    backgroundColor: '#fff',
  },
  addButton: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  locationList: {
    marginTop: 16,
  },
  locationItem: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
});

export default SearchComponent;
