import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { BASE_URL } from '@/constants/config';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const [backendMessage, setBackendMessage] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/test`);
      const data = await response.json();
      setBackendMessage(`${data.message} (${data.status})`);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching backend data:', err);
      setError('❌ Error connecting to backend');
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: '🧬',
      title: 'Genotype Compatibility',
      desc: 'Advanced genetic testing and compatibility analysis for informed family planning',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      icon: '📊',
      title: 'Health Monitoring',
      desc: 'Real-time health tracking with AI-powered insights and trend analysis',
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      icon: '👩‍⚕️',
      title: 'Expert Consultations',
      desc: '24/7 access to specialized sickle cell doctors and healthcare professionals',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
    {
      icon: '🤝',
      title: 'Community Support',
      desc: 'Connect with patients, families, and caregivers in our supportive community',
      color: '#8B5CF6',
      bgColor: '#F5F3FF',
    },
    {
      icon: '📱',
      title: 'Personalized Care',
      desc: 'AI-driven personalized treatment plans and medication reminders',
      color: '#EC4899',
      bgColor: '#FDF2F8',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Hero Section */}
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.heroSection}
      >
        {/* Floating Elements */}
        <View style={styles.floatingElement1} />
        <View style={styles.floatingElement2} />
        
        <View style={styles.heroContent}>
          <View style={styles.logoSection}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/assets/images/drepa.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.logoGlow} />
            </View>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>Drepalife</Text>
              <View style={styles.taglineContainer}>
                <View style={styles.taglineDot} />
                <Text style={styles.tagline}>Digital Health Platform</Text>
              </View>
            </View>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>
              Advanced Sickle Cell{'\n'}
              <Text style={styles.titleAccent}>Care & Support</Text>
            </Text>
            <Text style={styles.description}>
              Comprehensive digital health solutions designed specifically for sickle cell patients and their families. Experience the future of personalized healthcare.
            </Text>
            
            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10K+</Text>
                <Text style={styles.statLabel}>Active Users</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Medical Experts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Support</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.contentSection}>
        

       

        {/* Trust Section */}
       

        {/* Call to Action Section */}
        <View style={styles.ctaSection}>
         
          
          <TouchableOpacity 
            style={styles.primaryCta}
            onPress={() => router.push('/(auth)/login')}
          >
            <LinearGradient
              colors={['#EF4444', '#DC2626', '#B91C1C']}
              style={styles.ctaGradient}
            >
              <Text style={styles.primaryCtaText}>Sign In to Continue</Text>
              <View style={styles.ctaArrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryCta}
            onPress={() => router.push('/(auth)/role')}
          >
            <View style={styles.secondaryCtaContent}>
              <Text style={styles.secondaryCtaText}>Create New Account</Text>
              <Text style={styles.secondaryCtaSubtext}>Free to get started</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.socialProof}>
            
            <Text style={styles.socialProofText}>
              Join 10,000+ users managing their health with Drepalife
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
    minHeight: height * 0.75,
  },
  floatingElement1: {
    position: 'absolute',
    top: 100,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    opacity: 0.6,
  },
  floatingElement2: {
    position: 'absolute',
    bottom: -75,
    left: -75,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(246, 59, 59, 0.1)',
    opacity: 0.4,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 40,
  },
  logoWrapper: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    zIndex: -1,
  },
  brandContainer: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -1,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  taglineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#CBD5E1',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleSection: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 50,
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: '#EF4444',
  },
  description: {
    fontSize: 18,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 380,
    marginBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  contentSection: {
    padding: 24,
    paddingTop: 60,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 50,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 24,
  },
  featuresGrid: {
    marginBottom: 60,
  },
  featureItem: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  featureBackground: {
    padding: 28,
    position: 'relative',
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: -1,
  },
  iconText: {
    fontSize: 28,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b1e1eff',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  featureDesc: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  featureAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  trustSection: {
    marginBottom: 60,
  },
  trustCard: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trustIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  trustEmoji: {
    fontSize: 32,
  },
  trustTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  trustDesc: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  certificationBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  ctaSection: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 320,
    lineHeight: 24,
  },
  primaryCta: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryCtaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginRight: 8,
  },
  ctaArrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryCta: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 40,
  },
  secondaryCtaContent: {
    alignItems: 'center',
  },
  secondaryCtaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  secondaryCtaSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  socialProof: {
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginLeft: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar1: {
    backgroundColor: '#3B82F6',
    marginLeft: 0,
  },
  avatar2: {
    backgroundColor: '#10B981',
  },
  avatar3: {
    backgroundColor: '#F59E0B',
  },
  avatarMore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginLeft: -8,
  },
  avatarMoreText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  socialProofText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
});