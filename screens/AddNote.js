import React, { Component } from 'react';
import { Text, Button, View, ScrollView, Modal, TextInput } from 'react-native';
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';
import Deck from './Deck';

const CREATE_NOTE_MUTATION = gql`
  mutation createNote($noteType: ID!, $deck: ID!, $fields: [NoteFieldCreateInput!]!) {
    createNote(data: { noteType: $noteType, deck: $deck, fields: $fields }) {
      cardsAdded
    }
  }
`;

const SEARCH_NOTETYPES_QUERY = gql`
  query allNoteTypes($name: String!) {
    allNoteTypes(where: { name: $name }) {
      id
      slug
      name
    }
  }
`;

class AddNote extends Component {

  handleSubmit = async (createNote) => {

    const variables = {
      fields: [ { key: 'Front', value: this.state.front }, { key: 'Back', value: this.state.back } ],
      noteType: this.state.noteType,
      deck: this.state.deck
    }
    await createNote({variables});
    this.props.navigation.navigate('Deck', { deck: this.state.deck});
  }

  constructor(props) {
    super(props);
    this.state = {
      front: '',
      back: '',
      noteType: "5c82294a41065d554e009d4a", // do actual query for notetypes and replace hardcoded ID with value we get back
      deck: this.props.navigation.state.params.deck.id
    }
  }

  render() {
    const deck = this.props.navigation.state.params.deck;
    return (
      <Mutation mutation={CREATE_NOTE_MUTATION}>
        {(createNote) => {
          return <View>
          <Text>Deck Name: {deck.name}</Text>
          <TextInput onChangeText={(front) => this.setState({ front })} value={this.state.front} placeholder="Note Front" style={{ height: 200 }} />
          <TextInput onChangeText={(back) => this.setState({ back })} value={this.state.back} placeholder="Note Back" style={{ height: 200 }} />
          
          <Button title="save-note" onPress={() => this.handleSubmit(createNote)}/>
            
          </View>

        }}
      </Mutation>
      )
  }
}


export default AddNote;