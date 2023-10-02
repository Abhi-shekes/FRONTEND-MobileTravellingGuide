import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IP } from './IP_ADDRESS';

const CreateTourScreen = () => {
  const [city, setCity] = useState('');
  const [days, setDays] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const navigation = useNavigation();

  const handleCreateTour = async () => {
    try {
      setIsLoading(true); 

      const response = await axios.post(IP + '/create_tour', {
        city: city,
        days: days,
      });

      if (response.status === 200) {
        console.log('Tour created successfully');
        navigation.navigate('PersonalizedTripScreen', { tripDetails: response.data.result });
      } else {
        console.error('Failed to create tour');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? ( // Conditionally render loading screen
        <View style={styles.loadingContainer}>
          <Image source={require('../assets/loading.gif')} style={styles.loadingImage} />
        </View>
      ) : (
        // Render the form when not loading
        <>
          <Image source={require('../assets/ResetPassword.png')} style={styles.gif} />
          <Text style={styles.heading}>Create Personalized Tour</Text>
          <View style={styles.cityInputContainer}>
            <TextInput
              style={styles.cityInput}
              placeholder="City Name"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputpassword}
              placeholder="Number of Days"
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCreateTour}>
            <Text style={styles.buttonText}>Create Tour</Text>
          </TouchableOpacity>
        </>
      )}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingImage: {
    width: 100,
    height: 100,
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
    color: '#000',
  },
  inputpassword: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 20,
    fontSize: 18,
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

export default CreateTourScreen;
