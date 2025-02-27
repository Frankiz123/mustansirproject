import React, {useState, useEffect, useCallback} from 'react';
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
  ScrollView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recentSearches = ['Headphones', 'Dress', 'Laptops'];

  // Request Microphone & Speech Permissions (For Android)
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const micPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (micPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Microphone access is required for voice search.',
          );
        }
      } catch (error) {
        console.error('Permission error:', error);
      }
    }
  };
  useEffect(() => {
    requestPermissions();

    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = event => {
      if (event.value && event.value.length > 0) {
        const recognizedText = event.value[0];
        setQuery(recognizedText);

        handleSearch(recognizedText);
      }
    };
    Voice.onSpeechError = error => {
      console.error('Speech Recognition Error:', error);
      setIsRecording(false);
      Alert.alert('Error', 'Could not process speech. Please try again.');
    };

    return () => {
      Voice.removeAllListeners();
    };
  }, []);

  const playFillerAudio = async () => {
    const messages = [
      'Let me search',
      "I'm searching the best deals",
      'Checking Amazon and Walmart',
      'Finishing up the search',
    ];

    for (const msg of messages) {
      await Tts.speak(msg);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
  const handleMicPress = async () => {
    if (isRecording) {
      await Voice.stop();
      setIsRecording(false);

      if (query.trim()) {
        handleSearch(query);
      }
    } else {
      try {
        await Voice.destroy();
        await Voice.start('en-US');
        setIsRecording(true);
        setQuery('');
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  };

  Voice.onSpeechResults = event => {
    if (event.value && event.value.length > 0) {
      const recognizedText = event.value[0];
      setQuery(recognizedText);
    }
  };
  const handleSearch = useCallback(
    async query => {
      try {
        if (query.trim()) {
          await playFillerAudio();
          await Tts.speak(`Here are the results for ${query}.`);
          navigation.navigate('SearchResultsScreen', {query});
          setQuery('');
        }
      } catch (error) {
        console.error('Search error:', error);
        navigation.navigate('SearchResultsScreen', {query});
      }
    },
    [navigation],
  );
  const handleManualSearch = () => {
    navigation.navigate('SearchResultsScreen', {query});
    setQuery('');
  };

  // const handleSearch = useCallback(
  //   async query => {
  //     try {
  //       if (query.trim()) {
  //         await playFillerAudio();
  //         await Tts.speak(`Here are the results for ${query}.`);
  //         navigation.navigate('SearchResultsScreen', {query});
  //       }
  //     } catch (error) {
  //       console.error('Search error:', error);
  //       navigation.navigate('SearchResultsScreen', {query});
  //     }
  //   },
  //   [navigation],
  // );

  return (
    <ScrollView contentContainerStyle={styles.flexGrow1} style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={50}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.container}>
              <View style={styles.mainImageContainer}>
                <TouchableOpacity onPress={handleMicPress}>
                  <Image
                    source={
                      isRecording
                        ? require('../assets/images/micActive.png')
                        : require('../assets/images/micButton.png')
                    }
                    style={styles.mainImageStyle}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.mainContainerStyle}>
                <TextInput
                  placeholder="Enter Product"
                  style={styles.inputStyle}
                  value={query}
                  onChangeText={setQuery}
                />
                <TouchableOpacity
                  onPress={() => handleManualSearch()}
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
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flexGrow1: {flexGrow: 1},
  flex: {flex: 1},
  mainImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDotsFooter: {flexDirection: 'row', alignItems: 'center'},
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
    backgroundColor: '#008080',
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
  },
  mainImageStyle: {width: 200, height: 200},
  container: {flex: 1},
  mainContainerStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {right: 3},
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
  footer: {marginLeft: 30, marginTop: 10},
  footerLabel: {fontWeight: '500', fontSize: 16, color: '#333333'},
});
