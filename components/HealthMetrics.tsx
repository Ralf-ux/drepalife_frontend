import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { TrendingUp, Heart, Activity, Thermometer } from 'lucide-react-native';

const healthData = [
  {
    id: '1',
    title: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    trend: 'stable',
    icon: Heart,
    color: Colors.medical.cardiology,
  },
  {
    id: '2',
    title: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    trend: 'good',
    icon: Activity,
    color: Colors.medical.general,
  },
  {
    id: '3',
    title: 'Temperature',
    value: '98.6',
    unit: '°F',
    trend: 'normal',
    icon: Thermometer,
    color: Colors.medical.neurology,
  },
];

export function HealthMetrics() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Health Metrics</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <TrendingUp size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.metricsContainer}>
        {healthData.map((metric) => {
          const Icon = metric.icon;
          return (
            <View key={metric.id} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.iconContainer, { backgroundColor: metric.color }]}>
                  <Icon size={20} color={Colors.white} />
                </View>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricUnit}>{metric.unit}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  viewAllText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  metricTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.gray600,
    flex: 1,
  },
  metricValue: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.gray500,
    textAlign: 'center',
  },
});