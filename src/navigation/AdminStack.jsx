import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminAuthScreen from '../screens/AdminAuthScreen';
import AdminPanel from '../screens/AdminPanel';
import AddEventScreen from '../screens/AddEventScreen';
import EditEventScreen from '../screens/EditEventScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

const Stack = createNativeStackNavigator();

const AdminStack = ({ isAuthenticated, onAuth }) => (
  <Stack.Navigator>
    <Stack.Screen name="AdminAuth" options={{ headerShown: false }}>
      {props => (
        <AdminAuthScreen {...props} onAuthSuccess={() => onAuth(true)} />
      )}
    </Stack.Screen>
    <Stack.Screen name="AdminPanel" options={{ headerShown: false }}>
      {props =>
        isAuthenticated ? (
          <AdminPanel {...props} />
        ) : (
          <AdminAuthScreen {...props} onAuthSuccess={() => onAuth(true)} />
        )
      }
    </Stack.Screen>
    <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EditEvent" component={EditEventScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AdminStack;
