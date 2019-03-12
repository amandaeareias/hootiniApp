import React from 'react';
import { Text, View, ScrollView, Image, TouchableHighlight } from 'react-native';
import styles from './DeckList.Style'

export default class DeckList extends React.Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.viewContainer}>
        {this.props.decks.map(deck =>
          <View style={styles.view} key={deck.id}>
            <Text style={styles.text} slug={deck.slug} onPress={() => this.props.navigate('Deck', { slug: deck.slug })} key={deck.slug}>
              {deck.name}
            </Text>
            <TouchableHighlight onPress={() => this.props.selectDeck(deck.id, this.props.deleteDeck)}>
              <Image source={require('../assets/trash.png')} style={styles.trashIcon} key={deck.id} />
            </TouchableHighlight>
          </View>)
        }
      </ScrollView>
    )
  }
}


