import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { IP } from './IP_ADDRESS';

const resetjpg = require('../assets/ResetPassword.png');

const ResetPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(IP + '/reset_password', {
        newPassword: newPassword,
      });

      if (response.data.message === 'Password reset successful') {
      } else {
        setErrorMessage('Password reset failed. Please try again.'); 
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Error resetting password.'); 
    }
  };

  return (
    <View style={styles.container}>
      <Image source={resetjpg} style={styles.resetjpg} />
      <Text style={styles.heading}>Reset Password</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#8F8F8F"
        secureTextEntry={true}
      />
      <TextInput
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#8F8F8F"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleReset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{errorMessage}</Text> 
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
  resetjpg:{
    width: 100,
    height: 100,
 
  },
  heading: {
    fontSize: 25,
    marginBottom: 30,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResetPage;

