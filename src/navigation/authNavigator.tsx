// src/navigation/AuthNavigator.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, RegisterScreen} from '../screens/auth';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
