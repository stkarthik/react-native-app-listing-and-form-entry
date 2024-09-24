import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ListingScreen from './screens/ListingScreen';
import AddAddressScreen from './screens/AddAddressScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Listing" component={ListingScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}