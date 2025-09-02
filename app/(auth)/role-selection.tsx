import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { UserRole } from '@/types';
import { Colors, Spacing, Typography } from '@/constants/Colors';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: string;
}

const roleOptions: RoleOption[] = [
  {
    role: 'visitor',
    title: 'Visitor',
    description: 'Browse healthcare information and services',
    icon: '👋',
  },
  {
    role: 'patient',
    title: 'Patient',
    description: 'Access medical services and manage your health',
    icon: '🏥',
  },
  {
    role: 'health_expert',
    title: 'Health Expert',
    description: 'Provide medical consultations and manage patients',
    icon: '👨‍⚕️',
  },
  {
    role: 'admin',
    title: 'Administrator',
    description: 'Manage platform operations and user accounts',
    icon: '⚙️',
  },
];

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      router.push({
        pathname: '/(auth)/register',
        params: { role: selectedRole }
      });
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryLight]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>
            Select how you'll be using our healthcare platform
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          {roleOptions.map((option) => (
            <TouchableOpacity
              key={option.role}
              style={[
                styles.roleCard,
                selectedRole === option.role && styles.selectedRoleCard
              ]}
              onPress={() => setSelectedRole(option.role)}
            >
              <Text style={styles.roleIcon}>{option.icon}</Text>
              <Text style={styles.roleTitle}>{option.title}</Text>
              <Text style={styles.roleDescription}>{option.description}</Text>
              
              <View style={[
                styles.radioButton,
                selectedRole === option.role && styles.selectedRadioButton
              ]}>
                {selectedRole === option.role && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedRole && styles.disabledButtonText
          ]}>
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Welcome</Text>
        </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.xxl,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: 'Inter-Bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: Spacing.lg,
  },
  rolesContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRoleCard: {
    borderColor: Colors.primaryDark,
    backgroundColor: Colors.gray50,
  },
  roleIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  roleTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  roleDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  continueButton: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: Colors.gray200,
  },
  continueButtonText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
    textAlign: 'center',
  },
  disabledButtonText: {
    color: Colors.gray400,
  },
  backButton: {
    paddingVertical: Spacing.md,
  },
  backButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.8,
  },
});