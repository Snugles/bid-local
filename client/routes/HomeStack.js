import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from '../screens/Home';
import Item from '../screens/Item';
import AddItem from '../screens/AddItem';
import UsersItems from '../screens/UsersListedItems';
import Login from '../screens/Login';
import UserInfo from '../screens/UserInfo';

const Stack = createStackNavigator();

const HomeStack = ({ setEmail, email }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={null}>
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ email: email }}
        />
        <Stack.Screen
          name="Item"
          component={Item}
          initialParams={{ email: email }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          initialParams={{ email: email }}
        />
        <Stack.Screen
          name="UsersItems"
          component={UsersItems}
          initialParams={{ email: email }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ email: email, setEmail: setEmail }}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          initialParams={{ email: email }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
