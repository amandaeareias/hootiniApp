import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 25,
  },
  TextInput: {
    height: 60,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
    fontSize: 18
  },
  ButtonStyle: {
    backgroundColor: 'rgb(3, 30, 94)',
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  InputLabel: {
    fontSize: 14,
    color:'rgb(3, 30, 94)',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  FormHeader: {
    fontSize: 24,
    color: 'black',
    fontWeight: '800'
  },
  FormHeaderLabel: {
    alignSelf: 'center',
    marginBottom: 5,
    color: 'gray',
  },
  NoteFormInput: {
    backgroundColor: '#E7E7E7',
    borderBottomWidth: 1,
    borderColor: 'rgb(3, 30, 94)',
    height: 150,
    width: 320,
    marginBottom: 10
  }


});