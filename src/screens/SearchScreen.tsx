import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import axios from 'axios';

import SearchBox from '../components/SearchBox';
import ItemCard from '../components/ItemCard';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();

  const fetchProducts = useCallback(async () => {
    const url =
      'https://14c45500-3e9b-4922-a8d5-8875f6740d48.mock.pstmn.io/search_products';
    const query = 'RGB keyboard'; // Hardcoded query

    try {
      const response = await axios.post(url, {
        query, // Send the query in the body of the request
      });
      console.log(response.data); // Handle the response data
    } catch (error) {
      console.error('Error making API request:', error); // Handle errors
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 100); // Debounce API calls
    return () => clearTimeout(delayDebounce);
  }, [fetchProducts]);

  const nextScreenPress = () => navigation.navigate('SearchRecommendScreen');

  return (
    <View>
      <View style={styles.searchBoxContainer}>
        <SearchBox />
      </View>
      <View style={styles.itemCard}>
        <ItemCard onPress={nextScreenPress} />
      </View>
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  searchBoxContainer: {
    marginTop: 18,
  },
  itemCard: {
    flex: 1,
    marginTop: 36,
    alignItems: 'center',
  },
});
