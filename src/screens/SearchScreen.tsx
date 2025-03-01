import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Tts from 'react-native-tts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/animationLoader';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

interface SearchResult {
  title: string;
  price: number;
  source: string;
  link: string;
  thumbnail: string;
  rating: number;
  discount: string | null;
  delivery: string | null;
  email_discount: string | null;
  email_coupon_code: string | null;
}

interface SearchResponse {
  message: string;
  audio_path: string;
  results: SearchResult[];
}

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [apiResult, setApiResult] = useState(null);
  const [micRecording, setMicRecording] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const recentSearches = ['Headphones', 'Dress', 'Laptops'];
  const [textQuery, setTextQuery] = useState('');

  const [visible, setVisible] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, // Needed for accessing files
        ]);

        if (
          granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('All permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn('Permission request error:', err);
      }
    }
  };
  // const requestPermissions = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       ]);

  //       if (
  //         granted['android.permission.RECORD_AUDIO'] ===
  //           PermissionsAndroid.RESULTS.GRANTED &&
  //         granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
  //           PermissionsAndroid.RESULTS.GRANTED &&
  //         granted['android.permission.READ_EXTERNAL_STORAGE'] ===
  //           PermissionsAndroid.RESULTS.GRANTED
  //       ) {
  //         console.log('Android permissions granted');
  //       } else {
  //         console.log('Android permissions denied');
  //       }
  //     } catch (err) {
  //       console.warn('Android permission request error:', err);
  //     }
  //   } else if (Platform.OS === 'ios') {
  //     try {
  //       const permissionStatus = await check(PERMISSIONS.IOS.MICROPHONE);
  //       if (permissionStatus !== RESULTS.GRANTED) {
  //         const result = await request(PERMISSIONS.IOS.MICROPHONE);
  //         if (result === RESULTS.GRANTED) {
  //           console.log('iOS microphone permission granted');
  //         } else {
  //           console.log('iOS microphone permission denied');
  //         }
  //       }
  //     } catch (err) {
  //       console.warn('iOS permission request error:', err);
  //     }
  //   }
  // };

  useEffect(() => {
    requestPermissions();
  }, []);

  // Start recording when mic button is pressed
  const startRecording = async () => {
    setMicRecording(true);
    try {
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started:', result);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Stop recording on button release and send audio to API
  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setMicRecording(false);
      console.log('Recording stopped, file:', result);
      sendAudioToApi(result);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const correctFileUri = filePath => {
    // If it starts with "file:////", replace with "file:///"
    if (filePath.startsWith('file:////')) {
      return filePath.replace('file:////', 'file:///');
    }
    return filePath;
  };

  // Send recorded audio file to API endpoint
  const sendAudioToApi = async filePath => {
    setVisible(true);
    const token = await AsyncStorage.getItem('jwtToken');
    // Speak filler sentence while processing
    Tts.speak('Processing your request, please wait.');

    // Prepare audio file as form data
    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'android' ? correctFileUri(filePath) : filePath,
      type: 'audio/m4a', // Adjust mime type as per your recording format
      name: 'recording.m4a',
    });

    try {
      const response = await fetch(
        'https://corto-dev.axcelerateai.com/voice_search?response_type=File_Path&include_discount_info=true',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      const json: SearchResponse = await response.json();
      if (response.status === 200) {
        setVisible(false);
        console.log('api successfull', json, response);
        // Tts.speak(json.message);
        navigation.navigate('SearchResultsScreen', {
          textQuery: null,
          query: json,
        });
      }
      // console.log('API response:', json);
      // setApiResult(json);
      // // If API returns a result text, speak it out
      // if (json && json.result) {
      //   Tts.speak(json.result);
      // }
    } catch (error) {
      setVisible(false);
      console.error('Error sending audio to API:', error);
      Tts.speak('There was an error processing your request.');
    }
  };
  const handleSearch = () => {
    if (textQuery.trim()) {
      navigation.navigate('SearchResultsScreen', {textQuery, voiceQuery: null});
    }
  };

  const animationLoading = useMemo(() => {
    return <LoadingModal visible={visible} />;
  }, [visible]);

  if (visible) {
    return <>{animationLoading}</>;
  }

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
                <Image
                  source={require('../assets/splashIcon.png')}
                  style={styles.mainImageStyle}
                />
              </View>
              <View style={styles.mainContainerStyle}>
                <TextInput
                  placeholder="Enter Product"
                  style={styles.inputStyle}
                  value={textQuery}
                  onChangeText={setTextQuery}
                />
                <TouchableOpacity
                  onPress={handleSearch}
                  style={[
                    styles.containerImage,
                    micRecording && styles.sendButtonSmall, // Shrinks when recording
                  ]}>
                  <Image
                    source={require('../assets/images/send.png')}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>

                {/* Mic Button: onPressIn starts recording, onPressOut stops */}

                <TouchableOpacity
                  onPressIn={startRecording}
                  onPressOut={stopRecording}
                  style={[
                    styles.micButton,
                    micRecording && styles.micButtonActive, // Apply larger size when recording
                  ]}>
                  <Image
                    source={require('../assets/images/mic.png')}
                    style={styles.micImageStyle}
                  />
                </TouchableOpacity>
              </View>
              {/* {apiResult && (
                <View style={styles.apiResultContainer}>
                  <Text style={styles.apiResultText}>
                    {JSON.stringify(apiResult)}
                  </Text>
                </View>
              )} */}
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
  flexGrow1: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  mainImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImageStyle: {
    width: 200,
    height: 200,
  },
  mainContainerStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 20,
    height: 100,
  },
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#E0E0E0',
    borderRadius: 24.5,
    width: '60%',
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
  imageStyle: {
    right: 3,
  },
  // micButton: {
  //   width: 46,
  //   height: 46,
  //   backgroundColor: '#008080', // Teal color for mic button
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 23,
  //   marginLeft: 10,
  // },
  micButton: {
    width: 46,
    height: 46,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginLeft: 10,
    transition: 'all 0.2s ease-in-out', // Smooth transition
  },
  micButtonActive: {
    width: 56, // Increase size when pressed
    height: 56,
    borderRadius: 28, // Keep it circular
    backgroundColor: '#007070', // Slightly darker color for effect
  },

  sendButtonSmall: {
    width: 36, // Smaller size when mic is held
    height: 36,
    borderRadius: 18, // Keep proportions circular
    backgroundColor: '#D84315', // Optional: change color slightly for effect
  },

  micImageStyle: {
    width: 24,
    height: 24,
    tintColor: '#fff',
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
    backgroundColor: '#008080',
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '400',
  },
  apiResultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 20,
  },

  apiResultText: {
    color: '#333333',
    fontSize: 14,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
