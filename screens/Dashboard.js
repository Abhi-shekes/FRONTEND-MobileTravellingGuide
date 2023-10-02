import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { IP } from './IP_ADDRESS';
import images from './REQUIRE_IMAGES';
import Filters from '../components/Filters';
import BottomNavigation from '../components/BottomNavigation';

const DashboardScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get(IP + '/image_to_dashboard')
      .then((response) => {
        const responseData = response.data;
        const spotImages = Object.entries(responseData.SPOT_IMAGE_10).map(
          ([name, image_url]) => ({
            name,
            image_url: image_url,
          })
        );
        const cityImages = Object.entries(responseData.CITY_IMAGE_10).map(
          ([name, image_url]) => ({
            name,
            image_url: image_url,
          })
        );
        const stateImages = Object.entries(responseData.STATE_IMAGE_10).map(
          ([name, image_url]) => ({
            name,
            image_url: image_url,
          })
        );
        const utImages = Object.entries(responseData.UT_IMAGE_3).map(
          ([name, image_url]) => ({
            name,
            image_url: image_url,
          })
        );

        setData({
          spotImages,
          cityImages,
          stateImages,
          utImages,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>       
    <View style={styles.dashboardcontainer}>
      <ScrollView>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, User</Text>
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />

        <Filters />
 
        <Text style={styles.sectionTitle}>Popular Tourist Spots</Text>
        <FlatList
          data={data.spotImages}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={images[item.image_url]} style={styles.image} />
              <Text style={styles.placename}>{item.name}</Text>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>City Highlights</Text>
        <FlatList
          data={data.cityImages}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={images[item.image_url]} style={styles.image} />
              <Text style={styles.placename}>{item.name}</Text>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>Discover the State</Text>
        <FlatList
          data={data.stateImages}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={images[item.image_url]} style={styles.image} />
              <Text style={styles.placename}>{item.name}</Text>
            </View>
          )}
        />
        <Text style={styles.sectionTitle}>Discover the Union Territory</Text>
        <FlatList
          data={data.utImages}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={images[item.image_url]} style={styles.image} />
              <Text style={styles.placename}>{item.name}</Text>
            </View>
          )}
        />


      </ScrollView>
      </View>
      <BottomNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    alignItems: 'flex-start',
    height:85,
    backgroundColor:'#007bff',
    
  },
  dashboardcontainer:{
    height:760,
  },
  greetingText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 47,
    marginLeft: 15,
    color:'white'
  },
  searchBar: {
    height: 45,
    margin:5,
    marginBottom:10,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize:18,
    shadowColor: 'rgba(0, 0, 0, 2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  imageContainer: {
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 2)',
    
    elevation: 5,
    width: 120,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placename: {
    textAlign: 'center',
    marginTop:5,
  },
});

export default DashboardScreen;
