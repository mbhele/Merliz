import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import styles from './styles';

const MapComponent = React.forwardRef((props, ref) => {
  const { initialRegion, userLocation, fromLocation, toLocation, coordinates, handleMapPress } = props;

  return (
    <MapView
      ref={ref}
      style={styles.map}
      initialRegion={initialRegion}
      showsUserLocation={true}
      onPress={handleMapPress}
      customMapStyle={mapStyle}
    >
      {fromLocation && <Marker coordinate={fromLocation} />}
      {toLocation && <Marker coordinate={toLocation} />}
      {coordinates.length === 2 && (
        <Polyline coordinates={coordinates} strokeWidth={5} strokeColor="#1faadb" />
      )}
    </MapView>
  );
});



const mapStyle = [
  // Your custom map style JSON here
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  // Add more styling as needed
];

export default MapComponent;
