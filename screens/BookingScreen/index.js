import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

const BookingScreen = ({ route, navigation }) => {
  const { startLocation, endLocation } = route.params;

  const handleConfirmBooking = () => {
    console.log('Trip booked from', startLocation, 'to', endLocation);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Start Location: {JSON.stringify(startLocation)}</Text>
      <Text>End Location: {JSON.stringify(endLocation)}</Text>
      <Button title="Confirm Booking" onPress={handleConfirmBooking} />
    </View>
  );
};

export default BookingScreen;
