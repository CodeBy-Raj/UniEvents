import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import StudentDashboard from '../screens/StudentDashboard';
import ComingSoon from '../screens/ComingSoonScreen';

const Stack = createNativeStackNavigator();

const StudentStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ComingSoon" component={ComingSoon} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default StudentStack;
