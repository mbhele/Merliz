// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  tripDetailsContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 10,
    width: '95%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tripHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  movingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
export default styles;
