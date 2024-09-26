import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAddress } from '../reducers/addressReducer';
import { Swipeable } from 'react-native-gesture-handler';

export default function ListingScreen({ navigation }) {
  const addresses = useSelector((state) => state.addresses);
  const dispatch = useDispatch();
  const swipeableRefs = useRef([]);

  const renderLeftActions = (item) => (
    <TouchableOpacity
      style={styles.leftAction}
      onPress={() => navigation.navigate('AddAddress', { address: item })}
    >
      <Text style={styles.actionText}>Edit</Text>
    </TouchableOpacity>
  );

  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.rightAction}
      onPress={() => dispatch(deleteAddress(item.id))}
    >
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  // Render each address item
  const renderAddress = ({ item, index }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[index] = ref)}
      renderLeftActions={() => renderLeftActions(item)}
      renderRightActions={() => renderRightActions(item)}
      onSwipeableClose={() => {
        swipeableRefs.current[index]?.close(); 
      }}
    >
      <View style={styles.listItem}>
        <Text>{item.address}</Text>
      </View>
    </Swipeable>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      swipeableRefs.current.forEach((swipeableRef) => swipeableRef?.close());
    });

    return unsubscribe;
  }, [navigation]);

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
  leftAction: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
  },
  actionText: {
    color: 'white',
    padding: 20,
    fontWeight: 'bold',
  },
});