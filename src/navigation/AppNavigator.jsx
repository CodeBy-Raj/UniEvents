import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainStack from './MainStack';
import AdminStack from './AdminStack';
import StudentStack from './StudentStack';
import { BlurView } from '@react-native-community/blur';
import { StyleSheet, useWindowDimensions } from 'react-native';

const Tab = createBottomTabNavigator();


const AppNavigator = ({ isAdminAuthenticated, onAdminAuth }) => {

 const { width: screenWidth } = useWindowDimensions();
  const tabBarWidth = Math.min(screenWidth , 400);

const dynamicTabBarStyle = {
  position: 'absolute',
  bottom: 0,
  height: 60,
  borderRadius: 35,
  marginBottom: 20,
  width: tabBarWidth,
  left: (screenWidth - tabBarWidth) / 2, // Center even when width is < screenWidth
  backgroundColor: 'transparent',
  borderTopWidth: 0,
  elevation: 5,
  overflow: 'hidden',
};

return(
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = 'help';
        if (route.name === 'Events') iconName = 'list-outline';
        else if (route.name === 'Admin') iconName = 'person-outline';
        else if (route.name === 'Student') iconName = 'walk-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FBD28B',
      tabBarInactiveTintColor: '#000000',

      tabBarLabelStyle: {
        fontSize: 13,
      },
      
      tabBarStyle: dynamicTabBarStyle,

      tabBarHideOnKeyboard: true,
         tabBarBackground: () => (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
          />
    ),
    tabBarPressColor: "transparent",
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
  )
};

export default AppNavigator;
