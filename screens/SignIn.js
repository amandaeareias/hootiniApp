import React from 'react';
import { TextInput, Button, View, TouchableHighlight } from 'react-native';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import User from '../components/User'
import styles from './forms.style.js';

const CURRENT_USER_QUERY = gql`
  query me {
    me {
      id
      name
      email
      permissions
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(data: { email: $email, password: $password }) {
      id
      name
      email
      permissions
    }
  }
`;



export default class SignIn extends React.Component {

  static navigationOptions = {
    title: 'Sign In',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <User>
        {({ data }) => {
          if (data && data.me) {
            this.props.navigation.navigate('Decks');
          }
          return <Mutation mutation={SIGNIN_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {(signin) => (
              <View style={styles.container}>
                <TextInput style={styles.TextInput} onChangeText={(email) => this.setState({ email })} value={this.state.email} placeholder="Email Address"  />
                <TextInput style={styles.TextInput} secureTextEntry={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} placeholder="Password"  />
                <TouchableHighlight style={styles.ButtonStyle}>
                  <Button color="white" title="Sign In" onPress={() => signin({ variables: this.state })}>Sign In</Button>
                </TouchableHighlight>
              </View>
            )}
          </Mutation>
        }}

      </User>
    )
  }
}