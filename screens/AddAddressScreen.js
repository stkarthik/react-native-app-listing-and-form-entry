import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../reducers/addressReducer';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const AddressSchema = Yup.object().shape({
  line1: Yup.string().required('Line 1 is required'),
  line2: Yup.string(),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  landmark: Yup.string().required('Landmark is required'),
});

export default function AddAddressScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { address } = route.params || {};

  return (
    <Formik
      initialValues={{
        line1: address ? address.line1 : '',
        line2: address ? address.line2 : '',
        street: address ? address.street : '',
        city: address ? address.city : '',
        landmark: address ? address.landmark : '',
      }}
      validationSchema={AddressSchema}
      onSubmit={(values) => {
        const fullAddress = `${values.line1}, ${values.line2}, ${values.street}, ${values.city}, ${values.landmark}`;
        if (address) {
          dispatch(updateAddress({ id: address.id, address: fullAddress }));
        } else {
          dispatch(addAddress({ id: Date.now().toString(), address: fullAddress }));
        }
        navigation.navigate('Listing');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon name="home" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter Line 1"
              onChangeText={handleChange('line1')}
              onBlur={handleBlur('line1')}
              value={values.line1}
              style={styles.input}
            />
            {errors.line1 && touched.line1 ? (
            <Text style={styles.errorText}>{errors.line1}</Text>
          ) : null}
          </View>


          <View style={styles.inputContainer}>
            <Icon name="home" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter Line 2 (optional)"
              onChangeText={handleChange('line2')}
              onBlur={handleBlur('line2')}
              value={values.line2}
              style={styles.input}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Icon name="location" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter Street"
              onChangeText={handleChange('street')}
              onBlur={handleBlur('street')}
              value={values.street}
              style={styles.input}
            />
                      {errors.street && touched.street ? (
            <Text style={styles.errorText}>{errors.street}</Text>
          ) : null}
          </View>


          <View style={styles.inputContainer}>
            <Icon name="location" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter City"
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              style={styles.input}
            />
            {errors.city && touched.city ? (
              <Text style={styles.errorText}>{errors.city}</Text>     
          ) : null}
          </View>


          <View style={styles.inputContainer}>
            <Icon name="pin" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter Landmark"
              onChangeText={handleChange('landmark')}
              onBlur={handleBlur('landmark')}
              value={values.landmark}
              style={styles.input}
            />
            {errors.landmark && touched.landmark ? (
            <Text style={styles.errorText}>{errors.landmark}</Text>
            ) : null}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={address ? 'Update' : 'Submit'}
              onPress={handleSubmit}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    position: 'absolute', // Change to absolute positioning
    left: 0,
    bottom: -20, // Position below the input
  },
  buttonContainer: {
    marginTop: 20,
  },
  icon: {
    paddingRight: 10,
  },
});