import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const recentSearches = ['Headphones', 'Dress', 'Laptops'];

  const handleSearch = () => {
    if (query.trim()) {
      navigation.navigate('SearchResultsScreen', {query});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          keyboardVerticalOffset={50}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.container}>
            <View style={styles.mainImageContainer}>
              <Image
                source={require('../assets/splashIcon.png')}
                style={styles.mainImageStyle}
              />
            </View>
            <View style={styles.mainContainerStyle}>
              <TextInput
                placeholder="Enter Product"
                style={styles.inputStyle}
                value={query}
                onChangeText={setQuery}
              />
              <TouchableOpacity
                onPress={handleSearch}
                style={styles.containerImage}>
                <Image
                  source={require('../assets/images/send.png')}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerLabel}>Recent Searches</Text>
              <View style={styles.containerDotsFooter}>
                {recentSearches.map((item, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <View style={styles.dot} />
                    <Text style={styles.text}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SearchScreen;

// [Styles: Same as before]

const styles = StyleSheet.create({
  mainImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDotsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#008080', // Teal dot color
    marginRight: 5, // Space between dot and text
  },
  text: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
  },
  mainText: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '400',
    color: '#333333',
    marginHorizontal: 80,
    paddingTop: 10,
  },
  mainImageStyle: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    marginTop: 18,
  },
  itemCard: {
    flex: 1,
    marginTop: 36,
    alignItems: 'center',
  },
  mainContainerStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    right: 3,
  },
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#E0E0E0',
    borderRadius: 24.5,
    width: '75%',
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
  footer: {
    marginLeft: 30,
    marginTop: 10,
  },
  footerLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333333',
  },
});
