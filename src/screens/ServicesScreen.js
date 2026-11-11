// src/screens/ServicesScreen.js
// Lists the animal care services. Tapping one opens the vet list
// and PASSES the chosen service name so the list can be filtered.

import React from 'react';
import { Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

// "name" must match the service names used in src/data/vets.js
const SERVICES = [
  {
    name: 'Vaccination',
    description: 'Protect your pigs, chickens and carabaos from common diseases.',
  },
  {
    name: 'Deworming',
    description: 'Remove internal parasites to keep your animals healthy and growing.',
  },
  {
    name: 'Farm visit',
    description: 'A veterinarian comes to your farm to check your animals.',
  },
  {
    name: 'Emergency',
    description: 'Urgent help for sick or injured animals.',
  },
];

export default function ServicesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        Choose a service to see the vets and technicians who offer it.
      </Text>

      {SERVICES.map((service) => (
        <Pressable
          key={service.name}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => navigation.navigate('VetList', { service: service.name })}
        >
          <Text style={styles.title}>{service.name}</Text>
          <Text style={styles.description}>{service.description}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  intro: {
    fontSize: 16,
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
  title: { fontSize: 17, fontWeight: '600', color: COLORS.navy },
  description: { fontSize: 14, color: COLORS.muted, marginTop: 4 },
});