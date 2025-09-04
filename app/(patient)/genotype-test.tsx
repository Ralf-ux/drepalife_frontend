import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Animated,
  Linking,
  Share,
  Alert
} from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Dna, 
  Download, 
  Play, 
  AlertTriangle, 
  CheckCircle, 
  Users,
  FileText,
  ExternalLink
} from 'lucide-react-native';

export default function GenotypeTestScreen() {
  const [selectedGenotype, setSelectedGenotype] = useState<string>('');
  const [partnerGenotype, setPartnerGenotype] = useState<string>('');
  const [result, setResult] = useState<null | {
    risk: string;
    title: string;
    description: string;
    percentage: string;
    recommendations: string[];
    nextSteps: string[];
    urgency: string;
    youtubeVideos: { title: string; videoId: string; description: string }[];
  }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const genotypes: string[] = ['AA', 'AS', 'AC', 'SS', 'SC', 'CC'];

  const compatibilityData: Record<string, {
    risk: string;
    title: string;
    description: string;
    percentage: string;
    recommendations: string[];
    nextSteps: string[];
    urgency: string;
    youtubeVideos: { title: string; videoId: string; description: string }[];
  }> = {
    'AA-AA': {
      risk: 'low',
      title: 'Excellent Compatibility',
      description: 'Very low risk of sickle cell disease in offspring',
      percentage: '0%',
      recommendations: [
        'No special precautions needed',
        'Continue with regular prenatal care',
        'Maintain healthy lifestyle habits'
      ],
      nextSteps: [
        'Schedule regular health checkups',
        'Consider genetic counseling for complete peace of mind',
        'Focus on general pregnancy wellness'
      ],
      urgency: 'routine',
      youtubeVideos: [
        {
          title: 'What is Sickle Cell Disease?',
          videoId: '8dHb7Pltu9k',
          description: 'An overview of sickle cell disease and its genetics'
        },
        {
          title: 'Healthy Pregnancy with Normal Genotypes',
          videoId: 'WqK6R3nxt0A',
          description: 'Planning a healthy pregnancy with normal genotypes'
        }
      ]
    },
    'AS-AS': {
      risk: 'moderate',
      title: 'Moderate Risk - Genetic Counseling Recommended',
      description: '25% chance of SS offspring with each pregnancy',
      percentage: '25%',
      recommendations: [
        'Genetic counseling is strongly recommended',
        'Consider prenatal testing during pregnancy',
        'Discuss family planning options with healthcare provider'
      ],
      nextSteps: [
        'Book appointment with genetic counselor within 2-4 weeks',
        'Consider pre-implantation genetic diagnosis if using IVF',
        'Learn about prenatal diagnostic tests (CVS, amniocentesis)'
      ],
      urgency: 'moderate',
      youtubeVideos: [
        {
          title: 'Genetic Counseling for Sickle Cell Trait',
          videoId: 'b1WklpS4A90',
          description: 'What to know about genetic counseling for AS carriers'
        },
        {
          title: 'Prenatal Testing for Sickle Cell Disease',
          videoId: 'hY2wm7Z8eP4',
          description: 'Understanding CVS and amniocentesis for sickle cell'
        }
      ]
    },
    'SS': {
      risk: 'high',
      title: 'High Risk - Immediate Specialist Consultation Required',
      description: 'Significant risk of sickle cell disease in offspring',
      percentage: '50-100%',
      recommendations: [
        'URGENT: Consult with hematologist and genetic counselor',
        'Comprehensive family planning consultation needed',
        'Consider all reproductive options including adoption'
      ],
      nextSteps: [
        'Schedule appointment with specialist within 1 week',
        'Bring complete family medical history',
        'Consider joining sickle cell support groups'
      ],
      urgency: 'high',
      youtubeVideos: [
        {
          title: 'Managing Sickle Cell Disease',
          videoId: 'y8z4Lq2x3D4',
          description: 'A guide to living with sickle cell disease'
        },
        {
          title: 'Family Planning with Sickle Cell Disease',
          videoId: 'm7x4R5eL2mU',
          description: 'Family planning considerations for high-risk couples'
        }
      ]
    }
  };

  const getRiskLevel = (genotype1: string, genotype2: string): string => {
    const combination = `${genotype1}-${genotype2}`;
    const reverseCombination = `${genotype2}-${genotype1}`;
    
    if (compatibilityData[combination]) {
      return combination;
    } else if (compatibilityData[reverseCombination]) {
      return reverseCombination;
    } else if (genotype1 === 'SS' || genotype2 === 'SS') {
      return 'SS';
    } else {
      return 'AS-AS'; // Default to moderate risk for other combinations
    }
  };

  const checkCompatibility = async (): Promise<void> => {
    setIsLoading(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const riskKey = getRiskLevel(selectedGenotype, partnerGenotype);
    const resultData = compatibilityData[riskKey];
    
    setResult(resultData);
    setIsLoading(false);
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'low': return Colors.success || '#10B981';
      case 'moderate': return Colors.warning || '#F59E0B';
      case 'high': return Colors.error || '#EF4444';
      default: return Colors.primary;
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return CheckCircle;
      case 'moderate': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return Dna;
    }
  };

  const openYouTubeVideo = (videoId: string): void => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(youtubeUrl).catch(() => {
      Alert.alert('Error', 'Unable to open YouTube video');
    });
  };

  const downloadReport = async (): Promise<void> => {
    if (!result) return;
    
    const reportContent = `
GENOTYPE COMPATIBILITY REPORT
============================

Your Genotype: ${selectedGenotype}
Partner's Genotype: ${partnerGenotype}

Risk Level: ${result.risk.toUpperCase()}
Risk Percentage: ${result.percentage}

RECOMMENDATIONS:
${result.recommendations.map(rec => `• ${rec}`).join('\n')}

NEXT STEPS:
${result.nextSteps.map(step => `• ${step}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}

This report is for informational purposes only. Please consult with healthcare professionals for medical advice.
    `;

    try {
      await Share.share({
        message: reportContent,
        title: 'Genotype Compatibility Report',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share report');
    }
  };

  const resetForm = (): void => {
    setSelectedGenotype('');
    setPartnerGenotype('');
    setResult(null);
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.8);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Genotype Compatibility Test</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
                  <Text style={[
                    styles.genotypeText,
                    selectedGenotype === genotype && styles.selectedGenotypeText
                  ]}>
                    {genotype}
                  </Text>
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
                  <Text style={[
                    styles.genotypeText,
                    partnerGenotype === genotype && styles.selectedGenotypeText
                  ]}>
                    {genotype}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.checkButton,
                (!selectedGenotype || !partnerGenotype || isLoading) && styles.disabledButton
              ]}
              onPress={checkCompatibility}
              disabled={!selectedGenotype || !partnerGenotype || isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={Colors.white} />
                  <Text style={styles.checkButtonText}>Processing...</Text>
                </View>
              ) : (
                <Text style={styles.checkButtonText}>Check Compatibility</Text>
              )}
            </TouchableOpacity>

            {result && (
              <Animated.View 
                style={[
                  styles.resultContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                      { scale: scaleAnim }
                    ]
                  }
                ]}
              >
                {/* Risk Level Header */}
                <View style={[styles.riskHeader, { backgroundColor: getRiskColor(result.risk) }]}>
                  {React.createElement(getRiskIcon(result.risk), {
                    size: 24,
                    color: Colors.white,
                    style: styles.riskIcon
                  })}
                  <Text style={styles.riskTitle}>{result.title}</Text>
                </View>

                {/* Risk Details */}
                <View style={styles.resultCard}>
                  <View style={styles.riskDetails}>
                    <Text style={styles.riskPercentage}>{result.percentage}</Text>
                    <Text style={styles.riskLabel}>Risk of SS offspring</Text>
                  </View>
                  
                  <Text style={styles.resultDescription}>{result.description}</Text>

                  {/* Recommendations Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Immediate Recommendations</Text>
                    {result.recommendations.map((rec, index) => (
                      <View key={index} style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.listText}>{rec}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Next Steps Section */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Next Steps</Text>
                    {result.nextSteps.map((step, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text style={styles.stepNumber}>{index + 1}</Text>
                        <Text style={styles.listText}>{step}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Educational Videos */}
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Educational Resources</Text>
                    {result.youtubeVideos.map((video, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.videoCard}
                        onPress={() => openYouTubeVideo(video.videoId)}
                      >
                        <Play size={20} color={Colors.primary} />
                        <View style={styles.videoInfo}>
                          <Text style={styles.videoTitle}>{video.title}</Text>
                          <Text style={styles.videoDescription}>{video.description}</Text>
                        </View>
                        <ExternalLink size={16} color={Colors.gray500} />
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.downloadButton} onPress={downloadReport}>
                      <Download size={20} color={Colors.primary} />
                      <Text style={styles.downloadButtonText}>Download Report</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
                      <Text style={styles.resetButtonText}>New Test</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Urgency Banner */}
                  {result.urgency === 'high' && (
                    <View style={styles.urgencyBanner}>
                      <AlertTriangle size={20} color={Colors.white} />
                      <Text style={styles.urgencyText}>
                        Time-sensitive: Schedule specialist consultation within 1 week
                      </Text>
                    </View>
                  )}
                </View>
              </Animated.View>
            )}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Genotype Testing</Text>
          <Text style={styles.infoText}>
            Genotype testing helps identify the risk of passing genetic conditions like 
            sickle cell disease to your children. It's recommended for couples planning 
            to start a family. This tool provides educational information and should not 
            replace professional medical consultation.
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGenotype: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genotypeText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray700,
  },
  selectedGenotypeText: {
    color: Colors.white,
  },
  checkButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray300,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  resultContainer: {
    marginTop: Spacing.lg,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    gap: Spacing.sm,
  },
  riskIcon: {
    marginRight: Spacing.xs,
  },
  riskTitle: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderTopWidth: 0,
  },
  riskDetails: {
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  riskPercentage: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
  },
  riskLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    textAlign: 'center',
  },
  section: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Bold',
    color: Colors.gray800,
    marginBottom: Spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  listText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray700,
    flex: 1,
    lineHeight: Typography.lineHeight.body * Typography.fontSize.md,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.gray50,
    borderRadius: 8,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginBottom: 2,
  },
  videoDescription: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
    gap: Spacing.xs,
  },
  downloadButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  resetButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
  },
  resetButtonText: {
    color: Colors.gray700,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  urgencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#EF4444',
    margin: Spacing.lg,
    borderRadius: 8,
    gap: Spacing.sm,
  },
  urgencyText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  infoSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 12,
    marginBottom: Spacing.lg,
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