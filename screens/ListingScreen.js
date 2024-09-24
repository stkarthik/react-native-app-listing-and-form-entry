import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ListingScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Fetch the list of addresses from API
    axios.get('https://example.com/api/addresses')
      .then(response => setAddresses(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteAddress = (id) => {
    axios.delete(`https://example.com/api/addresses/${id}`)
      .then(() => setAddresses(prev => prev.filter(addr => addr.id !== id)))
      .catch(error => console.error(error));
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity onLongPress={() => deleteAddress(item.id)}>
      <Text>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderAddress}
      />
      <Button title="Add New Address" onPress={() => navigation.navigate('AddAddress')} />
    </View>
  );
}