import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: service.color }]}>
        <Icon size={24} color={Colors.white} />
      </View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    textAlign: 'center',
  },
});