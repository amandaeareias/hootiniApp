import { AppRegistry, StyleSheet, Text, View } from 'react-native';


export default styles = StyleSheet.create({
  viewContainer: {
    marginTop: 15,
    display: 'flex',
    alignItems: 'center'
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    marginBottom: 25
  },
  text: {
    fontSize: 22,
    backgroundColor: 'white',
    width: 275,
    paddingTop: 15,
    paddingBottom: 25,
  },
  trashIcon: {
    height: 22,
    width: 20
  }
})