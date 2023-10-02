import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { IP } from './IP_ADDRESS';

const PersonalizedTripScreen = ({ route }) => {
  const { tripDetails } = route.params;
  const [personalizedTrip, setPersonalizedTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateNew = async () => {
    try {
      const response = await axios.post(IP + '/create_new');
      if (response.data && response.data.result) {
        setPersonalizedTrip(response.data.result);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Trigger loading when the component mounts
    handleCreateNew();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        // Render the loading screen with the GIF
        <View style={styles.loadingContainer}>
          <Image source={require('../assets/loading.gif')} style={styles.loadingImage} />
        </View>
      ) : (
        // Render personalized trip data
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Personalized Trip Details</Text>
          {personalizedTrip.map((dayDetails, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayHeading}>{dayDetails[0]}</Text>
              {dayDetails.slice(1).map((detail, detailIndex) => (
                <Text key={detailIndex} style={styles.detailText}>
                  {detail}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateNew}>
          <Text style={styles.buttonText}>Perfect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCreateNew}>
          <Text style={styles.buttonText}>Create New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 32,
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '80%',
  },
  dayHeading: {
    fontSize: 20,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '45%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
});

export default PersonalizedTripScreen;
