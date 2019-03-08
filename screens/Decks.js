import React from 'react';
import {Text } from 'react-native';

export default class Decks extends React.Component {
  static navigationOptions = {
    title: 'My Decks',
  };

  render() {
    return (
      <Text>Decks work!!!</Text>
    )
  }
}