import React, { Component } from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class SignInComp extends Component {
  render() {
    return (
      <View>
        <FormLabel>Name</FormLabel>
        {/* <FormInput onChangeText={someFunction} /> */}
        <FormValidationMessage>Error message</FormValidationMessage>
      </View>
    )
  }
};

export default SignInComp;