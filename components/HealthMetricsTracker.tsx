import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Plus, TrendingUp, Activity, Heart } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { HealthMetric } from '@/types';

const metricTypes = [
  { type: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg', icon: Activity },
  { type: 'heart_rate', label: 'Heart Rate', unit: 'bpm', icon: Heart },
  { type: 'temperature', label: 'Temperature', unit: '°F', icon: TrendingUp },
  { type: 'weight', label: 'Weight', unit: 'lbs', icon: Plus },
];

export function HealthMetricsTracker() {
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [metricValue, setMetricValue] = useState<string>('');

  const handleAddMetric = () => {
    if (selectedMetric && metricValue) {
      // In real app, would save to database
      console.log('Adding metric:', { type: selectedMetric, value: metricValue });
      setSelectedMetric('');
      setMetricValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Health Metrics</Text>
        <Text style={styles.subtitle}>Monitor your daily health data</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.metricsGrid}>
          {metricTypes.map((metric) => {
            const Icon = metric.icon;
            return (
              <TouchableOpacity
                key={metric.type}
                style={[
                  styles.metricCard,
                  selectedMetric === metric.type && styles.selectedMetricCard
                ]}
                onPress={() => setSelectedMetric(metric.type)}
              >
                <Icon size={24} color={selectedMetric === metric.type ? Colors.white : Colors.primary} />
                <Text style={[
                  styles.metricLabel,
                  selectedMetric === metric.type && styles.selectedMetricLabel
                ]}>
                  {metric.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedMetric && (
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>
              Enter {metricTypes.find(m => m.type === selectedMetric)?.label} Value
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.valueInput}
                value={metricValue}
                onChangeText={setMetricValue}
                placeholder="Enter value"
                keyboardType="numeric"
              />
              <Text style={styles.unit}>
                {metricTypes.find(m => m.type === selectedMetric)?.unit}
              </Text>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddMetric}>
              <Plus size={20} color={Colors.white} />
              <Text style={styles.addButtonText}>Add Metric</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.recentMetrics}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          <View style={styles.metricEntry}>
            <Text style={styles.entryType}>Blood Pressure</Text>
            <Text style={styles.entryValue}>120/80 mmHg</Text>
            <Text style={styles.entryDate}>Today, 2:30 PM</Text>
          </View>
          <View style={styles.metricEntry}>
            <Text style={styles.entryType}>Heart Rate</Text>
            <Text style={styles.entryValue}>72 bpm</Text>
            <Text style={styles.entryDate}>Yesterday, 8:00 AM</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
  content: {
    padding: Spacing.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  metricCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedMetricCard: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  metricLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  selectedMetricLabel: {
    color: Colors.white,
  },
  inputSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    marginBottom: Spacing.md,
  },
  valueInput: {
    flex: 1,
    padding: Spacing.md,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
  },
  unit: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.gray600,
    paddingRight: Spacing.md,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  addButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
  recentMetrics: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  metricEntry: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  entryType: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
  },
  entryValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  entryDate: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.gray500,
  },
});