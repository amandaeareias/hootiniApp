import React from 'react';
import { View, TextInput, Button, TouchableHighlight } from 'react-native';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
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

const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      permissions
    }
  }
`;

const User = props => (
  <Query query={CURRENT_USER_QUERY}>{payload => props.children(payload)}</Query>
);

export default class SignUp extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Sign Up',
      headerLeft: <Button title="Back" onPress={()=> navigation.navigate('Home')}/>
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  submitSignUp = (signup) => {
    return signup({variables: this.state}).then(()=> this.setState({name: '', email: '', password: ''}))
  }

  render() {
    return (
      <User>
        {({ data }) => { if (data && data.me) {
          this.props.navigation.navigate('Decks');
        }
        return <Mutation mutation={SIGNUP_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
          {(signup) => (
          <View style={styles.container}>
            <TextInput style={styles.TextInput} onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder="Name" />
            <TextInput style={styles.TextInput} onChangeText={(email) => this.setState({email})} value={this.state.email} placeholder="Email Address" />
            <TextInput style={styles.TextInput} secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder="Password" />
            <TouchableHighlight style={styles.ButtonStyle}>
              <Button title="Sign Up" color="white" onPress={() => this.submitSignUp(signup)}>Sign Up</Button>
            </TouchableHighlight>
          </View>

          )}

        </Mutation>
        }}
      </User>
    )
  }
}