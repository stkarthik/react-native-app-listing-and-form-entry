import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneNumberScreen from './screens/PhoneNumberScreen';
import ListingScreen from './screens/ListingScreen';
import AddAddressScreen from './screens/AddAddressScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PhoneNumber">
          <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
          <Stack.Screen name="Listing" component={ListingScreen} />
          <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}