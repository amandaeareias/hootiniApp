import React, { Component } from 'react';
import { Text, Button, View, ScrollView, Modal, TextInput } from 'react-native';
import { Mutation, Query, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import User from '../components/User';
import { Deck } from './Deck';

const NOTE_TYPE_QUERY = gql`
  query noteType($id: ID!) {
    noteType(where: { id: $id }) {
      id
      name
      fieldDefinitions {
        key
        type
      }
    }
  }
`;


export default class EditNote extends Component {

  handleSubmit = async (noteType) => {

    const variables = {
      fields: [{ key: 'Front', value: this.state.front }, { key: 'Back', value: this.state.back }],
      noteType: noteType,
      deck: this.state.deck
    }
    await createNote({ variables });
    this.props.navigation.navigate('Deck', { deck: this.state.deck });
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

        <Mutation mutation={CREATE_NOTE_MUTATION}>

          {(createNote) => {
            return <View>
              <Text>Deck Name: {deck.name}</Text>
              <TextInput onChangeText={(front) => this.setState({ front })} value={this.state.front} placeholder="Note Front" style={{ height: 200 }} />
              <TextInput onChangeText={(back) => this.setState({ back })} value={this.state.back} placeholder="Note Back" style={{ height: 200 }} />

              <Query query={SEARCH_NOTETYPES_QUERY} variables={{ name: "Basic" }}>
                {({ loading, error, data: { allNoteTypes = [] } = {} }) => {
                  if (loading) {
                    return <Text>Loading...</Text>
                  }
                  if (error) {
                    return <Text>Error! {error.message}</Text>
                  }
                  return <Button title="save-note" onPress={() => this.handleSubmit(createNote, allNoteTypes[0].id)} />
                }}
              </Query>

            </View>

          }}
        </Mutation>

      </View>
    )
  }
}


}