import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ItemCard from '../components/ItemCard';
import Tts from 'react-native-tts';
import LoadingModal from '../components/animationLoader';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import {
  processingRequestSound,
  searchAmazon,
  slickDeals,
  walmart,
} from '../utils/voiceConstants';

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
  base64_audio: string;
  results: SearchResult[];
}

const SearchResultsScreen = ({route, navigation}) => {
  const {query, textQuery} = route.params || {};
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [input, setInput] = useState(textQuery || '');
  const [loading, setLoading] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  // const isPlaying = useRef(false);
  // const playbackListener = useRef<any>(null);
  const [micRecording, setMicRecording] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tempQuery, setTempQuery] = useState<SearchResponse>();
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);

  const fetchSearchResults = async (searchQuery: string) => {
    setLoading(true);
    const url = 'https://corto-dev.axcelerateai.com/search_products';
    const token = await AsyncStorage.getItem('jwtToken');

    try {
      const response = await axios.post<SearchResponse>(
        url,
        {query: searchQuery},
        {
          headers: {
            accept: 'application/json',
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

  const startRecording = async () => {
    setInput('');
    setMicRecording(true);
    setIsVoiceSearch(true);
    setIsRecordingStarted(true);
    try {
      const result = await audioRecorderPlayer.startRecorder();
      console.log('Recording started:', result);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const correctFileUri = (filePath: string) => {
    if (filePath.startsWith('file:////')) {
      return filePath.replace('file:////', 'file:///');
    }
    return filePath;
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

  const handlePlayAudio = async (audioUrl: string) => {
    const audioPath = `${RNFS.DocumentDirectoryPath}/response.m4a`;
    await RNFS.writeFile(audioPath, audioUrl, 'base64');

    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.error('Audio playback error:', error);
        return;
      }
      sound.play(success => {
        sound.release();
      });
    });
  };
  const speakWithDelay = async () => {
    try {
      const processingAudioPath = `${RNFS.DocumentDirectoryPath}/processing.m4a`;
      await RNFS.writeFile(
        processingAudioPath,
        processingRequestSound,
        'base64',
      );

      const playSound = (path: string) => {
        return new Promise<void>((resolve, reject) => {
          const sound = new Sound(path, '', error => {
            if (error) {
              console.error('Audio playback error:', error);
              reject(error);
              return;
            }
            sound.play(success => {
              sound.release();
              if (success) {
                resolve();
              } else {
                reject(new Error('Playback failed'));
              }
            });
          });
        });
      };

      await playSound(processingAudioPath);

      const playWithDelay = async (base64Audio: string, delay: number) => {
        const audioPath = `${RNFS.DocumentDirectoryPath}/temp.m4a`;
        await RNFS.writeFile(audioPath, base64Audio, 'base64');
        await new Promise(resolve => setTimeout(resolve, delay));
        await playSound(audioPath);
      };

      await playWithDelay(searchAmazon, 500);
      await playWithDelay(slickDeals, 500);
      await playWithDelay(walmart, 500);
    } catch (error) {
      console.error('Error in speakWithDelay:', error);
    }
  };

  const sendAudioToApi = async (filePath: string) => {
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
        'https://corto-dev.axcelerateai.com/voice_search_bytes?include_discount_info=true',

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
        setTempQuery(json);
        navigation.setParams({query: null});
      }
    } catch (error) {
      setVisible(false);
      console.error('Error sending audio to API:', error);
      Tts.speak('There was an error processing your request.');
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (tempQuery?.base64_audio) {
      handlePlayAudio(tempQuery.base64_audio);
      setSearchResults(tempQuery.results || []);
    } else if (query?.base64_audio) {
      setIsVoiceSearch(true);
      handlePlayAudio(query.base64_audio);
      setSearchResults(query.results || []);
    } else if (textQuery) {
      fetchSearchResults(textQuery);
    }

    return () => {
      isMounted = false;
    };
  }, [query, textQuery, tempQuery]);

  const handleSearch = () => {
    if (input.trim()) {
      setIsVoiceSearch(false);
      fetchSearchResults(input);
    }
  };

  const renderItem = ({item}: {item: SearchResult}) => (
    <ItemCard item={item} onPress={() => {}} />
  );

  const animationLoading = useMemo(() => {
    return <LoadingModal visible={visible} />;
  }, [visible]);

  if (visible) {
    return <>{animationLoading}</>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainerStyle}>
        <TextInput
          placeholder="Enter Product"
          style={styles.inputStyle}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSearch}
          placeholderTextColor="gray"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.containerImage}>
          <Image
            source={require('../assets/images/send.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onLongPress={startRecording}
          onPressOut={stopRecording}
          delayLongPress={500}
          style={styles.speakerIcon}>
          <Image
            source={require('../assets/images/mic.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.resultHeader}>
        <Text style={styles.resultHeaderText}>Results</Text>

        {isVoiceSearch && (query?.base64_audio || tempQuery?.base64_audio) && (
          <TouchableOpacity
            onPress={() =>
              handlePlayAudio(tempQuery?.base64_audio || query.base64_audio)
            }
            style={styles.speakerIcon}>
            <Image
              source={require('../assets/images/volumeIcon.png')}
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    paddingHorizontal: 15,
  },
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: 'white',
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
  resultHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultHeaderText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF5722',
  },
  speakerIcon: {
    width: 46,
    height: 46,
    backgroundColor: '#008080',
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
    flex: 1,
    backgroundColor: 'white',
  },
  resultsContainer: {
    paddingVertical: 10,
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default SearchResultsScreen;
