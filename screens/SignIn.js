import React from 'react';
import { TextInput, Button, View } from 'react-native';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import User from '../components/User'

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
              <View>
                <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email} placeholder="Email Address" style={{ height: 80 }} />
                <TextInput onChangeText={(password) => this.setState({ password })} value={this.state.password} placeholder="Password" style={{ height: 80 }} />
                <Button title="sign-in" onPress={() => signin({ variables: this.state })}>Sign In</Button>
              </View>
            )}
          </Mutation>
        }}

      </User>
    )
  }
}