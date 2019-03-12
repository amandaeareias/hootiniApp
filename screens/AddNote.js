import React, { Component } from 'react';
import { Text, Button, View, ScrollView, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';
import { Deck } from './Deck';
import styles from './forms.style.js';

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

  static navigationOptions = {
    title: 'Add Note'
  }

  handleSubmit = async (createNote, noteType) => {

    const variables = {
      fields: [{ key: 'Front', value: this.state.front }, { key: 'Back', value: this.state.back }],
      noteType: noteType,
      deck: this.state.deck
    }
    await createNote({ variables });
    this.props.navigation.navigate('Deck', { deck: this.state.deck });
    this.props.navigation.state.params.refetchParent();
  }

  constructor(props) {
    super(props);
    this.state = {
      front: '',
      back: '',
      deck: this.props.navigation.state.params.deck.id
    }
  }

  render() {
    const deck = this.props.navigation.state.params.deck;
    return (
      <View>

        <Mutation mutation={CREATE_NOTE_MUTATION} fetchPolicy="no-cache">

          {(createNote) => {
            return <View style={styles.container}>
              <Text style={styles.FormHeaderLabel}>Deck Name:</Text>
              <Text style={styles.FormHeader}>{deck.name}</Text>
              <Text style={styles.InputLabel}>Front</Text><TextInput blurOnSubmit={true} multiline={true} style={styles.NoteFormInput} onChangeText={(front) => this.setState({ front })} value={this.state.front} />
              <Text style={styles.InputLabel}>Back</Text><TextInput blurOnSubmit={true} multiline={true} style={styles.NoteFormInput} onChangeText={(back) => this.setState({ back })} value={this.state.back} />

              <Query query={SEARCH_NOTETYPES_QUERY} variables={{ name: "Basic" }}>
                {({ loading, error, data: { allNoteTypes = [] } = {} }) => {
                  if (loading) {
                    return <Text>Loading...</Text>
                  }
                  if (error) {
                    return <Text>Error! {error.message}</Text>
                  }
                  return <TouchableHighlight style={styles.ButtonStyle}><Button title="Save Note" color="white" onPress={() => this.handleSubmit(createNote, allNoteTypes[0].id)} /></TouchableHighlight>
                }}
              </Query>

            </View>

          }}
        </Mutation>

      </View>
    )
  }
}


export default AddNote;