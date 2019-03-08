import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignUp from './SignUp'
import SignIn from './SignIn'

import { createStackNavigator } from 'react-navigation'

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn }
}));

// const AppNavigator = createStackNavigator({

//     Home: HomeScreen,
//     SignUp: { screen: SignUp },
//     SignIn: { screen: SignIn }
//   },
//   {
//     initialRouteName: 'Home'

// })

// export default AppNavigator;
