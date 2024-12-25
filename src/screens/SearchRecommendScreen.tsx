import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ItemCard from '../components/ItemCard';

const SearchRecommendScreen = () => {
  const navigation = useNavigation();
  const nextScreenPress = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <View>
        <ItemCard onPress={nextScreenPress} />
        <ItemCard onPress={nextScreenPress} />
        <ItemCard onPress={nextScreenPress} />
        <ItemCard onPress={nextScreenPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SearchRecommendScreen;
