import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  total: {
    fontSize: 24,
    textAlign: 'center'
  },
  buttonsContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15
  },
  buttonAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 60,
  },
  buttonSingle: {
    width: 150,
    margin: 5,
    backgroundColor: '#1D366C',
    height: 50, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    width: 150,
    height: 100,
    fontSize: 16,
    padding: 5,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    borderColor: '#e7e7e7',
    borderWidth: .5,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 1.5,
    shadowOpacity: .1,
    elevation: 3,
    textAlign: 'center',
    fontSize: 17,
  },
  trashIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: -60,
    bottom: 5
  }
})