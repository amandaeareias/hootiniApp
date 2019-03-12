import { AppRegistry, StyleSheet, Text, View } from 'react-native';


export default styles = StyleSheet.create({
  createDeck: {
    width: 100,
    margin: 10,
    backgroundColor: '#F4F4F4'
  },
  modalView: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 150,
    width: 250,
    margin: 50,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3
  },
  modalInput: {
    height: 50,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    fontSize: 18
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButton: {
    width: 105,
  }
})