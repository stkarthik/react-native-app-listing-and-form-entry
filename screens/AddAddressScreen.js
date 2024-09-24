import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function AddAddressScreen({ navigation }) {
  const validationSchema = Yup.object({
    address: Yup.string().required('Address is required'),
  });

  const addAddress = (values) => {
    axios.post('https://jsonplaceholder.typicode.com', values)
      .then(() => navigation.goBack())
      .catch(error => console.error(error));    
  };

  return (
    <Formik
      initialValues={{ address: '' }}
      validationSchema={validationSchema}
      onSubmit={addAddress}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            placeholder="Enter Address"
            value={values.address}
            onChangeText={handleChange('address')}
          />
          {errors.address && <Text>{errors.address}</Text>}
          <Button title="Add Address" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}