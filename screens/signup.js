import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // Import Axios
import { IP } from './IP_ADDRESS';

const showIcon = require('../assets/view.png');
const hideIcon = require('../assets/blind.png');

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const loginGif = require('../assets/Authenticate.gif');

  const handleSignup = () => {
    const user = {
      name,
      email,
      password,
      city,
    };

    axios.post(`${IP}/register`, user)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          navigation.navigate('CategorySelectionPage');
        } else {
          console.error('Registration failed:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={loginGif} style={styles.gif} />
      <Text style={styles.heading}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <View style={styles.cityInputContainer}>
        <Picker
          style={styles.cityInput}
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item label="Select City" value="" />
          <Picker.Item label="City 1" value="city1" />
          <Picker.Item label="City 2" value="city2" />
          <Picker.Item label="City 3" value="city3" />
        </Picker>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputpassword}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={togglePasswordVisibility}
        >
          <Image
            source={showPassword ? hideIcon : showIcon}
            style={styles.passwordVisibilityIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputpassword}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={toggleConfirmPasswordVisibility}
        >
          <Image
            source={showConfirmPassword ? hideIcon : showIcon}
            style={styles.passwordVisibilityIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
  gif: {
    width: 100,
    height: 100,
    marginBottom: -10,
  },
  heading: {
    fontSize: 32,
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
  cityInputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  cityInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 18,
    color: '#888',

  },
   inputpassword: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 20,
    fontSize: 18,
    flex: 1,
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordVisibilityButton: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    top: 0,
  },
  passwordVisibilityIcon: {
    width: 20,
    height: 20,
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

export default Register;
