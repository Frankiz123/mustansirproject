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

const SearchResultsScreen = ({route, navigation}) => {
  const {query, textQuery} = route.params || {};
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [input, setInput] = useState(textQuery || '');
  const [loading, setLoading] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const isPlaying = useRef(false);
  const playbackListener = useRef<any>(null);
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
    try {
      await audioRecorderPlayer.stopPlayer();
      if (playbackListener.current) {
        audioRecorderPlayer.removePlayBackListener(playbackListener.current);
        playbackListener.current = null;
      }

      console.log('Starting audio playback:', audioUrl);
      await audioRecorderPlayer.startPlayer(audioUrl);
      isPlaying.current = true;

      playbackListener.current = audioRecorderPlayer.addPlayBackListener(e => {
        console.log(`Playback progress: ${e.currentPosition}/${e.duration}`);

        if (e.currentPosition >= e.duration - 0.5) {
          setTimeout(async () => {
            await audioRecorderPlayer.stopPlayer();
            if (playbackListener.current) {
              audioRecorderPlayer.removePlayBackListener(
                playbackListener.current,
              );
              playbackListener.current = null;
            }
            isPlaying.current = false;
          }, 1000);
        }
      });
    } catch (error) {
      console.error('Playback error:', error);
      isPlaying.current = false;
    }
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

    if (tempQuery?.audio_path) {
      handlePlayAudio(tempQuery.audio_path);
      setSearchResults(tempQuery.results || []);
    } else if (query?.audio_path) {
      setIsVoiceSearch(true);
      handlePlayAudio(query.audio_path);
      setSearchResults(query.results || []);
    } else if (textQuery) {
      fetchSearchResults(textQuery);
    }

    return () => {
      isMounted = false;
      if (isPlaying.current) {
        audioRecorderPlayer.stopPlayer().catch(() => {});
        if (playbackListener.current) {
          audioRecorderPlayer.removePlayBackListener(playbackListener.current);
          playbackListener.current = null;
        }
      }
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

        {isVoiceSearch && (query?.audio_path || tempQuery?.audio_path) && (
          <TouchableOpacity
            onPress={() =>
              handlePlayAudio(tempQuery?.audio_path || query.audio_path)
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
