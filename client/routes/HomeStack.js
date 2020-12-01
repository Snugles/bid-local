import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from '@react-navigation/native';
import React from 'react'
import Home from '../screens/Home';
import Item from '../screens/Item';
// import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

const screens = {
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },
  Item: {
    screen: Item,
    navigationOptions: { headerShown: false },
  },
  // MapScreen: {
  //   screen: MapScreen,
  //   navigationOptions: { headerShown: false },
  // },
};

const HomeStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode = {null}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          
        />
        <Stack.Screen
          name="Item"
          component={Item}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  )


}

export default HomeStack;
