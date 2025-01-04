import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login Account</Text>
        <Text style={styles.subtitle}>
          Login to an account so you can explore all the Products.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, {marginTop: 20}]}
          placeholder="Email"
          placeholderTextColor="#A1A1A1"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Password"
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFF',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A5A5A',
    textAlign: 'center',
    lineHeight: 24,
    width: width * 0.8,
  },
  form: {
    marginTop: 40,
    marginHorizontal: width * 0.05,
  },
  input: {
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    borderColor: '#D6DFF2',
    borderWidth: 1,
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  inputWithIcon: {
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    borderColor: '#D6DFF2',
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: width * 0.05,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#5A5A5A',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5722',
  },
});
