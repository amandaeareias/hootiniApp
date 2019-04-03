import React, { Component } from 'react';
import { FormLabel, FormValidationMessage } from 'react-native-elements'

class SignInComp extends Component {
  render() {
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormValidationMessage>Error message</FormValidationMessage>
      </View>
    )
  }
};

export default SignInComp;