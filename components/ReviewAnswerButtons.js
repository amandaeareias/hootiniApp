import React, { Component } from 'react';
import { Text, Button, ScrollView, Modal, TextInput, View } from 'react-native';


// const ButtonBox = styled('div')({
//   position: 'fixed',
//   bottom: '5rem',
//   display: 'flex',
//   justifyContent: 'space-between',
//   width: '90vw',
//   maxWidth: 400,
//   '& > button': {
//     width: '5rem'
//   }
// });

class ReviewAnswerButtons extends Component {
  // static defaultProps = {
  //   onAnswer: answer => console.log(answer)
  // };

  handleClick = (title) => {
    this.props.nextCard(title);
  };

  render() {
    // const { onAnswer: _, ...buttonProps } = this.props;

    return (
      <View>
        <Button
          title="NO IDEA"
          onPress={() => this.handleClick("REPEAT")}
          color= 'red'
        />
        <Button
          title="HARD"
          onPress={() => this.handleClick("HARD")}
          color = 'orange'
        />
        <Button title="OK" onPress={() => this.handleClick("OK")} color='yellow'/>
        <Button title="EASY" onPress={() => this.handleClick("EASY")} color ='green'/>
      </View>
    );
  }
}

export default ReviewAnswerButtons;
