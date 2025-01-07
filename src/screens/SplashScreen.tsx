import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {RootState} from '../redux/store';

const SplashScreenComponent = () => {
  const navigation = useNavigation<any>();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      console.log('isAuthenticated :: ', isAuthenticated);

      if (isAuthenticated) {
        navigation.replace('ReadEmailScreen');
        return;
      }
      navigation.replace('Auth', {screen: 'LoginScreen'});
    }, 2000);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splashIcon.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Shopping Assistant</Text>
      <Text style={styles.subtitle}>Smart Shopping Simplified</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
    color: 'black',
  },
  subtitle: {
    fontSize: 21,
    color: 'black',
    fontWeight: '400',
    lineHeight: 32,
  },
});

export default SplashScreenComponent;
