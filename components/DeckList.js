import React from 'react';
import { Text, Button, View, FlatList, ScrollView } from 'react-native';


export default class DeckList extends React.Component {

  render() {
    return (
      <ScrollView>
        {this.props.decks.map(deck => <Text>{deck.name}</Text>)}
      </ScrollView>
    )
  }
}
