import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
  FileText,
  Bell,
  LogOut,
  Clock,
  TrendingUp,
  Award,
  Heart,
} from 'lucide-react-native';
import HealthTipsModal from '@/components/HealthTipsModal';

export default function ExpertDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [healthTipsModalVisible, setHealthTipsModalVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh - in real app, refetch data here
    setTimeout(() => setRefreshing(false), 2000);
  };

  const pendingConsultations = [
    {
      id: '1',
      patient: 'Sarah M.',
      time: '2:00 PM',
      date: 'Today',
      priority: 'high',
    },
    {
      id: '2',
      patient: 'Michael T.',
      time: '3:30 PM',
      date: 'Today',
      priority: 'medium',
    },
    {
      id: '3',
      patient: 'Emily R.',
      time: '10:00 AM',
      date: 'Tomorrow',
      priority: 'low',
    },
  ];

  const unreadMessages = 5;

  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case 'high':
        return Colors.primary;
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const renderOverview = () => (
    <ScrollView
      style={styles.tabContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <LinearGradient
        colors={['#bc0f0fff', '#5f0404ff']}
        style={styles.welcomeCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.welcomeContent}>
          <View style={styles.doctorInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>Dr</Text>
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Dr. {user?.name || `${user?.firstName} ${user?.lastName}` || 'Expert'}</Text>
              <Text style={styles.welcomeSubtitle}>Sickle Cell Specialist</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Available</Text>
              </View>
            </View>
          </View>
          <View style={styles.experienceContainer}>
            <Award size={24} color="#fbbf24" />
            <Text style={styles.experienceText}>Expert Level</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#dbeafe', '#bfdbfe']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#eb2525ff' }]}>
                <Stethoscope size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Consultations</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#dcfce7', '#bbf7d0']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#16a34a' }]}>
                <MessageCircle size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>{unreadMessages}</Text>
              <Text style={styles.statLabel}>New Messages</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#fef3c7', '#fde68a']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#d97706' }]}>
                <FileText size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Pending Reports</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#f3e8ff', '#ddd6fe']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#7c3aed' }]}>
                <TrendingUp size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>94%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Upcoming Consultations */}
      <View style={styles.consultationsContainer}>
        <View style={styles.consultationsHeader}>
          <Text style={styles.sectionTitle}>Upcoming Consultations</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {pendingConsultations.map((consultation) => (
          <TouchableOpacity
            key={consultation.id}
            style={styles.consultationCard}
          >
            <LinearGradient
              colors={['#ffffff', '#f8fafc']}
              style={styles.consultationGradient}
            >
              <View style={styles.consultationLeft}>
                <View style={styles.patientAvatar}>
                  <Text style={styles.patientInitial}>
                    {consultation.patient.charAt(0)}
                  </Text>
                </View>
                <View style={styles.consultationInfo}>
                  <Text style={styles.patientName}>{consultation.patient}</Text>
                  <View style={styles.consultationMeta}>
                    <Clock size={14} color="#64748b" />
                    <Text style={styles.consultationTime}>
                      {consultation.date} at {consultation.time}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.consultationRight}>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        getPriorityColor(consultation.priority) + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      { color: getPriorityColor(consultation.priority) },
                    ]}
                  >
                    {consultation.priority.toUpperCase()}
                  </Text>
                </View>
                <Stethoscope size={20} color="#f63b3bff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard}>
            <LinearGradient
              colors={['#e0f2fe', '#f0f9ff']}
              style={styles.quickActionGradient}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#0ea5e9' }]}>
                <MessageCircle size={20} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>View{'\n'}Messages</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <LinearGradient
              colors={['#fef3c7', '#fffbeb']}
              style={styles.quickActionGradient}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#f59e0b' }]}>
                <Calendar size={20} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>My{'\n'}Schedule</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <LinearGradient
              colors={[Colors.primaryLight, '#fecaca']}
              style={styles.quickActionGradient}
            >
              <View
                style={[styles.actionIcon, { backgroundColor: Colors.primary }]}
              >
                <FileText size={20} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>Medical{'\n'}Reports</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <LinearGradient
              colors={['#ecfdf5', '#f0fdf4']}
              style={styles.quickActionGradient}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#10b981' }]}>
                <Users size={20} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>Patient{'\n'}Records</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => setHealthTipsModalVisible(true)}
          >
            <LinearGradient
              colors={['#fef2f2', '#fef2f2']}
              style={styles.quickActionGradient}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#dc2626' }]}>
                <Heart size={20} color="#ffffff" />
              </View>
              <Text style={styles.quickActionText}>Health{'\n'}Tips</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'patients':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Patient Management</Text>
            <Text style={styles.comingSoonSubtext}>Coming Soon</Text>
          </View>
        );
      case 'reports':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Medical Reports</Text>
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
      <LinearGradient colors={['#6c0000ff', '#d00303ff']} style={styles.header}>
        <Text style={styles.headerTitle}>Expert Dashboard</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={22} color="#ffffff" />
            {unreadMessages > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{unreadMessages}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
            style={[styles.tab, activeTab === 'overview' && styles.container]}
            onPress={() => setActiveTab('overview')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'overview' && styles.activeTabIcon,
              ]}
            >
              <TrendingUp
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

          <TouchableOpacity
            style={[styles.tab, activeTab === 'patients' && styles.container]}
            onPress={() => setActiveTab('patients')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'patients' && styles.activeTabIcon,
              ]}
            >
              <Users
                size={18}
                color={activeTab === 'patients' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'patients' && styles.activeTabText,
              ]}
            >
              Patients
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'reports' && styles.container]}
            onPress={() => setActiveTab('reports')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'reports' && styles.activeTabIcon,
              ]}
            >
              <FileText
                size={18}
                color={activeTab === 'reports' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'reports' && styles.activeTabText,
              ]}
            >
              Reports
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Health Tips Modal */}
      <HealthTipsModal
        visible={healthTipsModalVisible}
        onClose={() => setHealthTipsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
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
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
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
    justifyContent: 'space-between',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  experienceContainer: {
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  statsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  consultationsContainer: {
    marginBottom: 24,
  },
  consultationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  consultationCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  consultationGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  consultationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  patientInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  consultationInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  consultationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultationTime: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  consultationRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  quickActionGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 18,
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
});
