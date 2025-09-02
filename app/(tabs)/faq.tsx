import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through the Quick Actions on the home screen or by navigating to the Appointment Booking section. Select your preferred doctor, date, and time slot.',
    category: 'Appointments',
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including MOMO, credit cards, debit cards, and insurance coverage. Payment can be made online or at the time of visit.',
    category: 'Payments',
  },
  {
    id: '3',
    question: 'How secure is my medical data?',
    answer: 'We follow HIPAA compliance standards and use encryption to protect all medical data. Your information is secure and only accessible to authorized healthcare providers.',
    category: 'Privacy',
  },
  {
    id: '4',
    question: 'Can I access telemedicine services?',
    answer: 'Yes, we offer comprehensive telemedicine services. You can schedule video consultations with our health experts from the comfort of your home.',
    category: 'Telemedicine',
  },
  {
    id: '5',
    question: 'How do I view my test results?',
    answer: 'Test results are automatically uploaded to your account and you\'ll receive a notification. You can view them in the Laboratory section of your dashboard.',
    category: 'Laboratory',
  },
];

export default function FAQScreen() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.subtitle}>Find answers to common questions about our platform</Text>
      </View>

      <View style={styles.content}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {faqData
              .filter(item => item.category === category)
              .map((item) => {
                const isExpanded = expandedItems.has(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.faqItem}
                    onPress={() => toggleExpanded(item.id)}
                  >
                    <View style={styles.questionContainer}>
                      <Text style={styles.question}>{item.question}</Text>
                      {isExpanded ? (
                        <ChevronUp size={20} color={Colors.primary} />
                      ) : (
                        <ChevronDown size={20} color={Colors.gray400} />
                      )}
                    </View>
                    {isExpanded && (
                      <View style={styles.answerContainer}>
                        <Text style={styles.answer}>{item.answer}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
          </View>
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
  },
  categorySection: {
    marginBottom: Spacing.xl,
  },
  categoryTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  question: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Medium',
    color: Colors.gray800,
    flex: 1,
    marginRight: Spacing.sm,
  },
  answerContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  answer: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    lineHeight: Typography.lineHeight.body * Typography.fontSize.sm,
    paddingTop: Spacing.sm,
  },
});