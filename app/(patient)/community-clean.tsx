import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';
import { ArrowLeft, Users, MessageCircle, Heart, Calendar } from 'lucide-react-native';

export default function CommunityScreen() {
  const communityPosts = [
    {
      id: '1',
      user: 'Sarah M.',
      role: 'Patient',
      content: 'Just got my genotype results back. Looking for others who have been through this journey.',
      likes: 12,
      comments: 5,
      time: '2 hours ago'
    },
    {
      id: '2',
      user: 'Dr. Johnson',
      role: 'Health Expert',
      content: 'Reminder: Weekly support group meeting tomorrow at 6 PM. We\'ll be discussing coping strategies.',
      likes: 24,
      comments: 8,
      time: '4 hours ago'
    },
    {
      id: '3',
      user: 'Michael T.',
      role: 'Caregiver',
      content: 'Sharing some resources that helped our family manage sickle cell symptoms.',
      likes: 18,
      comments: 3,
      time: '1 day ago'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Users size={48} color={Colors.primary} />
          <Text style={styles.welcomeTitle}>Welcome to the Community</Text>
          <Text style={styles.welcomeSubtitle}>
            Connect with others, share experiences, and find support
          </Text>
        </View>

        <TouchableOpacity style={styles.createPostButton}>
          <Text style={styles.createPostText}>Create New Post</Text>
        </TouchableOpacity>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          {communityPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{post.user[0]}</Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{post.user}</Text>
                    <Text style={styles.userRole}>{post.role}</Text>
                  </View>
                </View>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>

              <Text style={styles.postContent}>{post.content}</Text>

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Heart size={20} color={Colors.gray600} />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={20} color={Colors.gray600} />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventCard}>
            <Calendar size={24} color={Colors.primary} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Monthly Support Group</Text>
              <Text style={styles.eventDate}>Tomorrow, 6:00 PM</Text>
              <Text style={styles.eventDescription}>
                Join us for our monthly support group meeting. All are welcome!
              </Text>
            </View>
          </View>
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
  welcomeCard: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  welcomeTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    textAlign: 'center',
  },
  createPostButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  createPostText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  postsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  postCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Bold',
  },
  userName: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
  },
  userRole: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
  postTime: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray500,
  },
  postContent: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray700,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.gray600,
  },
  eventsSection: {
    marginBottom: Spacing.xl,
  },
  eventCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  eventTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
});
