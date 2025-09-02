import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, User, Stethoscope } from 'lucide-react-native';

export default function ConsultationScreen() {
  const [selectedExpert, setSelectedExpert] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const experts = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Hematologist' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Genetic Counselor' },
    { id: '3', name: 'Dr. Emily Davis', specialty: 'General Physician' },
    { id: '4', name: 'Dr. Robert Wilson', specialty: 'Pediatric Specialist' },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const requestConsultation = () => {
    // Handle consultation request logic
    alert('Consultation request submitted successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Consultation</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Stethoscope size={48} color={Colors.primary} style={styles.icon} />
          <Text style={styles.title}>Schedule a Consultation</Text>
          <Text style={styles.subtitle}>
            Book an appointment with our healthcare experts
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Select Healthcare Expert</Text>
            <View style={styles.expertList}>
              {experts.map((expert) => (
                <TouchableOpacity
                  key={expert.id}
                  style={[
                    styles.expertButton,
                    selectedExpert === expert.id && styles.selectedExpert
                  ]}
                  onPress={() => setSelectedExpert(expert.id)}
                >
                  <User size={20} color={Colors.primary} />
                  <View style={styles.expertInfo}>
                    <Text style={styles.expertName}>{expert.name}</Text>
                    <Text style={styles.expertSpecialty}>{expert.specialty}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Preferred Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select date (e.g., 2024-01-15)"
              value={selectedDate}
              onChangeText={setSelectedDate}
            />

            <Text style={styles.label}>Preferred Time</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.selectedTime
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Reason for Consultation</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Briefly describe your concerns"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity 
              style={styles.requestButton}
              onPress={requestConsultation}
              disabled={!selectedExpert || !selectedDate || !selectedTime || !reason}
            >
              <Text style={styles.requestButtonText}>Request Consultation</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Consultation Information</Text>
          <Text style={styles.infoText}>
            • Consultations are conducted via secure video call
            {'\n'}• You will receive a confirmation email with meeting details
            {'\n'}• Please be ready 5 minutes before your scheduled time
            {'\n'}• Emergency cases will be prioritized
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  form: {
    gap: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray700,
    marginBottom: Spacing.sm,
  },
  expertList: {
    gap: Spacing.sm,
  },
  expertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  selectedExpert: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  expertInfo: {
    marginLeft: Spacing.md,
  },
  expertName: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
  },
  expertSpecialty: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
  input: {
    backgroundColor: Colors.gray100,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray300,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeButton: {
    padding: Spacing.md,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    borderWidth: 1,
    borderColor: Colors.gray200,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  timeText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  requestButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  infoSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    lineHeight: Typography.lineHeight.body * Typography.fontSize.md,
  },
});
