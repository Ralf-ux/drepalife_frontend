import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';

export default function HealthLogoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.leafIcon}>🍃</Text>
        <Text style={styles.title}>Health Care</Text>
        <Text style={styles.tagline}>Your Health, Our Priority</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  leafIcon: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.huge,
    fontFamily: 'Inter-Bold',
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    opacity: 0.9,
  },
});