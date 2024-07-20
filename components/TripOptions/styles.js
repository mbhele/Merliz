import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
