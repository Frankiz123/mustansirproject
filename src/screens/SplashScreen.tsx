import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const SplashScreenComponent = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SearchScreen');
    }, 2000);
  }, [navigation]);

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
