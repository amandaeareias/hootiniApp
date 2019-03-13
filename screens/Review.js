import React, { Component } from 'react';
import { Text, Button, ScrollView, Modal, TextInput } from 'react-native';
import { Query } from 'react-apollo';
import { DUE_CARDS_QUERY } from './Deck'
import User from '../components/User'
import Card from '../components/Card'

export default class Review extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.slug
    }
  }

  render() {
    const slug = this.props.navigation.state.params.slug;
    
    let alltheCards = [];
    if (this.props.navigation.state.params.allCards) {
      alltheCards = this.props.navigation.state.params.allCards;
    }
    return (
      <User>
        {({ data, error, loading }) => {
          if (loading) {
            return <Text>Loading...</Text>
          }
          if (error) {
            return <Text>{error.message}</Text>
          }
          return <Query query={DUE_CARDS_QUERY} variables={{ deckSlug: slug, when: Date.now() }}>
            {({ data, error, loading }) => {
              if (loading) {
                return <Text>Loading...</Text>
              }
              if (error) {
                return <Text>Error! {error.message}</Text>;
              }
              const { allCards } = data;

            
              if (allCards.length) {
                return <Card duecards={allCards} slug={slug} refetchParent={this.props.navigation.state.params.refetchParent} navigation={this.props.navigation}></Card>
              } else {
                return <Card duecards ={alltheCards} slug={slug} refetchParent={this.props.navigation.state.params.refetchParent} navigation={this.props.navigation}></Card>
              }

            }}
          </Query>
        }}
      </User>
    )
  }
}