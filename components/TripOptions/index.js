import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TripOptions = ({ onSelectCar }) => {
  const option = {
    image: require('../../assets/car.jpeg'),
    title: 'Uber Go',
    time: '8:46pm - 4 min away',
    price: 'R170.71',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => onSelectCar(option)}>
        <Image source={option.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{option.title}</Text>
          <Text style={styles.time}>{option.time}</Text>
          <Text style={styles.price}>{option.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TripOptions;
