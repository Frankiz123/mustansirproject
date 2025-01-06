/* eslint-disable react/no-unstable-nested-components */
// src/navigation/AppNavigator.js
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SearchRecommendScreen from '../screens/SearchRecommendScreen';
import ErrorScreen from '../screens/ErrorScreen';

import AuthNavigator from './authNavigator';
import {AppStackParamList} from './routes';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
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
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{headerShown: false}}
          name="Auth"
          component={AuthNavigator}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerLeft: () => <></>,
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../assets/splashIcon.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.title}>Shopping Assistant</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('../assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
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
                    source={require('../assets/splashIcon.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.title}>Search Results</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('../assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Stack.Screen
          name="SearchRecommendScreen"
          component={SearchRecommendScreen}
          options={{
            headerLeft: () => <></>,
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../assets/splashIcon.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.title}>Recommendation</Text>
              </View>
            ),
            headerRight: () => (
              <Image
                source={require('../assets/images/home.png')}
                style={styles.icon}
              />
            ),
          }}
        />
        <Stack.Screen
          options={{
            headerLeft: () => (
              <View style={styles.headerTitle}>
                <Image
                  source={require('../assets/images/back.png')}
                  style={styles.icon}
                />
                <Text style={styles.title}>Error</Text>
              </View>
            ),
          }}
          name="ErrorScreen"
          component={ErrorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

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
