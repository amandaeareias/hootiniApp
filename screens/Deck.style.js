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
  buttonSingle: {
    width: 150,
    margin: 5
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
    margin: 5,
    width: 90,
    height: 60,
    fontSize: 10,
    padding: 5,
    // paddingTop: 13,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3,
    textAlign: 'center',
    fontSize: 17,
  },
  trashIcon: {
    height: 15,
    width: 14
  }
})