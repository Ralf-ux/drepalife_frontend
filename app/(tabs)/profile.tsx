import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { User, Settings, Shield, Bell, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Activity, FileText, CreditCard } from 'lucide-react-native';

const profileMenuItems = [
  {
    id: '1',
    title: 'Edit Profile',
    subtitle: 'Update your personal information',
    icon: Edit,
    color: Colors.primary,
  },
  {
    id: '2',
    title: 'Medical History',
    subtitle: 'View your medical records',
    icon: FileText,
    color: Colors.medical.general,
  },
  {
    id: '3',
    title: 'Health Metrics',
    subtitle: 'Track your health data',
    icon: Activity,
    color: Colors.medical.cardiology,
  },
  {
    id: '4',
    title: 'Payment Methods',
    subtitle: 'Manage your payment options',
    icon: CreditCard,
    color: Colors.medical.neurology,
  },
  {
    id: '5',
    title: 'Settings',
    subtitle: 'App preferences and privacy',
    icon: Settings,
    color: Colors.gray600,
  },
  {
    id: '6',
    title: 'Privacy & Security',
    subtitle: 'Data protection settings',
    icon: Shield,
    color: Colors.medical.orthopedic,
  },
  {
    id: '7',
    title: 'Notifications',
    subtitle: 'Manage notification preferences',
    icon: Bell,
    color: Colors.warning,
  },
  {
    id: '8',
    title: 'Help & Support',
    subtitle: 'Get help with the app',
    icon: HelpCircle,
    color: Colors.accent,
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/welcome');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <User size={40} color={Colors.primary} />
          </View>
          <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {profileMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Icon size={20} color={Colors.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={[styles.iconContainer, { backgroundColor: Colors.error }]}>
            <LogOut size={20} color={Colors.white} />
          </View>
          <View style={styles.menuContent}>
            <Text style={[styles.menuTitle, { color: Colors.error }]}>Sign Out</Text>
            <Text style={styles.menuSubtitle}>Log out of your account</Text>
          </View>
        </TouchableOpacity>
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
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    marginBottom: Spacing.sm,
  },
  roleBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  roleText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  menuItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
});