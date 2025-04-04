import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function StudentPanel() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assests/animations/soon.json')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#060318',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headlineTxt: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold,',
  },
});
