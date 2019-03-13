import React, { Component } from 'react';
import { Text, Button, TouchableHighlight, View } from 'react-native';
import ReviewAnswerButtons from './ReviewAnswerButtons'
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';
import styles from '../screens/review.style.js';

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
    this.props.refetchParent();
    this.props.navigation.navigate('Deck', { deck: this.props.slug });
  }

  showButton = () => {
    if (this.state.isReviewOver) {
      return <TouchableHighlight style={styles.reviewButton}>
        <Button color="white" onPress={this.back} title="Back to Deck" />
      </TouchableHighlight>
    } else {
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
      cardView = 
      <View style={styles.answerContainer}>
        <Text style={styles.cardStyle}>FRONT: {"\n"}<Text style={styles.cardContent}>{front}</Text></Text>
        <TouchableHighlight style={styles.reviewButton}>
          <Button title='Show answer' color="white" onPress={this.showAnswer} />
        </TouchableHighlight>
      </View>
    } else {
      cardView = 
      <View style={styles.answerContainer}>
        <Text style={styles.cardStyle}>FRONT: {"\n"}<Text style={styles.cardContent}>{front}</Text></Text>
        <Text style={styles.cardStyle} >BACK: {"\n"}<Text style={styles.cardContent}>{back}</Text></Text>
        <View>{this.showButton()}</View>
      </View>
    }

    return (
      <User>
        {({ data }) => {
          if (data && data.me) {
            return <View>{cardView}</View>
          } else {
            return <Text>There was an error</Text>
          }
        }}
      </User>
    )
  }
}