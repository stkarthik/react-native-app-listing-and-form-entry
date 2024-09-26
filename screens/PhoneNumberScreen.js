import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPhoneNumber } from '../reducers/phoneReducer';

export default function PhoneNumberScreen({ navigation }) {
  const [phoneNumber, setPhoneNumberState] = useState('');
  const dispatch = useDispatch();

  const handlePhoneSubmit = () => {
    dispatch(setPhoneNumber(phoneNumber));
    navigation.navigate('Listing');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumberState}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Submit" onPress={handlePhoneSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});