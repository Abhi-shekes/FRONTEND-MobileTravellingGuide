import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          type="font-awesome"
          size={25}
          color="#000000"
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('ModeTransport')}>
        <Icon
          name="plane"
          type="font-awesome"
          size={25}
          color="#000000"
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomButtonLarge}
        onPress={() => navigation.navigate('CreateTourScreen')}>
        <Image
          source={require('../assets/men_with_luggage-removebg.png')}
          style={styles.tourCreation}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Liked')}>
        <Icon
          name="heart"
          type="font-awesome"
          size={25}
          color="#000000"
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Profile')}>
        <Icon
          name="user"
          type="font-awesome"
          size={25}
          color="#000000"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    backgroundColor: '#ffffff',
    elevation: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomButton: {
    alignItems: 'center',
    elevation: 3,
  },
  bottomButtonLarge: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    elevation: 3,
  },
  tourCreation: {
    width: 60,
    height: 60,
  },
  icon: {
    elevation: 3,
  },
});

export default BottomNavigation;