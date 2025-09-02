import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';
import { ArrowLeft, Dna } from 'lucide-react-native';

export default function GenotypeTestScreen() {
  const [selectedGenotype, setSelectedGenotype] = useState('');
  const [partnerGenotype, setPartnerGenotype] = useState('');
  const [result, setResult] = useState('');

  const genotypes = ['AA', 'AS', 'AC', 'SS', 'SC', 'CC'];

  const checkCompatibility = () => {
    // Simple compatibility logic
    if (selectedGenotype === 'AA' && partnerGenotype === 'AA') {
      setResult('Excellent compatibility! Low risk of sickle cell disease in offspring.');
    } else if (selectedGenotype === 'AS' && partnerGenotype === 'AS') {
      setResult('25% chance of SS offspring. Consider genetic counseling.');
    } else if (selectedGenotype === 'SS' || partnerGenotype === 'SS') {
      setResult('High risk. Both partners should consult with a genetic counselor.');
    } else {
      setResult('Moderate risk. Please consult with a healthcare professional.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Genotype Compatibility Test</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Dna size={48} color={Colors.primary} style={styles.icon} />
          <Text style={styles.title}>Check Genetic Compatibility</Text>
          <Text style={styles.subtitle}>
            Understand the genetic risks for sickle cell disease in potential offspring
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Your Genotype</Text>
            <View style={styles.genotypeGrid}>
              {genotypes.map((genotype) => (
                <TouchableOpacity
                  key={genotype}
                  style={[
                    styles.genotypeButton,
                    selectedGenotype === genotype && styles.selectedGenotype
                  ]}
                  onPress={() => setSelectedGenotype(genotype)}
                >
                  <Text style={styles.genotypeText}>{genotype}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Partner's Genotype</Text>
            <View style={styles.genotypeGrid}>
              {genotypes.map((genotype) => (
                <TouchableOpacity
                  key={genotype}
                  style={[
                    styles.genotypeButton,
                    partnerGenotype === genotype && styles.selectedGenotype
                  ]}
                  onPress={() => setPartnerGenotype(genotype)}
                >
                  <Text style={styles.genotypeText}>{genotype}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.checkButton}
              onPress={checkCompatibility}
              disabled={!selectedGenotype || !partnerGenotype}
            >
              <Text style={styles.checkButtonText}>Check Compatibility</Text>
            </TouchableOpacity>

            {result ? (
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>Compatibility Result</Text>
                <Text style={styles.resultText}>{result}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Genotype Testing</Text>
          <Text style={styles.infoText}>
            Genotype testing helps identify the risk of passing genetic conditions like 
            sickle cell disease to your children. It's recommended for couples planning 
            to start a family.
          </Text>
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
  card: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  form: {
    gap: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray700,
    marginBottom: Spacing.sm,
  },
  genotypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  genotypeButton: {
    padding: Spacing.md,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedGenotype: {
    backgroundColor: Colors.primary,
  },
  genotypeText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray700,
  },
  checkButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  resultCard: {
    backgroundColor: Colors.gray50,
    padding: Spacing.lg,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  resultTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.sm,
  },
  resultText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    lineHeight: Typography.lineHeight.body * Typography.fontSize.md,
  },
  infoSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    lineHeight: Typography.lineHeight.body * Typography.fontSize.md,
  },
});
