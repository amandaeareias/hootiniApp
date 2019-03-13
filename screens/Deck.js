import React, { Component } from 'react';
import { Text, Button, ScrollView, View, TouchableHighlight, Image, Alert } from 'react-native';
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';
import styles from './Deck.style'

const DECK_QUERY = gql`
  query Deck($slug: String!) {
    deck(where: { slug: $slug }) {
      id
      slug
      name
      cardsTotal
      cardsDue
      lastNoteType {
        id
        slug
        name
      }
    }
  }
`;

export const DUE_CARDS_QUERY = gql`
  query allCards($deckSlug: String!, $when: DateTime!) {
    allCards(where: { deckSlug: $deckSlug, dueTime_lt: $when }) {
      id
      fields {
        key
        value
      }
      template {
        front
        back
      }
    }
  }
`;

const DELETE_CARD_MUTATION = gql`
  mutation deleteCard($id: ID!) {
    deleteCard(data: { id: $id }) {
      id
    }
  }
`;


export class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    let button;
    if (navigation.getParam('dueCards') > 0) {
      button = <Button title="Review" onPress={() => {
        navigation.navigate('Review', { slug: navigation.getParam('slug') })
      }} />
    }

    return {
      title: navigation.getParam('slug', 'Slug'),
      headerRight: button
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      dueCards: 0,
      dummyState: 0
    }

    this.refetchDeck = () => {};
    this.refetchDueCards = () => {};
    
  }

  deleteCard = async (deleteCard, card) => {
    Alert.alert('Delete Card', 'Are you sure you want to delete this card?',
      [{ text: 'OK', onPress: () =>deleteCard({ variables: { id: card.id } }) }, { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' }]);
  }

  refetchData = () => {
    this.refetchDeck();
    this.refetchDueCards();
  }

  render() {
    const slug = this.props.navigation.getParam('slug');

    return (
      <User>
        {({ data }) => {
          if (data && data.me) {
            
            return <Query query={DECK_QUERY} variables={{ slug }}>
              {({ data, loading, error, refetch }) => {
                this.refetchDeck = refetch;
                const { deck } = data;
                if (loading) { return <Text>Loading Cards...</Text>}
                if (error) {  return <Text>Sorry there was a problem loading your cards!</Text> }
                if (deck) {
                  let reviewButton;
                  if (deck.cardsDue > 0) {
                    reviewButton = <TouchableHighlight style={styles.buttonSingle}><Button color='white' title="Start Review" onPress={() => this.props.navigation.navigate('Review', { slug: this.props.navigation.getParam('slug'), refetchParent: this.refetchData })} /></TouchableHighlight>
                  }

                  return <ScrollView style={styles.container}>
                    <Text style={styles.total}>Total: {deck.cardsTotal} | Due: {deck.cardsDue}</Text>

                    <View style={styles.buttonsContainer}>
                      <View style={styles.buttonAdd}>
                        <Image source={require('../assets/add.png')} style={{width: 25, height: 25}}/>
                        <Button color='#1D366C' title="Add Note" onPress={() => this.props.navigation.navigate('AddNote', { deck: deck, refetchParent: this.refetchData})} />
                      </View>
                      {reviewButton}
                    </View>

                    <Query query={DUE_CARDS_QUERY} variables={{ deckSlug: slug, when: new Date().setFullYear(new Date().getFullYear() + 1) }}>
                      {({ data, error, loading, refetch }) => {
                        this.refetchDueCards = refetch;
                        if(!data.allCards) data.allCards = [];
                        if (error) {
                          return <Text>Error! {error.message}</Text>;
                        } else {
                          const { allCards } = data;
                          const cards = allCards.map((card) => {
                            return <Mutation mutation={DELETE_CARD_MUTATION} refetchQueries={['Deck']} key={card.id}>
                              {(deleteCard) => {
                                return <View style={styles.card}>
                                  <Text key={card.id} >
                                    {card.fields[0].value.length > 5 ? card.fields[0].value.slice(0, 10) + '...' : card.fields[0].value}
                                  </Text>
                                  <TouchableHighlight onPress={() => this.deleteCard(deleteCard, card)}>
                                    <Image source={require('../assets/trash.png')} style={styles.trashIcon} key={card.id} />
                                  </TouchableHighlight>
                                </View>
                              }}
                            </Mutation>
                          })

                          return <View style={styles.cardsContainer}>{cards}</View>

                        }
                      }}
                    </Query>


                  </ScrollView>
                } else {
                  return <Text>Loading Cards...</Text>
                }

              }
              }
            </Query>
          } else {
            return <Text>Loading Cards...</Text>
          }
        }}
      </User>
    )
  }

}