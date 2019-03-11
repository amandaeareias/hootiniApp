import React, { Component } from 'react';
import { Text, Button, ScrollView, View, Modal, TextInput } from 'react-native';
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
    let button;
    if (navigation.getParam('dueCards') > 0) {
      button = <Button title="Review" onPress={() => {
     navigation.navigate('Review', {slug: navigation.getParam('slug')})
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
      toggleCardBack: false,
      dueCards: 0,
      dummyState: 0
    }
  }


  reloadComponent = () => {
    this.setState({dummyState: this.state.dummyState + 1}, () => console.log(this.state.dummyState))
    // this.props.navigation.setParams({ dueCards: 0 });
    // this.props.navigation.setParams({ dueCards: this.state.dueCards });
  }

  cardFlip = () => {
    this.setState({toggleCardBack: !this.state.toggleCardBack}, () => console.log('card flipped'))
    // problem - all cards are getting flipped at once. two ways to solve - only show front side, or change the value of each card clicked
  }

    render() {
      const slug = this.props.navigation.getParam('slug');

      return (
        <User>
          {({data}) => {
            console.log(data);
            if (data && data.me) {
              return <Query query={DECK_QUERY} variables={{ slug }}>
              {( {data, loading, error, refetch} )  => {
                
                const { deck } = data;
                console.log(data);
               
                if (loading) {
                  return <Text>Loading Cards...</Text>
                }
                if (error) {
                  return <Text>Sorry there was a problem loading your cards!</Text>
                }

                if(deck) {
                  let reviewButton;
                  if (deck.cardsDue > 0) {
                    reviewButton = <Button title="Start Review" onPress={() => this.props.navigation.navigate('Review', {slug: this.props.navigation.getParam('slug')})} />
                  }
                
                return <ScrollView>
                  <Text>Total: {deck.cardsTotal}</Text><Text>Due: {deck.cardsDue}</Text>
                  <Text>
                  {deck.name}
                  </Text>

                  <ScrollView>

                  <Button title="Add New Note" onPress={() => this.props.navigation.navigate('AddNote', { deck: deck, reloadComponent: this.reloadComponent, refetchParent: refetch})}/>

                  {reviewButton}
                   
                  <Query query={DUE_CARDS_QUERY} variables={{ deckSlug: slug, when: new Date().setFullYear(new Date().getFullYear() + 1)}}>
                    {({ data, error, loading, refetch }) => {
                      if (loading) {
                        refetch()
                        return <Text>Loading...</Text>
                      }
                      if (error) {
                        return <Text>Error! {error.message}</Text>;
                      }
                      const { allCards } = data;

                      const cards = allCards.map((note) => {
                         
                          return <Text key={note.id} style={{margin: 10, width: 100, height: 100, fontSize: 10, padding: 10, backgroundColor: '#DEDEDE'}}>{note.fields[0].value}</Text>;
                        
                      })

                      return cards;

                        {/* if (!this.state.toggleCardBack) {
                          return <Text onPress={this.cardFlip} key={note.id} style={{margin: 10, width: 100, height: 100, fontSize: 10, padding: 10, backgroundColor: '#DEDEDE'}}>{note.fields[0].value}</Text>;
                        } else {
                          return <Text onPress={this.cardFlip} key={note.id} style={{margin: 10, width: 100, height: 100, fontSize: 10, padding: 10, backgroundColor: '#DEDEDE'}}>{note.fields[1].value}</Text>;
                        }
                      });

                      return cards; */}

                    
                    }}
                  </Query>

                  </ScrollView>

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