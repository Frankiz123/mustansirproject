import React, {useEffect, useRef} from 'react';
import {StyleSheet, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingModalProps {
  visible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({visible}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      animationRef.current?.play(0, 100); // Ensure it starts from the beginning and loops
    } else {
      animationRef.current?.reset(); // Reset animation when hiding
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <LottieView
        ref={animationRef}
        source={require('../assets/Animation - 1740851432629.json')}
        autoPlay={true} // Auto start
        loop={true} // Loop animation
        style={styles.animation}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add slight dark overlay for better visibility
  },
});

export default LoadingModal;
