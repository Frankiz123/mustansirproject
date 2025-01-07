import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ItemCard from '../components/ItemCard';

const SearchResultsScreen = ({route}) => {
  const {query} = route.params || {};
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState(query || '');
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    const url = 'http://3.142.36.68/search_products';
    const token = await AsyncStorage.getItem('jwtToken');

    try {
      const response = await axios.post(
        url,
        {query},
        {
          headers: {
            accept: 'application/json',
            // token: token,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const handleSearch = () => {
    if (input.trim()) {
      fetchSearchResults(input);
    }
  };
  function cardPress() {}

  const renderItem = ({item}) => (
    // <View style={styles.itemCard}>
    //   <Text>{item.title}</Text>
    //   <Text>{item.price}</Text>
    // </View>
    <ItemCard item={item} onPress={cardPress} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContainerStyle}>
        <TextInput
          placeholder="Enter Product"
          style={styles.inputStyle}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.containerImage}>
          <Image
            source={require('../assets/images/send.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size={20}
          color={'#FF5722'}
        />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.resultsContainer}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No results found</Text>
          }
        />
      )}
    </View>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainerStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageStyle: {
    right: 3,
  },
  containerImage: {
    width: 46,
    height: 46,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginLeft: 10,
  },
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#E0E0E0',
    borderRadius: 24.5,
    width: '75%',
  },
  resultsContainer: {
    padding: 20,
  },
  itemCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
