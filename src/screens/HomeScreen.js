// src/screens/HomeScreen.js
// Main dashboard. Three buttons lead to the major features of AniCare.

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

// The menu items shown on the Home screen.
// "screen" is the name of the screen we will navigate to.
const MENU = [
  {
    key: 'services',
    title: 'Animal Care Services',
    subtitle: 'Vaccination, deworming and veterinary care',
    screen: 'Services',
  },
  {
    key: 'vets',
    title: 'Find a Veterinarian',
    subtitle: 'See available vets and animal technicians',
    screen: 'VetList',
  },
  {
    key: 'appointments',
    title: 'My Appointments',
    subtitle: 'View your bookings and their status',
    screen: 'MyAppointments',
  },
];

// React Navigation gives every screen a "navigation" prop automatically.
export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.appName}>AniCare</Text>
        <Text style={styles.tagline}>Connecting Farmers to Animal Care.</Text>
      </View>

      <Text style={styles.sectionTitle}>What do you need today?</Text>

      {MENU.map((item) => (
        <Pressable
          key={item.key}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  hero: {
    backgroundColor: COLORS.green,
    borderRadius: RADIUS.card,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  tagline: { fontSize: 16, color: COLORS.amber, marginTop: SPACING.small },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: SPACING.medium,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  cardPressed: { opacity: 0.7 },
  cardTitle: { fontSize: 17, fontWeight: '600', color: COLORS.navy },
  cardSubtitle: { fontSize: 14, color: COLORS.muted, marginTop: 4 },
});