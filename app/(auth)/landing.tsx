import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';

export default function LandingPage() {
  const [backendMessage, setBackendMessage] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      // Replace with your computer's IP address for real device testing
      const response = await fetch('http://192.168.100.25:3000/api/test');
      const data = await response.json();
      setBackendMessage(`${data.message} (${data.status})`);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching backend data:', err);
      setError('❌ Error connecting to backend');
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1b0714ff', '#201325ff', '#6f2323ff']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <View style={styles.logoSection}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/assets/images/drepa.png')}
                style={styles.logo}
                resizeMode="contain"
              />
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
              Comprehensive digital health solutions designed specifically for sickle cell patients and their families
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.contentSection}>
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#dbeafe' }]}>
              <Text style={styles.iconText}>🧬</Text>
            </View>
            <Text style={styles.featureTitle}>Genotype Compatibility</Text>
            <Text style={styles.featureDesc}>Advanced testing and analysis</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#dcfce7' }]}>
              <Text style={styles.iconText}>📊</Text>
            </View>
            <Text style={styles.featureTitle}>Health Monitoring</Text>
            <Text style={styles.featureDesc}>Daily wellness tracking</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#fef3c7' }]}>
              <Text style={styles.iconText}>👩‍⚕️</Text>
            </View>
            <Text style={styles.featureTitle}>Expert Consultations</Text>
            <Text style={styles.featureDesc}>Professional medical guidance</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#f3e8ff' }]}>
              <Text style={styles.iconText}>🤝</Text>
            </View>
            <Text style={styles.featureTitle}>Community Support</Text>
            <Text style={styles.featureDesc}>Connect with others</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#fce7f3' }]}>
              <Text style={styles.iconText}>📱</Text>
            </View>
            <Text style={styles.featureTitle}>Personalized Guidance</Text>
            <Text style={styles.featureDesc}>Tailored health recommendations</Text>
          </View>
        </View>


        <View style={styles.ctaSection}>
          <TouchableOpacity 
            style={styles.primaryCta}
            onPress={() => router.push('/(auth)/login')}
          >
            <LinearGradient
              colors={['#f63b3bff', '#d85b1dff']}
              style={styles.ctaGradient}
            >
              <Text style={styles.primaryCtaText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryCta}
            onPress={() => router.push('/(auth)/role')}
          >
            <Text style={styles.secondaryCtaText}>Create New Account</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Join thousands of users managing their sickle cell health
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroSection: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  brandContainer: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3b82f6',
    marginRight: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  titleSection: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 44,
  },
  titleAccent: {
    color: '#ef2b2bff',
  },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  contentSection: {
    padding: 24,
    paddingTop: 40,
  },
  featuresGrid: {
    marginBottom: 50,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
    flex: 1,
  },
  featureDesc: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  ctaSection: {
    alignItems: 'center',
  },
  primaryCta: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 14,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryCtaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  secondaryCta: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    marginBottom: 32,
  },
  secondaryCtaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    letterSpacing: 0.3,
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  backendStatusSection: {
    marginBottom: 40,
  },
  backendStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  backendStatusIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#e0f2fe',
  },
  backendIconText: {
    fontSize: 20,
  },
  backendStatusContent: {
    flex: 1,
  },
  backendStatusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  backendStatusDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
