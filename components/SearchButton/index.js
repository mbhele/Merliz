import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles';

const SearchButton = ({ onPress }) => (
  <View style={styles.buttonContainer}>
    <Button title="Start the trip" onPress={onPress} color="#000" />
  </View>
);

export default SearchButton;
