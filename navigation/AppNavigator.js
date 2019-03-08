import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import HomeScreen from '../screens/HomeScreen';
import Decks from '../screens/Decks';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: MainTabNavigator,
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Home: { screen: HomeScreen },
  Decks: { screen: Decks },
  headerMode: 'screen'
}));



