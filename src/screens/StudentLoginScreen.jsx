import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { loginToSimplifi } from '../services/simplifiAuth';

const StudentLoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter both username and password.',
      });
      return;
    }

    setLoading(true);
    try {
      const token = await loginToSimplifi(username, password);
      
      if (token) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });
        // Navigate to Dashboard with the token and student details (if any)
        // For now, we pass the token. The dashboard will fetch data using this token.
        navigation.replace('StudentDashboard', { token, username });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid credentials or server error.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
          <View className="p-6 items-center">
            
            {/* Logo or Animation */}
            <View className="w-48 h-48 mb-8">
               <LottieView
                source={require('../assets/animations/login.json')} // Make sure you have a login animation or use an image
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            <Text className="text-3xl font-bold text-textPrimary mb-2">Student Login</Text>
            <Text className="text-textMuted mb-8 text-center">Enter your Simplifi credentials to access your dashboard.</Text>

            {/* Username Input */}
            <View className="w-full mb-4">
              <Text className="text-textPrimary font-bold mb-2 ml-1">Username / Roll No</Text>
              <TextInput
                className="w-full bg-surface text-textPrimary p-4 rounded-xl border border-border"
                placeholder="Enter your username"
                placeholderTextColor={COLORS.textMuted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="w-full mb-8">
              <Text className="text-textPrimary font-bold mb-2 ml-1">Password</Text>
              <View className="w-full bg-surface rounded-xl border border-border flex-row items-center">
                <TextInput
                  className="flex-1 text-textPrimary p-4"
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-4">
                  <Text className="text-accent font-bold">{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`w-full bg-buttonPrimary p-4 rounded-xl items-center shadow-lg ${loading ? 'opacity-70' : ''}`}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <Text className="text-textOnAccent font-bold text-lg">Logging in...</Text>
              ) : (
                <Text className="text-textOnAccent font-bold text-lg">Login</Text>
              )}
            </TouchableOpacity>

            <View className="mt-6 flex-row">
              <Text className="text-textMuted">Having trouble? </Text>
              <TouchableOpacity>
                <Text className="text-accent font-bold">Contact Admin</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentLoginScreen;
