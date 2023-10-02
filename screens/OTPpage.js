import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { IP } from './IP_ADDRESS';

const OTPimage = require("../assets/ResetPassword.png")

const OTPpage = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const { userEmail } = route.params;

  const handleSubmit = async () => {
    try {
      if (otp.length !== 6) {
        console.log('Please enter a 6-digit OTP.');
        return;
      }

      const response = await axios.post(IP + '/validate_otp', {
        email: userEmail, 
        otp: otp,
      });

      if (response.data.message === 'OTP is valid') {
        navigation.navigate('ResetPassword', { email: userEmail });
      } else {
        console.log('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
    }

  };

  return (
    <View style={styles.container}>
      <Image source={OTPimage} style={styles.image} />
      <Text style={styles.heading}>Enter the Code</Text>
      <Text style={styles.subtitle}>We've sent a 6-digit code to your email. Please enter it below.</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        placeholder="OTP"
        placeholderTextColor="#8F8F8F"
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, otp.length < 6 && styles.disabledButton]}
        disabled={otp.length < 6}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  image:{
    width:100,
    height:100,
    marginBottom:10
  },
  heading: {
    fontSize: 25,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#8F8F8F',
    textAlign: 'center',
    width:'85%'
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default OTPpage;
