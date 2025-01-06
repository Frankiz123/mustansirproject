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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import {useDispatch} from 'react-redux';
import {registerApiHandler} from '../../../redux/actions';
import {AppDispatch} from '../../../redux/store';

const RegisterScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const backPress = () => {
    navigation.goBack();
  };

  const callApiSignUp = useCallback(() => {
    const date = new Date();
    const isoString = date.toISOString();
    dispatch(
      registerApiHandler({
        name: name,
        email: email,
        created_at: isoString,
        updated_at: isoString,
        password: passwordValue,
        password_confirm: confirmPasswordValue,
        role: '',
        verified: false,
        verification_code: '',
      }),
    );
  }, [confirmPasswordValue, dispatch, email, name, passwordValue]);

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
            <TextInput
              style={[styles.input, styles.mt20]}
              placeholder="Name"
              value={name}
              onChangeText={val => setName(val)}
              placeholderTextColor="#A1A1A1"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={val => setEmail(val)}
              placeholderTextColor="#A1A1A1"
            />

            <View style={styles.passwordContainer}>
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

            <View style={styles.passwordContainer}>
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
          </View>

          <TouchableOpacity onPress={callApiSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
