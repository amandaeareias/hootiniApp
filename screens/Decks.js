import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;

export default class Decks extends Component {
   
  static navigationOptions = ({navigation}) => {
    return {
    title: 'My Decks',
    headerRight: <Mutation mutation={SIGNOUT_MUTATION}>{(signout) => (
      <Button title="Log out" onPress={() => {
        handleClick(signout);
        navigation.navigate('Home')
        }}/>
    )}</Mutation>
    }
  };

  render() {
    return (
      <Text>Decks work!!!</Text>
    )
  }
}

handleClick = async (signout) => {
  await signout();
  // await client.resetStore();
} 


