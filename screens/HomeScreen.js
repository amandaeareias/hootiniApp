import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  Button,
  ImageBackground
} from 'react-native';

import styles from './homescreen.style.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/doodles.png')} style={styles.BackgroundImage}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Image source={require('../assets/images/logo.png')} style={styles.Image} />
          <Text style={styles.tagline}>Remember anything, forever.</Text>
          <TouchableHighlight style={styles.ButtonStyle}>
            <Button
              onPress={() => this.props.navigation.navigate('SignUp')}
              title="GET STARTED FOR FREE"
              color="white"
            />
          </TouchableHighlight>
          <Button
            onPress={() => this.props.navigation.navigate('SignIn')}
            title="I ALREADY HAVE AN ACCOUNT"
            color="rgb(3, 30, 94)"
          />
        </View>
      </ImageBackground>
    );
  }

}





