import React, { Component } from 'react';
import { TouchableHighlight, Button, View } from 'react-native';
import styles from '../screens/review.style.js';

class ReviewAnswerButtons extends Component {

  handleClick = (title) => {
    this.props.nextCard(title);
  };

  render() {
 
    return (
      <View style={styles.container}>
      <TouchableHighlight style={styles.RepeatButtonStyle}>
        <Button
          title="NO IDEA"
          onPress={() => this.handleClick("REPEAT")}
          color= "white"
        />
        </TouchableHighlight>

        <TouchableHighlight style={styles.HardButtonStyle}>
          <Button
            title="HARD"
            onPress={() => this.handleClick("HARD")}
            color= "white"
          />
        </TouchableHighlight>

        <TouchableHighlight style={styles.OKButtonStyle}>
          <Button title="OK" onPress={() => this.handleClick("OK")} color= "white"/>
        </TouchableHighlight>

        <TouchableHighlight style={styles.EasyButtonStyle}>
          <Button title="EASY" onPress={() => this.handleClick("EASY")} color= "white"/>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ReviewAnswerButtons;
