import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { Calendar, Clock, History, MessageCircle } from 'lucide-react-native';

const quickActions = [
  {
    id: '1',
    title: 'Book Appointment',
    icon: Calendar,
    color: Colors.primary,
  },
  {
    id: '2',
    title: 'View Queue',
    icon: Clock,
    color: Colors.secondary,
  },
  {
    id: '3',
    title: 'Visit History',
    icon: History,
    color: Colors.accent,
  },
  {
    id: '4',
    title: 'Chat Expert',
    icon: MessageCircle,
    color: Colors.medical.neurology,
  },
];

export function QuickActions() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsContainer}
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <TouchableOpacity key={action.id} style={styles.actionCard}>
              <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                <Icon size={24} color={Colors.white} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  actionsContainer: {
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  actionTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
    textAlign: 'center',
  },
});