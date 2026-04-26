import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDashboard from '../screens/StudentDashboard';
// import ComingSoon from '../screens/ComingSoonScreen';

import StudentLoginScreen from '../screens/StudentLoginScreen';

const Stack = createNativeStackNavigator();

const StudentStack = () => (
  <Stack.Navigator initialRouteName="StudentLogin">
    <Stack.Screen name="StudentLogin" component={StudentLoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="StudentDashboard" component={StudentDashboard} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default StudentStack;
