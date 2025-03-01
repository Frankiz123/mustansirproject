import React, {useEffect, useRef} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({visible}) => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <AnimatedLottieView
        source={require('../assets/Animation - 1740851432629.json')}
        progress={animationProgress.current}
        style={{width: '100%', height: '100%'}}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
  },
});

export default LoadingModal;
