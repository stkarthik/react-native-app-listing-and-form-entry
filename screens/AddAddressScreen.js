import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addAddress } from '../reducers/addressReducer';

const AddressSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
});

let idCounter = 0;

function generateId() {
  idCounter += 1;
  return idCounter.toString();
}

export default function AddAddressScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ address: '' }}
      validationSchema={AddressSchema}
      onSubmit={(values) => {
        dispatch(addAddress({ id: generateId(), address: values.address }));
        navigation.navigate('Listing');
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
          {errors.address && touched.address ? (
            <Text style={styles.errorText}>{errors.address}</Text>
          ) : null}
          <Button title="Submit" onPress={handleSubmit} />
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
  },
});