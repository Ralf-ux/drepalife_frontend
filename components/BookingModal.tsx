import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, Calendar, Clock, CreditCard } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { Doctor } from '@/types';

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  doctor: Doctor;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const paymentMethods = [
  { id: 'momo', name: 'MOMO', icon: '📱' },
  { id: 'card', name: 'Credit Card', icon: '💳' },
  { id: 'insurance', name: 'Insurance', icon: '🏥' },
];

export function BookingModal({ visible, onClose, doctor }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Appointment</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.gray600} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <Text style={styles.consultationFee}>${doctor.consultationFee} consultation</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <TouchableOpacity style={styles.dateButton}>
              <Calendar size={20} color={Colors.primary} />
              <Text style={styles.dateButtonText}>Choose Date</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeSlotsContainer}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentContainer}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    selectedPayment === method.id && styles.selectedPaymentMethod
                  ]}
                  onPress={() => setSelectedPayment(method.id)}
                >
                  <Text style={styles.paymentIcon}>{method.icon}</Text>
                  <Text style={styles.paymentText}>{method.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  doctorInfo: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  doctorName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.xs,
  },
  doctorSpecialty: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    marginBottom: Spacing.xs,
  },
  consultationFee: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  dateButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeSlot: {
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
  },
  timeSlotText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
  },
  selectedTimeSlotText: {
    color: Colors.white,
  },
  paymentContainer: {
    gap: Spacing.sm,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentMethod: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  paymentIcon: {
    fontSize: 24,
  },
  paymentText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
  },
  bookButtonText: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
    textAlign: 'center',
  },
});