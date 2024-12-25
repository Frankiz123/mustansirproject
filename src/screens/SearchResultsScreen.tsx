import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import ItemCard from '../components/ItemCard';

const SearchResultsScreen = () => {
  const navigation = useNavigation();
  // const route = useRoute();

  // const query = route.params?.query;

  // if (!query) {
  //   return <Text>No query provided</Text>;
  // }

  const nextScreenPress = () => navigation.navigate('SearchRecommendScreen');

  return (
    <View style={styles.container}>
      <View style={styles.mainContainerStyle}>
        <TextInput placeholder="Enter Product" style={styles.inputStyle} />
        <TouchableOpacity style={styles.containerImage}>
          <Image
            source={require('../assets/images/send.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemCard}>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContainerStyle: {
    marginTop: 20,
    flexDirection: 'row',
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
  itemCard: {
    flex: 1,
    marginTop: 36,
    alignItems: 'center',
  },
});

export default SearchResultsScreen;
