import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './src/screens/SplashScreen';
import SearchScreen from './src/screens/SearchScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import SearchRecommendScreen from './src/screens/SearchRecommendScreen';
import ErrorScreen from './src/screens/ErrorScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            height: 100,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
        initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <></>,
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('./src/assets/splashIcon.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.title}>Shopping Assistant</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('./src/assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
          name="SearchScreen"
          component={SearchScreen}
        />
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreen}
          options={{
            headerLeft: () => <></>,
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('./src/assets/splashIcon.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.title}>Search Results</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('./src/assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <></>,
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('./src/assets/splashIcon.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.title}>Recommendation</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('./src/assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
          name="SearchRecommendScreen"
          component={SearchRecommendScreen}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <></>,
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <Text style={styles.title}>Error</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('./src/assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
          name="ErrorScreen"
          component={ErrorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 100,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 15,
  },
});
