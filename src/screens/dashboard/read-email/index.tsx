import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppDispatch} from '../../../redux/store';
import {
  readEmailApiHandler,
  readEmailAuthorizeApiHandler,
  readEmailReadInboxApiHandler,
} from '../../../redux/actions';
import {selectReadEmail} from '../../../redux/selectors';
import {AppStackParamList} from '../../../navigation/routes';

import styles from './styles';

interface IReadEmail {}

const ReadEmail: React.FC<IReadEmail> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const {isAuthorize, readInbox, read_auth_url} = useSelector(selectReadEmail);

  const [codeVerification, setCodeVerification] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (isAuthorize && readInbox) {
      navigation.replace('SearchScreen');
    }
  }, [isAuthorize, navigation, readInbox]);

  const onChangeCodeVerification = (value: string) =>
    setCodeVerification(value);

  const openURL = useCallback(async (readAuth_url: string) => {
    try {
      // URL you want to open
      const url = readAuth_url;

      // Open the URL in the InAppBrowser
      await InAppBrowser.open(url, {
        // Additional options (you can adjust them as needed)
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#000000',
        preferredControlTintColor: '#FFFFFF',
        readerMode: false,
        animated: true,
      });
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  }, []);

  const callReadEmail = useCallback(() => {
    dispatch(readEmailApiHandler());
  }, [dispatch]);

  useEffect(() => {
    callReadEmail();
  }, [callReadEmail]);

  useEffect(() => {
    if (read_auth_url) {
      openURL(read_auth_url);
    }
  }, [openURL, read_auth_url]);

  const handleSubmit = () => {
    if (!codeVerification) {
      Alert.alert('Please Enter Code');
      return;
    }
    setLoader(true);
    dispatch(readEmailAuthorizeApiHandler({code: codeVerification}))
      .unwrap()
      .then(res => {
        console.log('res', res);
        if (res) {
          setTimeout(() => {
            dispatch(readEmailReadInboxApiHandler());
            setLoader(false);
          }, 1400);
        }
      })
      .catch(error => {
        setLoader(false);
        Alert.alert('error', error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          value={codeVerification}
          onChangeText={onChangeCodeVerification}
          placeholder="Enter verification code"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {loader ? (
            <ActivityIndicator color={'white'} size={20} />
          ) : (
            <Text style={styles.buttonText}>Proceed to Search Products</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        disabled={readEmailLoading}
        style={styles.buttonStyle}
        onPress={callReadEmail}>
        {readEmailLoading ? (
          <ActivityIndicator color={'white'} size={20} />
        ) : (
          <Text style={styles.buttonLabel}>Read Email</Text>
        )}
      </TouchableOpacity> */}
    </View>
  );
};

export default ReadEmail;
