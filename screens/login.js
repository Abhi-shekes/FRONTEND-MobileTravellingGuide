import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IP } from './IP_ADDRESS';
import axios from 'axios';

const showIcon = require('../assets/view.png');
const hideIcon = require('../assets/blind.png');
const loginGif = require('../assets/Authenticate.gif'); 

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const user = {
      email,
      password,
    };

    axios.post(IP + '/login', user)
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === 'Login successful') {
          navigation.navigate('Dashboard');
        }
      })
      
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSkip = ()=> {
    navigation.navigate('Dashboard');
  }
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <Image source={loginGif} style={styles.gif} />

      <Text style={styles.heading}>LOGIN</Text>

      <TextInput
        style={styles.inputEmail}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity
          style={styles.passwordToggleButton}
          onPress={toggleShowPassword}
        >

          <Image
            source={showPassword ? hideIcon : showIcon}
            style={styles.passwordToggleImage}
          />
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.forgetPasswordButton} onPress={handleForgetPassword}>
        <Text style={styles.forgetPasswordButtonText}>Forget password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
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
    marginBottom: 50,
  },
  inputEmail: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 18,

  },
  inputPassword:{
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 18,
    flex: 1,

  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
 
  },

  passwordToggleButton: {
    backgroundColor: '#fff',
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    padding: 15,
    top: -10,
  },
  passwordToggleImage: {
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

  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
  },
  skipButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgetPasswordButtonText:{
    color:'#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgetPasswordButton:{
    top:-20,
  }
});

export default Login;

