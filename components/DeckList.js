import React from 'react';
import { Text, Button, View, FlatList, ScrollView } from 'react-native';


export default class DeckList extends React.Component {

  render() {
    return (
      <ScrollView>
        {this.props.decks.map(deck => <Text slug={deck.slug} onPress={() => this.props.navigate('Deck', {slug: deck.slug})} key={deck.slug} style={{margin: 10, fontSize: 20, padding: 10, backgroundColor: '#DEDEDE'}}>{deck.name}</Text>)}
      </ScrollView>
    )
  }
}
