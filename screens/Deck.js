import React, { Component } from 'react';
import { Text, Button, ScrollView, Modal, TextInput } from 'react-native';
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';

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

export class Deck extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('slug', 'Slug'),
      headerRight:
        <Button title="Review" onPress={() => {
          navigation.navigate('Review', {slug: navigation.getParam('slug')})
        }} />
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      toggleCardBack: false
    }
  }

  cardFlip = () => {
    this.setState({toggleCardBack: !this.state.toggleCardBack}, () => console.log('card flipped'))
  }

    render() {
      const slug = this.props.navigation.getParam('slug');

      return (
        <User>
          {({data}) => {
            if (data && data.me) {
              console.log('me: ', data.me)
            return <Query query={DECK_QUERY} variables={{ slug }}>
              {( {data, loading, error} )  => {
                const { deck } = data;
                if (loading) {
                  return <Text>Loading Cards...</Text>
                }
                if (error) {
                  return <Text>Sorry there was a problem loading your cards!</Text>
                }
                if(deck) {
                return <ScrollView>
                  <Text>Total: {deck.cardsTotal}</Text><Text>Due: {deck.cardsDue}</Text>
                  <Text>
                  {deck.name}
                  </Text>

                  <ScrollView>

                  <Query query={DUE_CARDS_QUERY} variables={{ deckSlug: slug, when: new Date().setFullYear(new Date().getFullYear() + 1)}}>
                    {({ data, error, loading }) => {
                      if (loading) {
                        return <Text>Loading...</Text>
                      }
                      if (error) {
                        return <Text>Error! {error.message}</Text>;
                      }
                      const { allCards } = data;

                      const cards = allCards.map(note => {
                        if (!this.state.toggleCardBack) {
                          return <Text onPress={this.cardFlip} key={note.id} style={{margin: 10, width: 50, height: 50, fontSize: 10, padding: 10, backgroundColor: '#DEDEDE'}}>{note.fields[0].value}</Text>;
                        } else {
                          return <Text onPress={this.cardFlip} key={note.id} style={{margin: 10, width: 50, height: 50, fontSize: 10, padding: 10, backgroundColor: '#DEDEDE'}}>{note.fields[1].value}</Text>;
                        }
                      });

                      return cards;
                    }}
                  </Query>

                  </ScrollView>

                  <Button title="Add New Note" onPress={() => this.props.navigation.navigate('AddNote', { deck: deck})}/>
                </ScrollView>
                } else {
                  return <Text>Loading Cards...</Text>
                }

              }
              }
              </Query>
            }
          }}
        </User>
      )
    }

}