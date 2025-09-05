import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

import {
  Users,
  Shield,
  Settings,
  BarChart3,
  Bell,
  UserPlus,
  LogOut,
  Activity,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react-native';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    experts: 45,
    pendingApprovals: 12,
  };

  const recentActivity = [
    {
      id: '1',
      action: 'New user registration',
      user: 'Sarah M.',
      time: '10 min ago',
      type: 'user',
    },
    {
      id: '2',
      action: 'Expert account approved',
      user: 'Dr. Johnson',
      time: '30 min ago',
      type: 'approval',
    },
    {
      id: '3',
      action: 'System backup completed',
      user: 'System',
      time: '1 hour ago',
      type: 'system',
    },
  ];

  const getActivityIcon = (type: any) => {
    switch (type) {
      case 'user':
        return <UserPlus size={16} color="#3b82f6" />;
      case 'approval':
        return <CheckCircle size={16} color="#10b981" />;
      case 'system':
        return <Settings size={16} color="#6366f1" />;
      default:
        return <Activity size={16} color="#64748b" />;
    }
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.welcomeCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.welcomeContent}>
          <View style={styles.adminInfo}>
            <View style={styles.avatarContainer}>
              <Shield size={24} color="#ffffff" />
            </View>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Admin {user?.lastName}</Text>
              <Text style={styles.welcomeSubtitle}>System Administrator</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>System Healthy</Text>
              </View>
            </View>
          </View>

          {systemStats.pendingApprovals > 0 && (
            <View style={styles.alertContainer}>
              <AlertTriangle size={20} color="#fbbf24" />
              <Text style={styles.alertText}>
                {systemStats.pendingApprovals} Pending
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* System Statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>System Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#dbeafe', '#bfdbfe']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#2563eb' }]}>
                <Users size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>
                {systemStats.totalUsers.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Total Users</Text>
              <View style={styles.statTrend}>
                <Activity size={12} color="#16a34a" />
                <Text style={styles.trendText}>+12%</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#dcfce7', '#bbf7d0']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#16a34a' }]}>
                <UserPlus size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>
                {systemStats.activeUsers.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Active Users</Text>
              <View style={styles.statTrend}>
                <Activity size={12} color="#16a34a" />
                <Text style={styles.trendText}>+8%</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#fef3c7', '#fde68a']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#d97706' }]}>
                <Shield size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>{systemStats.experts}</Text>
              <Text style={styles.statLabel}>Medical Experts</Text>
              <View style={styles.statTrend}>
                <Activity size={12} color="#16a34a" />
                <Text style={styles.trendText}>+3</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#fee2e2', '#fecaca']}
              style={styles.statGradient}
            >
              <View style={[styles.statIcon, { backgroundColor: '#dc2626' }]}>
                <AlertTriangle size={20} color="#ffffff" />
              </View>
              <Text style={styles.statNumber}>
                {systemStats.pendingApprovals}
              </Text>
              <Text style={styles.statLabel}>Pending Approvals</Text>
              <TouchableOpacity style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENT</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <View style={styles.activityHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {recentActivity.map((activity, index) => (
            <View key={activity.id} style={styles.activityCard}>
              <LinearGradient
                colors={['#ffffff', '#f8fafc']}
                style={styles.activityGradient}
              >
                <View style={styles.activityLeft}>
                  <View style={styles.activityIconContainer}>
                    {getActivityIcon(activity.type)}
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                    <Text style={styles.activityUser}>by {activity.user}</Text>
                  </View>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Management Actions */}
      <View style={styles.managementContainer}>
        <Text style={styles.sectionTitle}>Quick Management</Text>
        <View style={styles.managementGrid}>
          <TouchableOpacity style={styles.managementCard}>
            <LinearGradient
              colors={['#e0f2fe', '#f0f9ff']}
              style={styles.managementGradient}
            >
              <View
                style={[styles.managementIcon, { backgroundColor: '#0ea5e9' }]}
              >
                <Users size={20} color="#ffffff" />
              </View>
              <Text style={styles.managementText}>Manage{'\n'}Users</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.managementCard}>
            <LinearGradient
              colors={['#fef3c7', '#fffbeb']}
              style={styles.managementGradient}
            >
              <View
                style={[styles.managementIcon, { backgroundColor: '#f59e0b' }]}
              >
                <Shield size={20} color="#ffffff" />
              </View>
              <Text style={styles.managementText}>Expert{'\n'}Approvals</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.managementCard}>
            <LinearGradient
              colors={['#f3e8ff', '#faf5ff']}
              style={styles.managementGradient}
            >
              <View
                style={[styles.managementIcon, { backgroundColor: '#8b5cf6' }]}
              >
                <BarChart3 size={20} color="#ffffff" />
              </View>
              <Text style={styles.managementText}>
                Analytics{'\n'}Dashboard
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.managementCard}>
            <LinearGradient
              colors={[Colors.primaryLight, '#fecaca']}
              style={styles.managementGradient}
            >
              <View
                style={[
                  styles.managementIcon,
                  { backgroundColor: Colors.primary },
                ]}
              >
                <Settings size={20} color="#ffffff" />
              </View>
              <Text style={styles.managementText}>System{'\n'}Settings</Text>
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
      case 'users':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>User Management</Text>
            <Text style={styles.comingSoonSubtext}>Coming Soon</Text>
          </View>
        );
      case 'system':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>System Settings</Text>
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
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={22} color="#ffffff" />
            {systemStats.pendingApprovals > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>
                  {systemStats.pendingApprovals}
                </Text>
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
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'overview' && styles.activeTabIcon,
              ]}
            >
              <BarChart3
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
            style={[styles.tab, activeTab === 'users' && styles.activeTab]}
            onPress={() => setActiveTab('users')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'users' && styles.activeTabIcon,
              ]}
            >
              <Users
                size={18}
                color={activeTab === 'users' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'users' && styles.activeTabText,
              ]}
            >
              Users
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'system' && styles.activeTab]}
            onPress={() => setActiveTab('system')}
          >
            <View
              style={[
                styles.tabIconContainer,
                activeTab === 'system' && styles.activeTabIcon,
              ]}
            >
              <Settings
                size={18}
                color={activeTab === 'system' ? '#ffffff' : '#64748b'}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === 'system' && styles.activeTabText,
              ]}
            >
              System
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  activeTab: {},
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
  adminInfo: {
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
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  alertText: {
    fontSize: 12,
    color: '#fbbf24',
    fontWeight: '600',
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
    minHeight: 120,
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
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16a34a',
  },
  urgentBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityHeader: {
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
  activityList: {
    gap: 8,
  },
  activityCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  activityGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  activityUser: {
    fontSize: 12,
    color: '#64748b',
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  managementContainer: {
    marginBottom: 32,
  },
  managementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  managementCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  managementGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  managementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  managementText: {
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
