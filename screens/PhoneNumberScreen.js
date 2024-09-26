import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setPhoneNumber } from '../reducers/phoneReducer';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PhoneNumberScreen({ navigation }) {
  const [phoneNumber, setPhoneNumberState] = useState('');
  const dispatch = useDispatch();
  const PhoneNumberSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  });
  
  const handlePhoneSubmit = () => {
    dispatch(setPhoneNumber(phoneNumber));
    navigation.navigate('Listing');
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ phoneNumber: '' }}
        validationSchema={PhoneNumberSchema}
        onSubmit={(values) => {
          handlePhoneSubmit();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
          <View style={styles.inputContainer}>
            <Icon name="call" size={20} color="#000" style={styles.icon} />
            <TextInput
              placeholder="Enter phone number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              keyboardType="phone-pad"
              style={styles.input}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            
          </View>
          <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
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
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    position: 'absolute',
    left: 0,
    bottom: -20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    paddingRight: 10,
  },
});