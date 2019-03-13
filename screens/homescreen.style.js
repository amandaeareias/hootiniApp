import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  Image: {
    width: 300,
    flex: .2,
    resizeMode: 'contain',
    margin: 0,
    padding: 0
  },
  BackgroundImage: { 
    width: '100%',
    height: '100%',
    resizeMode: 'repeat' 
  },
  tagline: {
    fontSize: 18,
    margin: 0,
    marginBottom: 30
  },
  ButtonStyle: {
    backgroundColor: 'rgb(3, 30, 94)',
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  }
});