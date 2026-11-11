// src/screens/VetDetailsScreen.js
// Shows the vet the user selected.
// The vet's id arrives through route.params.

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { getVetById } from '../data/vets';

// "route" holds the data sent from the previous screen.
export default function VetDetailsScreen({ route, navigation }) {
  // 1. Read the id that VetListScreen sent: { vetId: item.id }
  const { vetId } = route.params;

  // 2. Find the matching vet in our data
  const vet = getVetById(vetId);

  // Safety check: if no vet matches, show a message instead of a blank screen
  if (!vet) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Veterinarian not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.name}>{vet.name}</Text>
        <Text style={styles.kind}>{vet.kind}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>About</Text>
        <Text style={styles.value}>{vet.about}</Text>

        <Text style={styles.label}>Rating</Text>
        <Text style={styles.value}>★ {vet.rating.toFixed(1)}</Text>

        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{vet.distanceKm} km away</Text>

        <Text style={styles.label}>Visit fee</Text>
        <Text style={styles.value}>₱{vet.fee}</Text>

        <Text style={styles.label}>Services</Text>
        {vet.services.map((service) => (
          <Text key={service} style={styles.value}>
            • {service}
          </Text>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        onPress={() => navigation.navigate('BookAppointment', { vetId: vet.id })}
      >
        <Text style={styles.primaryText}>Book Appointment</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryText}>Back to List</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  notFound: { padding: SPACING.large, fontSize: 16, color: COLORS.ink },
  hero: {
    backgroundColor: COLORS.green,
    borderRadius: RADIUS.card,
    padding: SPACING.large,
    marginBottom: SPACING.medium,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  kind: { fontSize: 16, color: COLORS.amber, marginTop: 4 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: SPACING.small,
  },
  value: { fontSize: 16, color: COLORS.ink, marginTop: 2 },
  primaryButton: {
    backgroundColor: COLORS.amber,
    borderRadius: RADIUS.button,
    padding: SPACING.medium,
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  primaryText: { fontSize: 16, fontWeight: 'bold', color: COLORS.onAmber },
  secondaryButton: {
    borderRadius: RADIUS.button,
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: SPACING.medium,
    alignItems: 'center',
  },
  secondaryText: { fontSize: 16, fontWeight: '600', color: COLORS.green },
  pressed: { opacity: 0.7 },
});