// src/screens/WelcomeScreen.js
// First screen of the app: logo, tagline and a "Get Started" button.

import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logoCard}>
          <Image
            source={require('../../assets/images/anicarelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.tagline}>Connecting Farmers to Animal Care.</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    padding: SPACING.large,
    justifyContent: 'space-between',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.large,
  },
  logo: { width: 260, height: 245 },
  tagline: {
    fontSize: 17,
    color: COLORS.amber,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.amber,
    borderRadius: RADIUS.button,
    padding: SPACING.medium,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: COLORS.onAmber },
  pressed: { opacity: 0.7 },
});