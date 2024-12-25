import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SearchRecommendScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Products</Text>
      {/* Display recommendations here */}
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
  },
});

export default SearchRecommendScreen;