import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SearchResultsScreen = ({route}) => {
  const {query} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for "{query}"</Text>
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

export default SearchResultsScreen;