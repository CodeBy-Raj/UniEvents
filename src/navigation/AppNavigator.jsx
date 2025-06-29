import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainStack from './MainStack';
import AdminStack from './AdminStack';
import StudentStack from './StudentStack';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ isAdminAuthenticated, onAdminAuth }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = 'help';
        if (route.name === 'Events') iconName = 'list-outline';
        else if (route.name === 'Admin') iconName = 'person-outline';
        else if (route.name === 'Student') iconName = 'walk-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#f9eed0',
      tabBarInactiveTintColor: '#cccccc',
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: '600',
      },
      tabBarStyle: {
        height: 60,
        backgroundColor: '#3a3546',
      },
    })}
  >
    <Tab.Screen name="Events" component={MainStack} options={{ headerShown: false }} />
    <Tab.Screen
      name="Admin"
      options={{ headerShown: false }}
    >
      {() => <AdminStack isAuthenticated={isAdminAuthenticated} onAuth={onAdminAuth} />}
    </Tab.Screen>
    <Tab.Screen name="Student" component={StudentStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default AppNavigator;
