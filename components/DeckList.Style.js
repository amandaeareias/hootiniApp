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
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 25,
    borderStyle: 'solid',
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    marginBottom: 25
  },
  text: {
    fontSize: 22
  },
  trashIcon: {
    height: 22,
    width: 20
  }
})