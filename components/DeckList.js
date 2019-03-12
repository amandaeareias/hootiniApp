import React from 'react';
import { Text, Button, View, FlatList, ScrollView, Alert } from 'react-native';


export default class DeckList extends React.Component {

  render() {
    return (
      <ScrollView>
        {this.props.decks.map(deck =>
        <View key={deck.id}>
        <Text slug={deck.slug} onPress={() => this.props.navigate('Deck', {slug: deck.slug})} key={deck.slug} style={{margin: 10, fontSize: 20, padding: 10, backgroundColor: '#DEDEDE'}}>
          {deck.name}
          </Text>
          <Text key={deck.id} onPress={() => {
            this.props.selectDeck(deck.id, this.props.deleteDeck)
            }} style={{fontSize: 18, margin: 10}}>X</Text>

            {/* <Button key={deck.id} onPress={ () => Alert.alert('Delete Deck', 'Are you sure you want to delete this deck? All cards will be deleted', 
    [ { text: 'OK', onPress: () => this.props.selectDeck(deck.id, this.props.deleteDeck)}, { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel'}])} title="X"/> */}

          </View> )
        }
      </ScrollView>
    )
  }
}


