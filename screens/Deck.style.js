import { StyleSheet} from 'react-native';


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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonSingle: {
    width: 150,
    margin: 5,
    backgroundColor: '#1D366C',
    height: 40, 
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
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    width: 100,
    height: 70,
    fontSize: 10,
    padding: 5,
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
    height: 15,
    width: 14
  }
})