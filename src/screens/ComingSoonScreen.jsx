import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function StudentPanel() {
  return (
    <View className="flex-1 p-3 bg-primary justify-center items-center">
      <LottieView
        source={require('../assets/animations/soon.json')}
        autoPlay
        loop
        speed={2}
        style={{
          width: 300,
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
}