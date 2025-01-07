import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch} from '../../../redux/store';
import {loginApiHandler} from '../../../redux/actions';
import {AppStackParamList} from '../../../navigation/routes';
import {selectAuth} from '../../../redux/selectors';

import styles from './styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {loading} = useSelector(selectAuth);

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const loginHandler = useCallback(() => {
    dispatch(loginApiHandler({email, password}))
      .unwrap()
      .then(() => {
        navigation.navigate('ReadEmailScreen'); // Navigate to SearchScreen
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  }, [dispatch, email, password, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.ScrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Login Account</Text>
            <Text style={styles.subtitle}>
              Login to an account so you can explore all the Products.
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, styles.mt20]}
              placeholder="Email"
              value={email}
              onChangeText={val => setEmail(val)}
              placeholderTextColor="#A1A1A1"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Password"
                value={password}
                onChangeText={val => setPassword(val)}
                placeholderTextColor="#A1A1A1"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#A1A1A1"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={loginHandler} style={styles.button}>
            {loading ? (
              <ActivityIndicator size={20} color={'white'} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
