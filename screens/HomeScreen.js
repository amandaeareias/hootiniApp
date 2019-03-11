import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/doodles.png')} style={{ width: '100%', height: '100%', resizeMode: 'repeat' }}>
        <Image source={require('../assets/images/logo.png')} style={{
          marginTop: 30,
          marginLeft: 30
        }} />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Text>Remember anything, forever.</Text>
          <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title="GET STARTED FOR FREE"
            color="#841584"
          />
          <Button
            onPress={() => this.props.navigation.navigate('SignIn')}
            title="I ALREADY HAVE AN ACCOUNT"
            color="#841584"
          />
        </View>
      </ImageBackground>
    );
  }

}





