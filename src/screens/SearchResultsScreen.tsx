// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Text,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import ItemCard from '../components/ItemCard';

// interface SearchResult {
//   title: string;
//   price: number;
//   source: string;
//   link: string;
//   thumbnail: string;
//   rating: number;
//   discount: string | null;
//   delivery: string | null;
//   email_discount: string | null;
//   email_coupon_code: string | null;
// }

// interface SearchResponse {
//   message: string;
//   audio_path: string;
//   results: SearchResult[];
// }

// const SearchResultsScreen = ({route}) => {
//   const {query, textQuery} = route.params || {};
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [input, setInput] = useState(textQuery || '');
//   const [loading, setLoading] = useState(false);
//   const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
//   let isPlaying = useRef(false);

//   const fetchSearchResults = async (searchQuery: string) => {
//     setLoading(true);
//     const url = 'https://corto-dev.axcelerateai.com/search_products';
//     const token = await AsyncStorage.getItem('jwtToken');

//     try {
//       const response = await axios.post<SearchResponse>(
//         url,
//         {query: searchQuery},
//         {
//           headers: {
//             accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       setSearchResults(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;
//     let playbackListener: any = null;

//     const playAudio = async () => {
//       try {
//         // Ensure any previous playback is stopped
//         await audioRecorderPlayer.stopPlayer();
//         audioRecorderPlayer.removePlayBackListener();

//         const audioUrl = query.audio_path;
//         console.log('Preloading audio:', audioUrl);

//         // Add a small delay to ensure buffering before playback
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         const path = await audioRecorderPlayer.startPlayer(audioUrl);
//         console.log('Audio started:', path);
//         isPlaying.current = true;

//         playbackListener = audioRecorderPlayer.addPlayBackListener(e => {
//           console.log(`Pos: ${e.currentPosition}, Dur: ${e.duration}`);

//           // Ensure stopping only happens at the right time
//           if (e.duration > 0 && e.currentPosition >= e.duration - 0.5) {
//             setTimeout(() => {
//               console.log('Audio playback completed');
//               audioRecorderPlayer.stopPlayer();
//               audioRecorderPlayer.removePlayBackListener();
//               isPlaying.current = false;
//             }, 500); // Slight buffer to prevent early stopping
//           }
//         });
//       } catch (error) {
//         console.error('Playback error:', error);
//         isPlaying.current = false;
//       }
//     };

//     if (query?.audio_path) {
//       playAudio();
//       setSearchResults(query.results || []);
//     } else if (textQuery) {
//       fetchSearchResults(textQuery);
//     }

//     return () => {
//       isMounted = false;
//       if (isPlaying.current) {
//         console.log('Stopping audio on unmount');
//         audioRecorderPlayer.stopPlayer().catch(() => {});
//         audioRecorderPlayer.removePlayBackListener(playbackListener);
//       }
//     };
//   }, [query, textQuery]);

//   const handleSearch = () => {
//     if (input.trim()) {
//       fetchSearchResults(input);
//     }
//   };

//   const cardPress = () => {};

//   const renderItem = ({item}: {item: SearchResult}) => (
//     <ItemCard item={item} onPress={cardPress} />
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainContainerStyle}>
//         <TextInput
//           placeholder="Enter Product"
//           style={styles.inputStyle}
//           value={input}
//           onChangeText={setInput}
//         />
//         <TouchableOpacity onPress={handleSearch} style={styles.containerImage}>
//           <Image
//             source={require('../assets/images/send.png')}
//             style={styles.imageStyle}
//           />
//         </TouchableOpacity>
//       </View>
//       {loading ? (
//         <ActivityIndicator
//           style={styles.activityIndicator}
//           size={20}
//           color={'#FF5722'}
//         />
//       ) : (
//         <FlatList
//           data={searchResults}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={styles.resultsContainer}
//           ListEmptyComponent={
//             <Text style={styles.noResultsText}>No results found</Text>
//           }
//         />
//       )}
//     </View>
//   );
// };

// export default SearchResultsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   activityIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mainContainerStyle: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   imageStyle: {
//     right: 3,
//   },
//   containerImage: {
//     width: 46,
//     height: 46,
//     backgroundColor: '#FF5722',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 23,
//     marginLeft: 10,
//   },
//   inputStyle: {
//     borderWidth: 1,
//     padding: 10,
//     borderColor: '#E0E0E0',
//     borderRadius: 24.5,
//     width: '75%',
//   },
//   resultsContainer: {
//     padding: 20,
//   },
//   itemCard: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     marginBottom: 10,
//     width: '90%',
//     alignSelf: 'center',
//   },
//   noResultsText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#999',
//   },
//   loadingText: {
//     marginTop: 20,
//     fontSize: 16,
//     color: '#666',
//   },
// });

import React, {useEffect, useState, useRef} from 'react';
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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ItemCard from '../components/ItemCard';

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

const SearchResultsScreen = ({route}) => {
  const {query, textQuery} = route.params || {};
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [input, setInput] = useState(textQuery || '');
  const [loading, setLoading] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const isPlaying = useRef(false);
  const playbackListener = useRef<any>(null);

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

  const handlePlayAudio = async (audioUrl: string) => {
    try {
      // Stop any existing playback
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
          }, 500);
        }
      });
    } catch (error) {
      console.error('Playback error:', error);
      isPlaying.current = false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (query?.audio_path) {
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
  }, [query, textQuery]);

  const handleSearch = () => {
    if (input.trim()) {
      fetchSearchResults(input);
    }
  };

  const cardPress = () => {
    // Handle item card press if needed
  };

  const renderItem = ({item}: {item: SearchResult}) => (
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
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.containerImage}>
          <Image
            source={require('../assets/images/send.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        {query?.audio_path && (
          <TouchableOpacity
            onPress={() => handlePlayAudio(query.audio_path)}
            style={styles.containerImage}>
            <Image
              source={require('../assets/images/mic.png')}
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
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#E0E0E0',
    borderRadius: 24.5,
    flex: 1,
    backgroundColor: 'white',
  },
  resultsContainer: {
    padding: 20,
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default SearchResultsScreen;
