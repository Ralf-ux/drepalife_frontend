import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors, Spacing, Typography } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconBackground}>
            <Image
              source={require('@/assets/images/drepa.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Welcome to Health Care</Text>
          <Text style={styles.subtitle}>
            Comprehensive healthcare management at your fingertips
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏥</Text>
            <Text style={styles.featureText}>Book Appointments</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💬</Text>
            <Text style={styles.featureText}>Telemedicine</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Health Tracking</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/role-selection')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: Typography.fontSize.huge,
    fontFamily: 'Inter-Bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: Spacing.lg,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xxl * 2,
    paddingHorizontal: Spacing.md,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  featureText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
    textAlign: 'center',
  },
});
