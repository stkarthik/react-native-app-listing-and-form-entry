import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../reducers/addressReducer';

// Form validation schema
const AddressSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
});

export default function AddAddressScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { address } = route.params || {};  // Get address from navigation params (if editing)

  return (
    <Formik
      initialValues={{ address: address ? address.address : '' }}  // Pre-fill the form if editing
      validationSchema={AddressSchema}
      onSubmit={(values) => {
        if (address) {
          dispatch(updateAddress({ id: address.id, address: values.address }));
        } else {
          dispatch(addAddress({ id: Date.now().toString(), address: values.address }));
        }
        navigation.navigate('Listing');  // Navigate back to the listing screen
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Enter Address"
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
            style={styles.input}
          />
          {/* Display validation error if address is not valid */}
          {errors.address && touched.address ? (
            <Text style={styles.errorText}>{errors.address}</Text>
          ) : null}

          {/* Render the Submit/Update button */}
          <View style={styles.buttonContainer}>
            <Button
              title={address ? 'Update' : 'Submit'}  // If editing, show "Update"; otherwise "Submit"
              onPress={handleSubmit}  // Trigger form submission
            />
          </View>
        </View>
      )}
    </Formik>
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});