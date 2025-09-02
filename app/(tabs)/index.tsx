import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { ServiceCard } from '@/components/ServiceCard';
import { QuickActions } from '@/components/QuickActions';
import { HealthMetrics } from '@/components/HealthMetrics';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { Stethoscope, Ambulance, TestTube, Video, BookOpen, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const services = [
  {
    id: '1',
    title: 'Outpatient',
    description: 'General consultations',
    icon: Stethoscope,
    color: Colors.medical.general,
  },
  {
    id: '2',
    title: 'Emergency',
    description: '24/7 emergency care',
    icon: Ambulance,
    color: Colors.medical.emergency,
  },
  {
    id: '3',
    title: 'Laboratory',
    description: 'Medical tests & results',
    icon: TestTube,
    color: Colors.medical.cardiology,
  },
  {
    id: '4',
    title: 'Telemedicine',
    description: 'Virtual consultations',
    icon: Video,
    color: Colors.medical.neurology,
  },
  {
    id: '5',
    title: 'Health Education',
    description: 'Learn about health',
    icon: BookOpen,
    color: Colors.medical.pediatric,
  },
  {
    id: '6',
    title: 'Mental Health',
    description: 'Mental wellness support',
    icon: Heart,
    color: Colors.medical.orthopedic,
  },
];

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hi {user?.firstName || 'User'},</Text>
          <Text style={styles.tagline}>Kesehatan Anda Prioritas Kami</Text>
          
          <View style={styles.heroImageContainer}>
            <View style={styles.heroImagePlaceholder}>
              <Text style={styles.heroEmoji}>🏥</Text>
              <Text style={styles.heroText}>Quality Healthcare</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <QuickActions />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        </View>

        <HealthMetrics />
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
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: Colors.white,
    textAlign: 'center',
  },
  tagline: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  heroImageContainer: {
    marginTop: Spacing.md,
  },
  heroImagePlaceholder: {
    width: width - (Spacing.lg * 4),
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  heroEmoji: {
    fontSize: 40,
    marginBottom: Spacing.xs,
  },
  heroText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
});