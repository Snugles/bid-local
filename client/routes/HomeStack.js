import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Home from '../screens/Home';
import Item from '../screens/Item';
import AddItem from '../screens/AddItem'
import UsersItems from '../screens/UsersListedItems'

const Stack = createStackNavigator();

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
        <Stack.Screen
          name="AddItem"
          component={AddItem}
        />
        <Stack.Screen
          name="UsersItems"
          component={UsersItems}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )


}

export default HomeStack;

