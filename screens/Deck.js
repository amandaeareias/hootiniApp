import React, { Component } from 'react';
import { Text, Button, ScrollView, Modal, TextInput } from 'react-native';
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User'
import DeckList from '../components/DeckList'

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

class Deck extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('slug', 'Slug')
    }
  }

    render() {
      const slug = this.props.navigation.getParam('slug');

      return (
        <User>
          {({data}) => {
            if (data && data.me) {
            {/* console.log('user data', data) */}
            return <Query query={DECK_QUERY} variables={{ slug }}>

              {( {data, loading, error} )  => {
                {/* console.log('deck data', data) */}
                const { deck } = data;
                if (loading) {
                  return <Text>Loading Cards...</Text>
                }

                if (error) {
                  return <Text>Sorry there was a problem loading your cards!</Text>
                }
                
                if(deck) {
                  console.log('deck: ', deck)
                return <ScrollView>
                  <Text>Total: {deck.cardsTotal}</Text><Text>Due: {deck.cardsTotal}</Text>
                  <Text>
                  {deck.name}
                  </Text>
                  <Button title="Add New Note" onPress={()=> console.log('add new note button pressed')}/>
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

export default Deck;