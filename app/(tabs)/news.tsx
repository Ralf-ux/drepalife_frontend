import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';

const newsArticles = [
  {
    id: '1',
    title: 'New Breakthrough in Cancer Research',
    summary: 'Scientists discover promising new treatment method...',
    category: 'Research',
    readTime: '3 min read',
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400',
    publishedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Mental Health Awareness Week',
    summary: 'Understanding the importance of mental wellness...',
    category: 'Mental Health',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    publishedAt: '1 day ago',
  },
  {
    id: '3',
    title: 'COVID-19 Prevention Guidelines',
    summary: 'Updated recommendations from health authorities...',
    category: 'Public Health',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg?auto=compress&cs=tinysrgb&w=400',
    publishedAt: '2 days ago',
  },
];

export default function NewsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Health News</Text>
        <Text style={styles.subtitle}>Stay informed about health topics</Text>
      </View>

      <View style={styles.content}>
        {newsArticles.map((article) => (
          <TouchableOpacity key={article.id} style={styles.articleCard}>
            <Image source={{ uri: article.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <View style={styles.articleMeta}>
                <Text style={styles.category}>{article.category}</Text>
                <Text style={styles.publishTime}>{article.publishedAt}</Text>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleSummary}>{article.summary}</Text>
              <Text style={styles.readTime}>{article.readTime}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    gap: Spacing.lg,
  },
  articleCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: Spacing.md,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  category: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  publishTime: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.gray500,
  },
  articleTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: Spacing.xs,
  },
  articleSummary: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    lineHeight: Typography.lineHeight.body * Typography.fontSize.sm,
    marginBottom: Spacing.sm,
  },
  readTime: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.gray500,
  },
});