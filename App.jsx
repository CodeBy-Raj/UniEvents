import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/theme';
import './global.css';

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const CustomDarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.primary, // Set global background to primary dark color
      card: COLORS.surface,
      text: COLORS.textPrimary,
      border: COLORS.surfaceLight,
    },
  };

  return (
    <PaperProvider>
      <NavigationContainer theme={CustomDarkTheme}>
        <AppNavigator
          isAdminAuthenticated={isAdminAuthenticated}
          onAdminAuth={setIsAdminAuthenticated}
        />
        <Toast />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
// This is the main entry point of the application.
// It sets up the navigation container and the paper provider for theming.