import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAddress } from '../reducers/addressReducer';

export default function ListingScreen({ navigation }) {
  const addresses = useSelector((state) => state.addresses);
  const dispatch = useDispatch();

  const renderAddress = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => dispatch(deleteAddress(item.id))}
      style={styles.listItem}
    >
      <Text>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Address" onPress={() => navigation.navigate('AddAddress')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 5,
  },
});