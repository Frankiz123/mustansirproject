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

  const [micRecording, setMicRecording] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const recentSearches = ['Headphones', 'Dress', 'Laptops'];
  const [textQuery, setTextQuery] = useState('');

  const [visible, setVisible] = useState(false);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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

  useEffect(() => {
    requestPermissions();
  }, []);

  const startRecording = async () => {
    setIsRecordingStarted(true);
    setMicRecording(true);
    try {
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started:', result);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!isRecordingStarted) return;

    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setMicRecording(false);
      setIsRecordingStarted(false);
      console.log('Recording stopped, file:', result);
      sendAudioToApi(result);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const correctFileUri = filePath => {
    if (filePath.startsWith('file:////')) {
      return filePath.replace('file:////', 'file:///');
    }
    return filePath;
  };
  const speakWithDelay = async () => {
    Tts.speak('Processing your request, please wait.');

    await new Promise(resolve => setTimeout(resolve, 700));
    Tts.speak('Searching on Amazon');

    await new Promise(resolve => setTimeout(resolve, 500));
    Tts.speak('Searching on Slick deals');

    await new Promise(resolve => setTimeout(resolve, 700));
    Tts.speak('Searching on Walmart');
  };

  const sendAudioToApi = async filePath => {
    setVisible(true);
    const token = await AsyncStorage.getItem('jwtToken');

    speakWithDelay();

    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'android' ? correctFileUri(filePath) : filePath,
      type: 'audio/m4a',
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
        navigation.navigate('SearchResultsScreen', {
          textQuery: null,
          query: json,
        });
      }
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
    setTextQuery('');
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
                  placeholderTextColor="gray"
                />
                <TouchableOpacity
                  onPress={handleSearch}
                  style={[
                    styles.containerImage,
                    micRecording && styles.sendButtonSmall,
                  ]}>
                  <Image
                    source={require('../assets/images/send.png')}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onLongPress={startRecording}
                  onPressOut={stopRecording}
                  delayLongPress={500}
                  style={[
                    styles.micButton,
                    micRecording && styles.micButtonActive,
                  ]}>
                  <Image
                    source={require('../assets/images/mic.png')}
                    style={styles.micImageStyle}
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
  micButton: {
    width: 46,
    height: 46,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginLeft: 10,
    transition: 'all 0.2s ease-in-out',
  },
  micButtonActive: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007070',
  },

  sendButtonSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D84315',
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
