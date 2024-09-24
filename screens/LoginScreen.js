import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase';
import { PhoneAuthProvider, signInWithCredential, RecaptchaVerifier } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  
  // Reference to reCAPTCHA
  const recaptchaVerifier = useRef(null);

  const sendOTP = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        `+${phoneNumber}`,
        recaptchaVerifier.current
      );
      setVerificationId(id);
    } catch (error) {
      console.log('Error sending OTP:', error);
    }
  };

  const confirmOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      navigation.navigate('Listing');
    } catch (error) {
      console.log('Error verifying OTP:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Firebase Recaptcha Verifier Modal */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true} // To auto-fetch for SIM 1 or SIM 2
      />
      {!verificationId ? (
        <>
          <Text>Enter Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="Phone Number"
          />
          <Button title="Send OTP" onPress={sendOTP} />
        </>
      ) : (
        <>
          <Text>Enter OTP</Text>
          <TextInput
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            placeholder="Verification Code"
          />
          <Button title="Verify OTP" onPress={confirmOTP} />
        </>
      )}
    </View>
  );
}