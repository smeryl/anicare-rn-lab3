// src/screens/MyAppointmentsScreen.js
// Shows all appointments the user has booked, with their status.

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { getAppointments } from '../data/appointments';

export default function MyAppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  // Runs every time this screen comes into view, so new bookings always appear.
  useFocusEffect(
    useCallback(() => {
      setAppointments(getAppointments());
    }, [])
  );

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.vetName}>{item.vetName}</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.line}>Animal: {item.animal}</Text>
      <Text style={styles.line}>Service: {item.service}</Text>
      <Text style={styles.line}>Date: {item.date}</Text>
      <Text style={styles.fee}>Visit fee: ₱{item.fee}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No appointments yet</Text>
            <Text style={styles.emptyText}>
              Find a veterinarian and book your first appointment.
            </Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => navigation.navigate('VetList')}
        >
          <Text style={styles.buttonText}>Book a New Appointment</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  vetName: { flex: 1, fontSize: 17, fontWeight: '600', color: COLORS.navy },
  statusPill: {
    backgroundColor: COLORS.amber,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: SPACING.small,
  },
  statusText: { fontSize: 12, fontWeight: 'bold', color: COLORS.onAmber },
  line: { fontSize: 15, color: COLORS.ink, marginTop: 2 },
  fee: { fontSize: 14, color: COLORS.muted, marginTop: SPACING.small },
  emptyBox: { alignItems: 'center', marginTop: SPACING.large * 2 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: COLORS.navy },
  emptyText: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: SPACING.small,
  },
  footer: { padding: SPACING.medium },
  button: {
    backgroundColor: COLORS.green,
    borderRadius: RADIUS.button,
    padding: SPACING.medium,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  pressed: { opacity: 0.7 },
});