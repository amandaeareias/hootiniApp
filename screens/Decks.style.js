import { AppRegistry, StyleSheet, Text, View } from 'react-native';


export default styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  createButton: {
    width: 150,
    margin: 10,
    marginTop: 20,
    height: 50, 
    backgroundColor: '#1D366C', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5  
  },
  modalView: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 150,
    width: 250,
    margin: 50,
    marginTop: 150,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: .2,
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
    justifyContent: 'space-between',
  },
  modalButtonClose: {
    width: 105,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButtonSave: {
    width: 105,
    height: 50,
    backgroundColor: '#1D366C',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})