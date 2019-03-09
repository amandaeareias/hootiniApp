import React from 'react';
import { Text, Button, View, FlatList } from 'react-native';


export default class SettingsScreen extends React.Component {

  render() {
    return (
      <FlatList>
        {decks.map(deck => {
          console.log('deck:', deck)
          return (<Text>{deck}</Text>)
        })}
      </FlatList>
    )
  }
}
