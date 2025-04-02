import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AdminAuthScreen from './src/screens/AdminAuthScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdminPanel from './src/screens/AdminPanel';
import AddEventScreen from './src/screens/AddEventScreen';
import EditEventScreen from './src/screens/EditEventScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import StudentPanel from './src/screens/StudentPanel';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminAuth = status => {
    setIsAdminAuthenticated(status);
  };

  const AdminStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="AdminAuth" options={{ headerShown: false }}>
        {props => (
          <AdminAuthScreen
            {...props}
            onAuthSuccess={() => handleAdminAuth(true)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AdminPanel"
        options={{ headerShown: false }}
      >
        {props =>
          isAdminAuthenticated ? (
            <AdminPanel {...props} />
          ) : (
            <AdminAuthScreen
              {...props}
              onAuthSuccess={() => handleAdminAuth(true)}
            />
          )
        }
      </Stack.Screen>
      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'help-outline'; // Default icon
            if (route.name === 'Events') {
              iconName = 'list-outline';
            } else if (route.name === 'Admin') {
              iconName = 'settings-outline';
            } else if (route.name === 'StudentPanel') {
              iconName = 'person-circle-outline';
            }
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
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        })}>
        <Tab.Screen
          name="Events"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Admin"
          component={AdminStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Student"
          component={StudentPanel}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;