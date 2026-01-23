import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';

export const Main = ({ navigation }: any) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loader animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();

    // Navigate after delay
   const timer = setTimeout(() => {
      navigation.replace('Home'); // or whatever your next screen is called
    }, 3000); // 3 second delay

    // Cleanup
    return () => clearTimeout(timer);
  }, [navigation, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Loader */}
      <Animated.Image
        source={require('../assets/hour-glass.png')}
        style={[styles.loader, { transform: [{ rotate }] }]}
      />

      {/* Loading text */}
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 80,
  },
  loader: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FF6A00',
    fontWeight: '600',
  },
});