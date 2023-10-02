import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Register from './screens/signup';
import WelcomePage from './screens/welcome';  
import ForgetPassword from './screens/ForgetPassword';
import OTPpage from './screens/OTPpage';
import ResetPassword from './screens/ResetPassword';
import CategorySelectionPage from './screens/PreferancePage';
import CreateTourScreen from './screens/CreateTourInput';
import PersonalizedTripScreen from './screens/PersonlisedTrip';
import DashboardScreen from './screens/Dashboard';


const Stack = createStackNavigator();

function App() {
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/men_with_luggage-removebg.png')}
          style={styles.image}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Welcome Back' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Welcome' }} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: '' }} />
        <Stack.Screen name="OTPpage" component={OTPpage} options={{ title: '' }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: '' }} />
        <Stack.Screen name="CategorySelectionPage" component={CategorySelectionPage} options={{ title: 'Select Categories' }} />
        <Stack.Screen name="CreateTourScreen" component={CreateTourScreen} options={{ title: '' }} />
        <Stack.Screen name="PersonalizedTripScreen" component={PersonalizedTripScreen} options={{ title: '' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen}  options={{ headerShown: false ,headerLeft: null }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

});

export default App;
