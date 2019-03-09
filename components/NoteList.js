import React from 'react';
import { Text, Button, View, FlatList, ScrollView } from 'react-native';


export default class NoteList extends React.Component {

  render() {
    return (
      <ScrollView>
        {this.props.notes.map(note => <Text key={note._id} style={{margin: 10, width: 50, height: 50, fontSize: 10, padding: 10, backgroundColor: '#DEDEDE'}}>{note.fields[0].value}</Text>)}
      </ScrollView>
    )
  }
}