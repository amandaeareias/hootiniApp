import React from 'react';
import { View, TextInput, Button } from 'react-native';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

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

  handleSubmit = (formData) => {
    console.log(formData.name, formData.email, formData.password);
  };

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <User>
      {({ data }) => { if (data && data.me) {
        console.log('hello data works');
        this.props.navigation.navigate('Decks');
      }
      return <Mutation mutation={SIGNUP_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signup) => (
        <View>
          <TextInput onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder="Name" style={{height: 80}}/>
          <TextInput onChangeText={(email) => this.setState({email})} value={this.state.email} placeholder="Email Address" style={{height: 80}}/>
          <TextInput onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder="Password" style={{height: 80}}/>
          {/* <Button title="sign-up" onPress={() => this.handleSubmit(this.state)}>Sign Up</Button> */}
          <Button title="sign-up" onPress={() => signup({variables: this.state})}>Sign Up</Button>

        </View>

        )}
        
      </Mutation>

      }}


      </User>
    )
  }
}