import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import {
  Stethoscope,
  MessageCircle,
  Users,
  Calendar,
  Heart,
  Bell,
  LogOut,
  Activity,
  TrendingUp,
  X,
  Check,
} from 'lucide-react-native';
import { useAuthRedirect } from '../../hooks/authUserRedirect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingChatButton from '../../components/FloatingChatButton';
import axios from 'axios';
import { BASE_URL } from '@/constants/config';
import { HealthTip } from '@/types';
export default function PatientDashboard() {
  const { user, loading } = useAuthRedirect();

  // const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [tipsLoading, setTipsLoading] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh - in real app, refetch data here
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      console.log('token removed successfully');

      // Redirect to landing page after logout
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  // const { logout } = useAuth();
  const symptomsList = [
    'Fever',
    'Cough',
    'Fatigue',
    'Shortness of Breath',
    'Chest Pain',
    'Headache',
    'Nausea',
    'Dizziness',
  ];

  const handleSubmit = () => {
    Alert.alert(
      'Health Status Submitted',
      'Your health status has been sent to your health expert.'
    );
    setModalVisible(false);
  };

  const fetchHealthTips = async () => {
    try {
      setTipsLoading(true);
      const response = await axios.get(`${BASE_URL}/health-tips`);
      setHealthTips(response.data);
    } catch (error) {
      console.error('Failed to fetch health tips:', error);
      Alert.alert('Error', 'Failed to load health tips');
    } finally {
      setTipsLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  const renderOverview = () => (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Today's Health Status</Text>
            {symptomsList.map((symptom) => (
              <TouchableOpacity
                key={symptom}
                style={styles.symptomOption}
                onPress={() => {
                  setSelectedSymptoms((prev) =>
                    prev.includes(symptom)
                      ? prev.filter((s) => s !== symptom)
                      : [...prev, symptom]
                  );
                }}
              >
                <Text style={styles.symptomText}>{symptom}</Text>
                {selectedSymptoms.includes(symptom) && (
                  <Check size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <X size={20} color={Colors.gray600} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <LinearGradient
          colors={['#ea6666ff', '#a24b4bff']}
          style={styles.welcomeCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.welcomeContent}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || user?.firstName?.charAt(0) || 'P'}
              </Text>
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>
                Welcome back, {user?.name || `${user?.firstName} ${user?.lastName}` || 'User'}!
              </Text>
              <Text style={styles.welcomeSubtitle}>
                How are you feeling today?
              </Text>
            </View>
            <View style={styles.healthScore}>
              <Text style={styles.scoreNumber}>85</Text>
              <Text style={styles.scoreLabel}>Health Score</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[
                styles.quickActionCard,
                { backgroundColor: Colors.primaryLight },
              ]}
              onPress={() => router.push('/(patient)/genotype-test')}
            >
              <LinearGradient
                colors={[Colors.primaryLight, '#fecaca']}
                style={styles.quickActionGradient}
              >
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: Colors.primary },
                  ]}
                >
                  <Heart size={20} color="#ffffff" />
                </View>
                <Text style={styles.quickActionText}>Genotype{'\n'}Test</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#dbeafe' }]}
              onPress={() => router.push('/(patient)/consultation')}
            >
              <LinearGradient
                colors={['#bfdbfe', '#dbeafe']}
                style={styles.quickActionGradient}
              >
                <View
                  style={[styles.actionIcon, { backgroundColor: '#2563eb' }]}
                >
                  <Stethoscope size={20} color="#ffffff" />
                </View>
                <Text style={styles.quickActionText}>
                  Request{'\n'}Consultation
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#dcfce7' }]}
              onPress={() => router.push('/(patient)/chat')}
            >
              <LinearGradient
                colors={['#bbf7d0', '#dcfce7']}
                style={styles.quickActionGradient}
              >
                <View
                  style={[styles.actionIcon, { backgroundColor: '#16a34a' }]}
                >
                  <MessageCircle size={20} color="#ffffff" />
                </View>
                <Text style={styles.quickActionText}>
                  Chat with{'\n'}Expert
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { backgroundColor: '#fef3c7' }]}
              onPress={() => router.push('/(patient)/community')}
            >
              <LinearGradient
                colors={['#fde68a', '#fef3c7']}
                style={styles.quickActionGradient}
              >
                <View
                  style={[styles.actionIcon, { backgroundColor: '#d97706' }]}
                >
                  <Users size={20} color="#ffffff" />
                </View>
                <Text style={styles.quickActionText}>Join{'\n'}Community</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Health Status Card */}
        <View style={styles.healthStatusContainer}>
          <Text style={styles.sectionTitle}>Today's Health Status</Text>
          <View style={styles.healthStatusCard}>
            <LinearGradient
              colors={['#f0f9ff', '#e0f2fe']}
              style={styles.statusCardGradient}
            >
              <View style={styles.statusHeader}>
                <View style={styles.statusIconContainer}>
                  <Activity size={24} color="#0ea5e9" />
                </View>
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>Daily Check-in</Text>
                  <Text style={styles.statusSubtitle}>Track your wellness</Text>
                </View>
                <TouchableOpacity
                  style={styles.statusButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.statusButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.healthMetrics}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>7.2</Text>
                  <Text style={styles.metricLabel}>Pain Level</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>85%</Text>
                  <Text style={styles.metricLabel}>Hydration</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>8h</Text>
                  <Text style={styles.metricLabel}>Sleep</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Health Tips Section */}
        <View style={styles.healthTipsContainer}>
          <View style={styles.tipsHeader}>
            <Text style={styles.sectionTitle}>Health Tips</Text>
            <TrendingUp size={20} color="#10b981" />
          </View>
        {tipsLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading health tips...</Text>
          </View>
        ) : healthTips.length > 0 ? (
          healthTips.map((tip, index) => (
            <View key={tip._id || index} style={styles.tipCard}>
              <LinearGradient
                colors={
                  index % 2 === 0
                    ? ['#ecfdf5', '#f0fdf4']
                    : ['#fef7ff', '#faf5ff']
                }
                style={styles.tipGradient}
              >
                <View style={styles.tipIconContainer}>
                  <Text style={styles.tipEmoji}>
                    {index % 2 === 0 ? '💧' : '🏃‍♀️'}
                  </Text>
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.content}</Text>
                </View>
              </LinearGradient>
            </View>
          ))
        ) : (
          <View style={styles.noTipsContainer}>
            <Text style={styles.noTipsText}>No health tips available</Text>
          </View>
        )}
        </View>
      </ScrollView>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'health':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Health Records</Text>
            <Text style={styles.comingSoonSubtext}>Coming Soon</Text>
          </View>
        );
      case 'messages':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Messages</Text>
            <Text style={styles.comingSoonSubtext}>Coming Soon</Text>
          </View>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#bc0f0fff', '#5f0404ff']} style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={22} color="#ffffff" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Modern Tab Bar */}
      <View style={styles.tabBarContainer}>
        <LinearGradient colors={['#ffffff', '#f8fafc']} style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'overview' && styles.activeTabIcon,
              ]}
            >
              <Activity
                size={18}
                color={activeTab === 'overview' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>

          {/* Removed Health and Messages tab buttons as per user request */}
          {/* <TouchableOpacity
            style={[styles.tab, activeTab === 'health' && styles.activeTab]}
            onPress={() => setActiveTab('health')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'health' && styles.activeTabIcon,
              ]}
            >
              <Heart
                size={18}
                color={activeTab === 'health' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'health' && styles.activeTabText,
              ]}
            >
              Health
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
            onPress={() => setActiveTab('messages')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'messages' && styles.activeTabIcon,
              ]}
            >
              <MessageCircle
                size={18}
                color={activeTab === 'messages' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'messages' && styles.activeTabText,
              ]}
            >
              Messages
            </Text>
          </TouchableOpacity> */}
        </LinearGradient>
      </View>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  healthScore: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  scoreLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  symptomOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  symptomText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  healthStatusContainer: {
    marginVertical: 20,
  },
  healthStatusCard: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  statusCardGradient: {
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusIconContainer: {
    marginRight: 10,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  statusButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  statusButtonText: {
    color: '#fff',
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
  },
  healthTipsContainer: {
    marginVertical: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipCard: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tipGradient: {
    padding: 20,
  },
  tipIconContainer: {
    marginRight: 10,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
  },
  tipEmoji: {
    fontSize: 24,
  },
  quickActionsContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionGradient: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    marginBottom: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  tabBarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Style for active tab if needed
  },
  tabIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeTabIcon: {
    backgroundColor: '#f63b3bff',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#f63b3bff',
    fontWeight: '600',
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 100,
  },
  comingSoonSubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  noTipsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noTipsText: {
    fontSize: 16,
    color: '#64748b',
  },
});
