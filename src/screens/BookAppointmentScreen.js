// src/screens/BookAppointmentScreen.js
// Lets the user choose an animal type, a service and a date for the selected vet.
// The vet's id arrives through route.params.

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { getVetById } from '../data/vets';
import { addAppointment } from '../data/appointments';

const ANIMALS = ['Pig', 'Chicken', 'Carabao'];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Makes the next 7 days starting tomorrow, e.g. "Thu, Nov 12, 2026"
function getNextDates() {
  const dates = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(`${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`);
  }
  return dates;
}

// A small reusable row of tappable choices
function Choices({ options, selected, onSelect }) {
  return (
    <View style={styles.chipRow}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function BookAppointmentScreen({ route, navigation }) {
  // Read the vet id sent from VetDetailsScreen
  const { vetId } = route.params;
  const vet = getVetById(vetId);

  const [animal, setAnimal] = useState(null);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);

  const dates = getNextDates();

  if (!vet) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Veterinarian not found.</Text>
      </View>
    );
  }

  const handleConfirm = () => {
    if (!animal || !service || !date) {
      Alert.alert('Incomplete', 'Please choose an animal, a service and a date.');
      return;
    }

    addAppointment({
      vetId: vet.id,
      vetName: vet.name,
      animal,
      service,
      date,
      fee: vet.fee,
    });

    Alert.alert('Booked!', 'Your appointment request was sent.', [
      { text: 'OK', onPress: () => navigation.navigate('MyAppointments') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Booking with</Text>
        <Text style={styles.heroName}>{vet.name}</Text>
        <Text style={styles.heroKind}>{vet.kind} • ₱{vet.fee}</Text>
      </View>

      <Text style={styles.sectionTitle}>1. Animal type</Text>
      <Choices options={ANIMALS} selected={animal} onSelect={setAnimal} />

      <Text style={styles.sectionTitle}>2. Service</Text>
      <Choices options={vet.services} selected={service} onSelect={setService} />

      <Text style={styles.sectionTitle}>3. Appointment date</Text>
      <Choices options={dates} selected={date} onSelect={setDate} />

      <Pressable
        style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmText}>Confirm Booking</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
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
  heroLabel: { fontSize: 13, color: '#FFFFFF' },
  heroName: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginTop: 2 },
  heroKind: { fontSize: 15, color: COLORS.amber, marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.navy,
    marginTop: SPACING.medium,
    marginBottom: SPACING.small,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  chipSelected: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  chipText: { fontSize: 14, color: COLORS.ink },
  chipTextSelected: { color: '#FFFFFF', fontWeight: '600' },
  confirmButton: {
    backgroundColor: COLORS.amber,
    borderRadius: RADIUS.button,
    padding: SPACING.medium,
    alignItems: 'center',
    marginTop: SPACING.large,
    marginBottom: SPACING.small,
  },
  confirmText: { fontSize: 16, fontWeight: 'bold', color: COLORS.onAmber },
  cancelButton: {
    borderRadius: RADIUS.button,
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: SPACING.medium,
    alignItems: 'center',
  },
  cancelText: { fontSize: 16, fontWeight: '600', color: COLORS.green },
  pressed: { opacity: 0.7 },
});