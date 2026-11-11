// src/screens/VetListScreen.js
// Shows the list of veterinarians. Tapping one opens its details
// and PASSES the selected vet's id to the next screen.
// If a "service" was passed in, only vets offering it are shown.

import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { VETS } from '../data/vets';

export default function VetListScreen({ route, navigation }) {
  // When opened from Home there are no params, so "?." avoids an error.
  const service = route.params?.service;

  // Keep only the vets who offer the chosen service (or all vets if none chosen)
  const vets = service
    ? VETS.filter((vet) => vet.services.includes(service))
    : VETS;

  const renderVet = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => navigation.navigate('VetDetails', { vetId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.kind}>{item.kind}</Text>
      <View style={styles.row}>
        <Text style={styles.info}>★ {item.rating.toFixed(1)}</Text>
        <Text style={styles.info}>{item.distanceKm} km away</Text>
        <Text style={styles.info}>₱{item.fee}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {service ? (
        <Text style={styles.banner}>Showing vets offering: {service}</Text>
      ) : null}

      <FlatList
        data={vets}
        keyExtractor={(item) => item.id}
        renderItem={renderVet}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <Text style={styles.empty}>No veterinarians found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.medium },
  banner: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.navy,
    paddingHorizontal: SPACING.medium,
    paddingTop: SPACING.medium,
  },
  empty: { fontSize: 16, color: COLORS.muted, textAlign: 'center', marginTop: SPACING.large },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  cardPressed: { opacity: 0.7 },
  name: { fontSize: 17, fontWeight: '600', color: COLORS.navy },
  kind: { fontSize: 14, color: COLORS.muted, marginTop: 2 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.small,
  },
  info: { fontSize: 14, color: COLORS.ink },
});