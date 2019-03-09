import React, { Component } from 'react';
import { Text, Button, View, Modal, TextInput } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User'
import DeckList from '../components/DeckList'


const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;

const ALL_DECKS_QUERY = gql`
  query allDecks {
    allDecks {
      slug
      name
      cardsTotal
      cardsDue
    }
  }
`;

const CREATE_DECK_MUTATION = gql`
  mutation createDeck($name: String!) {
    createDeck(data: { name: $name }) {
      slug
    }
  }
`;

export default class Decks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      newDeckName: ''
    }
  }

  toggleDialog = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen }, () => console.log('dialog toggled!'));
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Decks',
      headerRight: <Mutation mutation={SIGNOUT_MUTATION}>{(signout, { client }) => (
        <Button title="Log out" onPress={() => {
          handleClick(signout, client);
          navigation.navigate('Home')
        }} />
      )}</Mutation>
    }
  };

  handleSubmit = async (createDeck) => {
    console.log('name of hte deck', this.state.newDeckName)
    this.setState({ dialogOpen: !this.state.dialogOpen }, () => console.log('submit handled'));
    const {
      data: {
        createDeck: { slug }
      }
    } = await createDeck({ variables: this.state.newDeckName });
    // Wait until the refetch finishes and go to new deck's page
    // await wait();
    // navigate(`/deck/${slug}`);
  };

  render() {
    return (
      <View>

        <Modal visible={this.state.dialogOpen}
          onRequestClose={this.toggleDialog}
          transparent={true}
          animationType="slide"
        >
          <View style={{ height: 180, width: 250, margin: 50, padding: 15, backgroundColor: 'green' }}>
            <Text onPress={this.toggleDialog}>X</Text>
            <TextInput onChangeText={(newDeckName) => this.setState({ newDeckName })} value={this.state.newDeckName} placeholder="New Deck Name" style={{ height: 40 }} />
            <Mutation mutation={CREATE_DECK_MUTATION} refetchQueries={['allDecks']}>
              {(createDeck, { loading, error }) => (
                <Button onPress={() => this.handleSubmit(createDeck)} title='Save' />
              )}
            </Mutation>
          </View>
        </Modal>

        <User>
          {({ data, loading }) => {
            if (data && data.me) {
              return <Query query={ALL_DECKS_QUERY}>
                {({ data }) => {
                  if (data.length > 0) {
                    console.log('you have decks')
                    return <DeckList decks={data} />
                  } else {
                    console.log('you have no decks')
                    return <Text> Start your first deck! </Text>
                  }
                }}
              </Query>
            }
          }}
        </User>
        <Button onPress={this.toggleDialog} title="Create Deck" />
      </View>
    )
  }
}

handleClick = async (signout, client) => {
  await signout();
  await client.resetStore();
}


