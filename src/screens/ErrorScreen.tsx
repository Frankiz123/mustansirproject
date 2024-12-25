import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ErrorScreen;
