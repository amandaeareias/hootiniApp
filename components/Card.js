import React, { Component } from 'react';
import { Text, Button, ScrollView, Modal, TextInput, View } from 'react-native';
import ReviewAnswerButtons from './ReviewAnswerButtons'
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';



const REVIEW_CARD_MUTATION = gql`
  mutation reviewCard($id: ID!, $answer: ReviewAnswer!) {
    reviewCard(data: {id: $id, timeOfReview: ${Date.now()}, answer: $answer}) {
      due
    }
  }
`;

export default class Card extends Component {

  state = {
    timeboxStart: Date.now(),
    currentCard: 0,
    isAnswerShown: false,
    cards: this.props.cards,
    isReviewOver: false
  };

  showAnswer = () => {
    this.setState({ isAnswerShown: true })
  }

  nextCard = async ({reviewCard, title}) => {

    await reviewCard({ variables: { id: this.state.cards[this.state.currentCard].id, answer: title } });

    if (this.state.currentCard !== this.state.cards.length - 1) {
      this.setState({
        currentCard: this.state.currentCard + 1,
        isAnswerShown: false,
      })
    } else {
      this.setState({
        isReviewOver: true
      })
    }

    return
  }

  back = () => {
    this.props.navigation.navigate('Deck', { deck: this.props.slug });
  }

  showButton = () => {
    if (this.state.isReviewOver) {
      return <Button onPress={this.back} title="Back to Deck" />
    } else {
      // return <Button onPress={this.nextCard} title="Next" />
      return <Mutation mutation={REVIEW_CARD_MUTATION}>
        {(reviewCard) => (
          <ReviewAnswerButtons nextCard={(title) => this.nextCard({reviewCard, title})} />
        )}
      </Mutation>
    }
  }

  render() {
    const cards = this.props.cards
    const front = cards[this.state.currentCard].fields[0].value
    const back = cards[this.state.currentCard].fields[1].value
    let cardView;

    if (!this.state.isAnswerShown) {
      cardView = <View>
        <Text>FRONT: {front}</Text>
        <Button title='Show answer' onPress={this.showAnswer} />
      </View>
    } else {
      cardView = <View>
        <Text>FRONT: {front}</Text>
        <Text>BACK: {back}</Text>
        <View>{this.showButton()}</View>
      </View>
    }

    return (
      <User>
        {({ data }) => {
          if (data && data.me) {
            return <View>{cardView}</View>
          }
        }}
      </User>
    )
  }
}