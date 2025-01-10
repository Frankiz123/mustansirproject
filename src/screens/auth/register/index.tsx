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
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {registerApiHandler} from '../../../redux/actions';
import {AppDispatch} from '../../../redux/store';
import {AuthStackParamList} from '../../../navigation/routes';

import styles from './styles';
import {selectAuth} from '../../../redux/selectors';

const RegisterScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector(selectAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const backPress = () => {
    navigation.goBack();
  };

  const validateInputs = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!passwordValue.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPasswordValue.trim()) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const callApiSignUp = useCallback(async () => {
    if (!validateInputs()) return;

    const date = new Date();
    const isoString = date.toISOString();

    try {
      const resultAction = await dispatch(
        registerApiHandler({
          name,
          email,
          created_at: isoString,
          updated_at: isoString,
          password: passwordValue,
          password_confirm: confirmPasswordValue,
          role: '',
          verified: false,
          verification_code: '',
        }),
      );

      if (registerApiHandler.fulfilled.match(resultAction)) {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('LoginScreen');
      } else if (registerApiHandler.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload as string;
        if (errorMessage === 'User already exists') {
          Alert.alert(
            'Error',
            'User already exists. Please use a different email.',
          );
        } else {
          Alert.alert('Error', errorMessage);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  }, [confirmPasswordValue, dispatch, email, name, passwordValue, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainFlex}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={backPress} style={styles.backButton}>
              <BackIcon name="left" size={20} />
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Create an account so you can explore all the Products.
            </Text>
          </View>

          <View style={styles.form}>
            <View>
              <TextInput
                style={[styles.input, styles.mt20]}
                placeholder="Name"
                value={name}
                onChangeText={val => setName(val)}
                placeholderTextColor="#A1A1A1"
              />
              {nameError ? (
                <Text style={styles.errorText}>{nameError}</Text>
              ) : null}
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={val => setEmail(val)}
                placeholderTextColor="#A1A1A1"
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
            <View style={styles.passwordContainer}>
              <View>
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="Password"
                  value={passwordValue}
                  onChangeText={val => setPasswordValue(val)}
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
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            <View style={styles.passwordContainer}>
              <View>
                <TextInput
                  style={styles.inputWithIcon}
                  value={confirmPasswordValue}
                  onChangeText={val => setConfirmPasswordValue(val)}
                  placeholder="Confirm Password"
                  placeholderTextColor="#A1A1A1"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="#A1A1A1"
                  />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : null}
            </View>
          </View>

          <TouchableOpacity onPress={callApiSignUp} style={styles.button}>
            {loading ? (
              <ActivityIndicator color={'white'} size={20} />
            ) : (
              <Text style={styles.buttonText}>Sign up</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
