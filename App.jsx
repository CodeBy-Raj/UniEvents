import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
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