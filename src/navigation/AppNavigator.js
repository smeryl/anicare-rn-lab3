// src/navigation/AppNavigator.js
// The navigation "map" of AniCare. Every screen is registered here.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../theme';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import VetListScreen from '../screens/VetListScreen';
import VetDetailsScreen from '../screens/VetDetailsScreen';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import MyAppointmentsScreen from '../screens/MyAppointmentsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.green },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'AniCare', headerBackVisible: false }}
      />
      <Stack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ title: 'Animal Care Services' }}
      />
      <Stack.Screen
        name="VetList"
        component={VetListScreen}
        options={{ title: 'Veterinarians' }}
      />
      <Stack.Screen
        name="VetDetails"
        component={VetDetailsScreen}
        options={{ title: 'Veterinarian Details' }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ title: 'Book Appointment' }}
      />
      <Stack.Screen
        name="MyAppointments"
        component={MyAppointmentsScreen}
        options={{ title: 'My Appointments' }}
      />
    </Stack.Navigator>
  );
}