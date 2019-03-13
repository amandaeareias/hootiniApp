import React, { Component } from 'react';
import { Text, Button, View, Modal, TextInput, Alert, TouchableHighlight, ScrollView } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User'
import DeckList from '../components/DeckList'
import decksStyle from './Decks.style'
import styles from './Decks.style';

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
      id
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
      name
    }
  }
`;


const DELETE_DECK_MUTATION = gql`
  mutation deleteDeck($id: ID!) {
    deleteDeck(data: { id: $id }) {
      id
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
    this.setState({ dialogOpen: !this.state.dialogOpen, newDeckName: '' }, () => console.log('dialog toggled!'));
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Decks',
      headerRight: <Mutation mutation={SIGNOUT_MUTATION}>{(signout, { client }) => (
        <Button title="Log out"
          color='#1D366C'
          onPress={() => {
          handleClick(signout, client);
          navigation.navigate('Home')
        }} />
      )}</Mutation>
    }
  };

  handleSubmit = async (createDeck) => {
    this.setState({ dialogOpen: !this.state.dialogOpen }, () => console.log('submit handled'));
    await createDeck({ variables: { name: this.state.newDeckName } }).then(()=> this.setState({newDeckName: ''}));
  };

  selectDeck = (id, deleteDeck) => {
    Alert.alert('Delete Deck', 'Are you sure you want to delete this deck? All cards will be deleted',
      [{ text: 'OK', onPress: () => deleteDeck({ variables: { id: id } }) }, { text: 'Cancel', onPress: () => console.log('Cancel pressed'), style: 'cancel' }]);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableHighlight style={styles.createButton}>
          <Button color="white" onPress={this.toggleDialog} title="Add Deck" />
        </TouchableHighlight>

        <Modal visible={this.state.dialogOpen}
          onRequestClose={this.toggleDialog}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalView}>
            <TextInput style={styles.modalInput} onChangeText={(newDeckName) => this.setState({ newDeckName })} value={this.state.newDeckName} placeholder="Deck Name" />
            <View style={styles.modalButtons}>
              <TouchableHighlight style={styles.modalButtonClose}>
                <Button onPress={this.toggleDialog} title='Close' color='#1D366C' />
              </TouchableHighlight>
              <Mutation mutation={CREATE_DECK_MUTATION} refetchQueries={['allDecks']}>
                {(createDeck, { loading, error }) => (
                  <TouchableHighlight style={styles.modalButtonSave}>
                    <Button color="white" onPress={() => this.handleSubmit(createDeck)} title='Save'/>
                  </TouchableHighlight>
                )}
              </Mutation>
            </View>
          </View>
        </Modal>

        <User>
          {({ data }) => {

            if (data && data.me) {
              return <Query query={ALL_DECKS_QUERY}>

                {({ data }) => {
                  if (data.allDecks && data.allDecks.length > 0) {
                    return <Mutation mutation={DELETE_DECK_MUTATION} refetchQueries={['allDecks']}>
                      {(deleteDeck) => (
                        <DeckList decks={data.allDecks} deleteDeck={deleteDeck} selectDeck={this.selectDeck} navigate={this.props.navigation.navigate} />
                      )}
                    </Mutation>
                  } else {
                    return <Text style={{fontSize: 22, marginTop: 15}}> Start your first deck! </Text>
                  }
                }}
              </Query>
            } else {
              return <Text>Loading…</Text>
            }
          }}
        </User>
      </ScrollView>
    )
  }
}

handleClick = async (signout, client) => {
  await signout();
  await client.resetStore();
}


