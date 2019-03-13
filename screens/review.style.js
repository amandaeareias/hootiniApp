import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  reviewButton: {
    width: 150,
    margin: 5,
    backgroundColor: '#1D366C',
    height: 40, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  RepeatButtonStyle: {
    backgroundColor: '#EB5757',
    width: 120,
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  HardButtonStyle: {
    backgroundColor: '#F2C94C',
    width: 120,
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  OKButtonStyle: {
    backgroundColor: '#6FCF97',
    width: 120,
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  EasyButtonStyle: {
    backgroundColor: '#2196f3',
    width: 120,
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  answerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  cardStyle: {
    backgroundColor: '#FAFAFA',
    width: 300,
    margin: 10,
    height: 150,
    textAlign: 'center',
    padding: 10,
  },
  cardContent: {
    fontSize: 18,
    margin: 10
  }
});


