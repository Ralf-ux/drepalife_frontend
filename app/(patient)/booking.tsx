import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { Doctor } from '@/types';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 4.8,
    experience: 12,
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: true,
    consultationFee: 150,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    rating: 4.9,
    experience: 15,
    avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: true,
    consultationFee: 200,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    rating: 4.7,
    experience: 8,
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: false,
    consultationFee: 120,
  },
];

export default function BookingScreen() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Appointment</Text>
        <Text style={styles.subtitle}>Choose your preferred doctor and time</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Available Doctors</Text>
        
        {mockDoctors.map((doctor) => (
          <TouchableOpacity 
            key={doctor.id} 
            style={[
              styles.doctorCard,
              selectedDoctor?.id === doctor.id && styles.selectedDoctorCard,
              !doctor.available && styles.unavailableCard
            ]}
            onPress={() => doctor.available && setSelectedDoctor(doctor)}
            disabled={!doctor.available}
          >
            <View style={styles.doctorImageContainer}>
              <Text style={styles.doctorAvatar}>👨‍⚕️</Text>
            </View>
            
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              
              <View style={styles.doctorMeta}>
                <Text style={styles.rating}>⭐ {doctor.rating}</Text>
                <Text style={styles.experience}>{doctor.experience} years exp.</Text>
              </View>
              
              <View style={styles.feeContainer}>
                <DollarSign size={16} color={Colors.primary} />
                <Text style={styles.fee}>${doctor.consultationFee}</Text>
              </View>
            </View>
            
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: doctor.available ? Colors.success : Colors.gray400 }
              ]} />
              <Text style={styles.statusText}>
                {doctor.available ? 'Available' : 'Busy'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {selectedDoctor && (
          <View style={styles.bookingSection}>
            <Text style={styles.sectionTitle}>Select Date & Time</Text>
            
            <TouchableOpacity style={styles.dateSelector}>
              <Calendar size={20} color={Colors.primary} />
              <Text style={styles.dateSelectorText}>Choose Date</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSelector}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.timeSelectorText}>Choose Time</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
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
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  doctorCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDoctorCard: {
    borderColor: Colors.primary,
  },
  unavailableCard: {
    opacity: 0.6,
  },
  doctorImageContainer: {
    marginRight: Spacing.md,
  },
  doctorAvatar: {
    fontSize: 40,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    marginBottom: Spacing.xs,
  },
  doctorMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  rating: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
  },
  experience: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
  feeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  fee: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: Spacing.xs,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.gray600,
  },
  bookingSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  dateSelectorText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  timeSelectorText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.gray700,
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