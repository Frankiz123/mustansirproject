// import React, {useCallback, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useDispatch, useSelector} from 'react-redux';

// import {AppDispatch} from '../../../redux/store';
// import {loginApiHandler} from '../../../redux/actions';
// import {AppStackParamList} from '../../../navigation/routes';
// import {selectAuth} from '../../../redux/selectors';

// import styles from './styles';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const {loading} = useSelector(selectAuth);

//   const navigation =
//     useNavigation<NativeStackNavigationProp<AppStackParamList>>();

//   const dispatch = useDispatch<AppDispatch>();

//   const loginHandler = useCallback(() => {
//     dispatch(loginApiHandler({email, password}))
//       .unwrap()
//       .then(() => {
//         navigation.replace('ReadEmailScreen'); // Navigate to SearchScreen
//       })
//       .catch(error => {
//         console.error('Login failed:', error);
//       });
//   }, [dispatch, email, password, navigation]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.flex}>
//         <ScrollView
//           contentContainerStyle={styles.ScrollContainer}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.header}>
//             <Text style={styles.title}>Login Account</Text>
//             <Text style={styles.subtitle}>
//               Login to an account so you can explore all the Products.
//             </Text>
//           </View>

//           <View style={styles.form}>
//             <TextInput
//               style={[styles.input, styles.mt20]}
//               placeholder="Email"
//               value={email}
//               onChangeText={val => setEmail(val)}
//               placeholderTextColor="#A1A1A1"
//             />

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.inputWithIcon}
//                 placeholder="Password"
//                 value={password}
//                 onChangeText={val => setPassword(val)}
//                 placeholderTextColor="#A1A1A1"
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.iconButton}
//                 onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? 'visibility' : 'visibility-off'}
//                   size={24}
//                   color="#A1A1A1"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <TouchableOpacity onPress={loginHandler} style={styles.button}>
//             {loading ? (
//               <ActivityIndicator size={20} color={'white'} />
//             ) : (
//               <Text style={styles.buttonText}>Sign In</Text>
//             )}
//           </TouchableOpacity>

//           <View style={styles.signupContainer}>
//             <Text style={styles.signupText}>Don't have an account? </Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('RegisterScreen')}>
//               <Text style={styles.signupLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// import React, {useCallback, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useDispatch, useSelector} from 'react-redux';

// import {AppDispatch} from '../../../redux/store';
// import {loginApiHandler} from '../../../redux/actions';
// import {AppStackParamList} from '../../../navigation/routes';
// import {selectAuth} from '../../../redux/selectors';

// import styles from './styles';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [apiError, setApiError] = useState('');

//   const {loading} = useSelector(selectAuth);

//   const navigation =
//     useNavigation<NativeStackNavigationProp<AppStackParamList>>();

//   const dispatch = useDispatch<AppDispatch>();

//   const validateInputs = () => {
//     let isValid = true;

//     if (!email) {
//       setEmailError('Email is required');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     if (!password) {
//       setPasswordError('Password is required');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     return isValid;
//   };

//   const loginHandler = useCallback(() => {
//     setApiError(''); // Clear any previous API errors

//     if (!validateInputs()) {
//       return;
//     }

//     dispatch(loginApiHandler({email, password}))
//       .unwrap()
//       .then(() => {
//         navigation.replace('ReadEmailScreen');
//       })
//       .catch(error => {
//         setApiError('Invalid email or password'); // Set API error
//       });
//   }, [dispatch, email, password, navigation]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.flex}>
//         <ScrollView
//           contentContainerStyle={styles.ScrollContainer}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.header}>
//             <Text style={styles.title}>Login Account</Text>
//             <Text style={styles.subtitle}>
//               Login to an account so you can explore all the Products.
//             </Text>
//           </View>

//           <View style={styles.form}>
//             <View style={{marginBottom: 15}}>
//               <TextInput
//                 style={[styles.input, styles.mt20]}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={val => setEmail(val)}
//                 placeholderTextColor="#A1A1A1"
//               />
//               {emailError ? (
//                 <Text style={styles.errorText}>{emailError}</Text>
//               ) : null}
//             </View>

//             <View style={styles.passwordContainer}>
//               <View>
//                 <TextInput
//                   style={styles.inputWithIcon}
//                   placeholder="Password"
//                   value={password}
//                   onChangeText={val => setPassword(val)}
//                   placeholderTextColor="#A1A1A1"
//                   secureTextEntry={!showPassword}
//                 />
//                 <TouchableOpacity
//                   style={styles.iconButton}
//                   onPress={() => setShowPassword(!showPassword)}>
//                   <Icon
//                     name={showPassword ? 'visibility' : 'visibility-off'}
//                     size={24}
//                     color="#A1A1A1"
//                   />
//                 </TouchableOpacity>
//               </View>
//               {passwordError ? (
//                 <Text style={styles.errorText}>{passwordError}</Text>
//               ) : null}
//             </View>
//           </View>

//           <TouchableOpacity onPress={loginHandler} style={styles.button}>
//             {loading ? (
//               <ActivityIndicator size={20} color={'white'} />
//             ) : (
//               <Text style={styles.buttonText}>Sign In</Text>
//             )}
//           </TouchableOpacity>

//           {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

//           <View style={styles.signupContainer}>
//             <Text style={styles.signupText}>Don't have an account? </Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('RegisterScreen')}>
//               <Text style={styles.signupLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

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
  Alert, // Import Alert
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

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {loading} = useSelector(selectAuth);

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const dispatch = useDispatch<AppDispatch>();

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const loginHandler = useCallback(() => {
    if (!validateInputs()) {
      return;
    }

    dispatch(loginApiHandler({email, password}))
      .unwrap()
      .then(() => {
        navigation.replace('ReadEmailScreen');
      })
      .catch(error => {
        Alert.alert(
          'Login Failed',
          'Invalid email or password', // Alert message
          [{text: 'OK'}], // Buttons
        );
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
            <View style={{marginBottom: 15}}>
              <TextInput
                style={[styles.input, styles.mt20]}
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
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
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
