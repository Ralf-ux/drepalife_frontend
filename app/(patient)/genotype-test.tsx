import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { BASE_URL } from '@/constants/config';
import { router } from 'expo-router';
import axios from 'axios';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Dna,
  Download,
  ExternalLink,
  Play,
  FileText,
  Share2,
} from 'lucide-react-native';
import { Toast } from 'toastify-react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GenotypeTestScreen() {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const cardAnimations = useRef(Array.from({ length: 5 }, () => new Animated.Value(0))).current;

  // State variables
  const [patientGenotype, setPatientGenotype] = useState('');
  const [partnerGenotype, setPartnerGenotype] = useState('');
  const [result, setResult] = useState('');
  const [percentageAS, setPercentageAS] = useState(0);
  const [percentageSS, setPercentageSS] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkLoggedUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userInfo = await AsyncStorage.getItem('user');

        if (!token && isMounted) {
          router.replace('/(auth)/login');
        } else if (token && userInfo && isMounted) {
          setUser(JSON.parse(userInfo));
        }
      } catch (error) {
        console.log('Auth check failed:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkLoggedUser();
    startInitialAnimations();

    return () => {
      isMounted = false;
    };
  }, []);

  const startInitialAnimations = () => {
    // Start continuous pulse animation for DNA icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Start continuous rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    // Initial fade in
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
      }),
    ]).start();
  };

  const animateCards = () => {
    const animations = cardAnimations.map((anim, index) =>
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ])
    );

    Animated.parallel(animations).start();
  };

  const checkCompatibility = async () => {
    if (!patientGenotype || !partnerGenotype) {
      Toast.show({
        type: 'error',
        text1: 'Please select both genotypes',
      });
      return;
    }

    setIsChecking(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/api/genotype-matches`,
        { patientGenotype, partnerGenotype },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const newResult = response.data.data.riskMessage;
        const newPercentageAS = response.data.data.childPercentages.AS || 0;
        const newPercentageSS = response.data.data.childPercentages.SS || 0;
        
        // Update state immediately and consistently
        setResult(newResult);
        setPercentageAS(newPercentageAS);
        setPercentageSS(newPercentageSS);

        const riskKey = getRiskLevel(patientGenotype, partnerGenotype);
        const resultData = { ...compatibilityData[riskKey] };
        
        // Update description with actual result
        resultData.description = newResult;
        
        // Set dynamic percentage based on the combination
        if (riskKey === 'SS-SS') {
          resultData.percentage = newPercentageSS;
        } else {
          resultData.percentage = newPercentageAS;
        }
        
        setResultData(resultData);
        animateCards();

        Toast.show({
          type: 'success',
          text1: 'Compatibility check completed',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.message || 'Compatibility check failed. Please try again.',
        });
      }
    } catch (error) {
      console.log(error, 'error');
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsChecking(false);
    }
  };

  const genotypes = ['AA', 'AS', 'SS'];

  // Updated videos with working YouTube IDs
  const compatibilityData = {
    'AA-AA': {
      risk: 'low',
      title: 'Excellent Compatibility',
      description: '',
      percentage: 0,
      recommendations: [
        'No special precautions needed for sickle cell disease',
        'Continue with regular prenatal care and health checkups',
        'Maintain healthy lifestyle habits for optimal pregnancy outcomes',
        'Consider general genetic counseling for comprehensive family planning',
      ],
      nextSteps: [
        'Schedule regular health checkups with your healthcare provider',
        'Consider genetic counseling for complete peace of mind',
        'Focus on general pregnancy wellness and nutrition',
        'Maintain open communication with your partner about family planning',
      ],
      urgency: 'routine',
      youtubeVideos: [
        {
          title: 'Understanding Sickle Cell Disease Genetics',
          videoId: 'yqIkUMnlQSc',
          description: 'Comprehensive overview of sickle cell genetics and inheritance patterns',
        },
        {
          title: 'Healthy Family Planning Guide',
          videoId: '3bQv6k7KQ-4',
          description: 'Essential guide to planning a healthy family with genetic considerations',
        },
      ],
    },
    'AS-AS': {
      risk: 'moderate',
      title: 'Moderate Risk - Genetic Counseling Recommended',
      description: '',
      percentage: 0,
      recommendations: [
        'Genetic counseling is strongly recommended before conception',
        'Consider prenatal testing during pregnancy (CVS or amniocentesis)',
        'Discuss family planning options with healthcare provider',
        'Learn about pre-implantation genetic diagnosis (PGD) if using IVF',
      ],
      nextSteps: [
        'Book appointment with genetic counselor within 2-4 weeks',
        'Research prenatal diagnostic testing options',
        'Consider pre-implantation genetic diagnosis if using IVF',
        'Learn about managing pregnancy with sickle cell trait',
      ],
      urgency: 'moderate',
      youtubeVideos: [
        {
          title: 'Genetic Counseling for Sickle Cell Carriers',
          videoId: 'M8hH7POiSso',
          description: 'What to expect during genetic counseling for AS carriers',
        },
        {
          title: 'Prenatal Testing Options',
          videoId: 'KfzqB7Bp_rE',
          description: 'Understanding CVS, amniocentesis, and other prenatal tests',
        },
      ],
    },
    'SS-SS': {
      risk: 'high',
      title: 'High Risk - Immediate Specialist Consultation Required',
      description: '',
      percentage: 100,
      recommendations: [
        'URGENT: Consult with hematologist and genetic counselor immediately',
        'Comprehensive family planning consultation needed',
        'Consider all reproductive options including adoption and donor gametes',
        'Join sickle cell support groups for emotional and practical support',
      ],
      nextSteps: [
        'Schedule appointment with specialist within 1 week',
        'Bring complete family medical history to appointments',
        'Research reproductive alternatives (IVF with PGD, adoption)',
        'Connect with sickle cell disease support communities',
      ],
      urgency: 'high',
      youtubeVideos: [
        {
          title: 'Living with Sickle Cell Disease',
          videoId: 'sB4kPgV2Q4E',
          description: 'Comprehensive guide to managing sickle cell disease',
        },
        {
          title: 'Family Planning with Genetic Conditions',
          videoId: 'dHfZfNzgEhA',
          description: 'Reproductive options for couples with genetic conditions',
        },
      ],
    },
    'AA-AS': {
      risk: 'low',
      title: 'Low Risk - Good Compatibility',
      description: '',
      percentage: 0,
      recommendations: [
        'No special precautions needed for sickle cell disease',
        'Continue with regular prenatal care',
        'Maintain healthy lifestyle habits',
        'Consider routine genetic counseling for comprehensive planning',
      ],
      nextSteps: [
        'Schedule regular health checkups',
        'Consider genetic counseling for complete peace of mind',
        'Focus on general pregnancy wellness',
        'Monitor for any unusual symptoms during pregnancy',
      ],
      urgency: 'routine',
      youtubeVideos: [
        {
          title: 'Sickle Cell Trait vs Disease',
          videoId: 'yqIkUMnlQSc',
          description: 'Understanding the difference between trait and disease',
        },
        {
          title: 'Healthy Pregnancy Planning',
          videoId: '3bQv6k7KQ-4',
          description: 'Essential tips for planning a healthy pregnancy',
        },
      ],
    },
    'AA-SS': {
      risk: 'low',
      title: 'Low Risk - Good Compatibility',
      description: '',
      percentage: 0,
      recommendations: [
        'No special precautions needed for sickle cell disease',
        'Continue with regular prenatal care',
        'Maintain healthy lifestyle habits',
        'Consider routine genetic counseling',
      ],
      nextSteps: [
        'Schedule regular health checkups',
        'Consider genetic counseling for complete peace of mind',
        'Focus on general pregnancy wellness',
        'Learn about supporting a partner with sickle cell disease',
      ],
      urgency: 'routine',
      youtubeVideos: [
        {
          title: 'Supporting Partners with Sickle Cell',
          videoId: 'sB4kPgV2Q4E',
          description: 'How to support a partner living with sickle cell disease',
        },
        {
          title: 'Genetic Inheritance Patterns',
          videoId: 'M8hH7POiSso',
          description: 'Understanding how genetic traits are inherited',
        },
      ],
    },
  };

  const getRiskLevel = (genotype1, genotype2) => {
    const combination = `${genotype1}-${genotype2}`;
    const reverseCombination = `${genotype2}-${genotype1}`;

    if (compatibilityData[combination]) {
      return combination;
    } else if (compatibilityData[reverseCombination]) {
      return reverseCombination;
    } else {
      return 'AS-AS';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return '#10B981';
      case 'moderate':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return Colors.primary;
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low':
        return CheckCircle;
      case 'moderate':
        return AlertTriangle;
      case 'high':
        return AlertTriangle;
      default:
        return Dna;
    }
  };

  const openYouTubeVideo = async (videoId) => {
    const urls = [
      `vnd.youtube://${videoId}`,
      `https://www.youtube.com/watch?v=${videoId}`,
      `https://m.youtube.com/watch?v=${videoId}`
    ];

    for (const url of urls) {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
          return;
        }
      } catch (error) {
        console.log(`Failed to open ${url}:`, error);
      }
    }

    Toast.show({
      type: 'error',
      text1: 'Unable to open video',
      text2: 'Please check if YouTube is installed',
    });
  };

  const generateComprehensiveReport = async () => {
    if (!resultData || !user) {
      Toast.show({
        type: 'error',
        text1: 'No data available for report generation',
      });
      return;
    }

    setIsGeneratingReport(true);

    try {
      const currentDate = new Date().toLocaleDateString();
      const reportContent = `
GENOTYPE COMPATIBILITY TEST REPORT
Generated on: ${currentDate}
Patient: ${user.name || 'N/A'}

EXECUTIVE SUMMARY
================
Test Date: ${currentDate}
Patient Genotype: ${patientGenotype}
Partner Genotype: ${partnerGenotype}
Risk Level: ${resultData.risk.toUpperCase()}
Compatibility Status: ${resultData.title}

DETAILED ANALYSIS
=================
${resultData.description}

Risk of AS offspring: ${percentageAS}%
Risk of SS offspring: ${percentageSS}%
Overall risk assessment: ${resultData.percentage}%

MEDICAL RECOMMENDATIONS
=======================
Based on your genetic compatibility results, the following recommendations are provided:

${resultData.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

IMMEDIATE NEXT STEPS
===================
${resultData.nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

GENETIC COUNSELING INFORMATION
==============================
Genetic counseling is ${resultData.risk === 'high' ? 'URGENTLY' : resultData.risk === 'moderate' ? 'STRONGLY' : ''} recommended.

Key points to discuss with your genetic counselor:
- Family history of sickle cell disease
- Prenatal testing options
- Alternative reproductive options
- Emotional and psychological support

EDUCATIONAL RESOURCES
=====================
Recommended educational videos:
${resultData.youtubeVideos.map((video, index) => 
`${index + 1}. ${video.title}
   Description: ${video.description}
   Link: https://www.youtube.com/watch?v=${video.videoId}`
).join('\n\n')}

IMPORTANT DISCLAIMERS
====================
- This report is for educational purposes only
- Always consult with qualified healthcare professionals
- Genetic counseling is recommended for all couples
- This test does not replace professional medical advice

RISK CLASSIFICATION GUIDE
=========================
LOW RISK: Minimal chance of sickle cell disease in offspring
MODERATE RISK: Some possibility of carrier children, genetic counseling recommended
HIGH RISK: Significant chance of affected children, specialist consultation urgent

FOLLOW-UP RECOMMENDATIONS
=========================
${resultData.urgency === 'high' ? 
'URGENT: Schedule specialist consultation within 1 week' :
resultData.urgency === 'moderate' ?
'Schedule genetic counseling within 2-4 weeks' :
'Routine follow-up with healthcare provider as needed'}

For questions or concerns, please contact your healthcare provider.

Report generated by Drepalife Digital Health Platform
© ${new Date().getFullYear()} Drepalife. All rights reserved.
`;

      const fileName = `Genotype_Compatibility_Report_${patientGenotype}_${partnerGenotype}_${Date.now()}.txt`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
      await FileSystem.writeAsStringAsync(fileUri, reportContent);

      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Save Genotype Compatibility Report',
        });
      } else {
        await Sharing.shareAsync(fileUri);
      }

      Toast.show({
        type: 'success',
        text1: 'Report generated successfully',
        text2: 'Report has been saved to your device',
      });
    } catch (error) {
      console.error('Error generating report:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to generate report',
        text2: 'Please try again later',
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const resetForm = () => {
    setPatientGenotype('');
    setPartnerGenotype('');
    setResult('');
    setResultData(null);
    setPercentageAS(0);
    setPercentageSS(0);
    
    // Reset animations
    cardAnimations.forEach(anim => anim.setValue(0));
    
    Toast.show({
      type: 'info',
      text1: 'Form reset successfully',
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Genotype Compatibility Test</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.card, {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
        }]}>
          <Animated.View style={{
            transform: [
              { scale: pulseAnim },
              { rotate: rotateInterpolate }
            ]
          }}>
            <Dna size={48} color={Colors.primary} style={styles.icon} />
          </Animated.View>
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
                    patientGenotype === genotype && styles.selectedGenotype,
                  ]}
                  onPress={() => setPatientGenotype(genotype)}
                >
                  <Text style={[
                    styles.genotypeText,
                    patientGenotype === genotype && styles.selectedGenotypeText
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
                    partnerGenotype === genotype && styles.selectedGenotype,
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
                (!patientGenotype || !partnerGenotype || isChecking) && styles.disabledButton
              ]}
              onPress={checkCompatibility}
              disabled={!patientGenotype || !partnerGenotype || isChecking}
            >
              <View style={styles.loadingContainer}>
                <Text style={styles.checkButtonText}>
                  {isChecking ? 'Checking Compatibility...' : 'Check Compatibility'}
                </Text>
              </View>
            </TouchableOpacity>

            {resultData && (
              <Animated.View
                style={[
                  styles.resultContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                      { scale: scaleAnim },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.riskHeader,
                    { backgroundColor: getRiskColor(resultData.risk) },
                  ]}
                >
                  {React.createElement(getRiskIcon(resultData.risk), {
                    size: 24,
                    color: '#FFFFFF',
                    style: styles.riskIcon,
                  })}
                  <Text style={styles.riskTitle}>{resultData.title}</Text>
                </View>

                <View style={styles.resultCard}>
                  <Animated.View style={[
                    styles.riskDetails,
                    { transform: [{ scale: cardAnimations[0] }] }
                  ]}>
                    <Text style={styles.riskPercentage}>
                      {resultData.percentage}%
                    </Text>
                    <Text style={styles.riskLabel}>
                      Risk of AS or SS offspring
                    </Text>
                  </Animated.View>

                  <Text style={styles.resultDescription}>
                    {resultData.description}
                  </Text>

                  <Animated.View style={[
                    styles.section,
                    { transform: [{ scale: cardAnimations[1] }] }
                  ]}>
                    <Text style={styles.sectionTitle}>
                      Immediate Recommendations
                    </Text>
                    {resultData.recommendations.map((rec, index) => (
                      <View key={index} style={styles.listItem}>
                        <View style={styles.bullet} />
                        <Text style={styles.listText}>{rec}</Text>
                      </View>
                    ))}
                  </Animated.View>

                  <Animated.View style={[
                    styles.section,
                    { transform: [{ scale: cardAnimations[2] }] }
                  ]}>
                    <Text style={styles.sectionTitle}>Next Steps</Text>
                    {resultData.nextSteps.map((step, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text style={styles.stepNumber}>{index + 1}</Text>
                        <Text style={styles.listText}>{step}</Text>
                      </View>
                    ))}
                  </Animated.View>

                  <Animated.View style={[
                    styles.section,
                    { transform: [{ scale: cardAnimations[3] }] }
                  ]}>
                    <Text style={styles.sectionTitle}>
                      Educational Resources
                    </Text>
                    {resultData.youtubeVideos.map((video, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.videoCard}
                        onPress={() => openYouTubeVideo(video.videoId)}
                      >
                        <Play size={20} color={Colors.primary} />
                        <View style={styles.videoInfo}>
                          <Text style={styles.videoTitle}>{video.title}</Text>
                          <Text style={styles.videoDescription}>
                            {video.description}
                          </Text>
                        </View>
                        <ExternalLink size={16} color={Colors.gray500} />
                      </TouchableOpacity>
                    ))}
                  </Animated.View>

                  <Animated.View style={[
                    styles.actionButtons,
                    { transform: [{ scale: cardAnimations[4] }] }
                  ]}>
                    <TouchableOpacity
                      style={styles.downloadButton}
                      onPress={generateComprehensiveReport}
                      disabled={isGeneratingReport}
                    >
                      <FileText size={20} color={Colors.primary} />
                      <Text style={styles.downloadButtonText}>
                        {isGeneratingReport ? 'Generating...' : 'Download Report'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={resetForm}
                    >
                      <Text style={styles.resetButtonText}>New Test</Text>
                    </TouchableOpacity>
                  </Animated.View>

                  {resultData.urgency === 'high' && (
                    <View style={styles.urgencyBanner}>
                      <AlertTriangle size={20} color="#FFFFFF" />
                      <Text style={styles.urgencyText}>
                        Time-sensitive: Schedule specialist consultation within 1 week
                      </Text>
                    </View>
                  )}
                </View>
              </Animated.View>
            )}
          </View>
        </Animated.View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Genotype Testing</Text>
          <Text style={styles.infoText}>
            Genotype testing helps identify the risk of passing genetic conditions like sickle cell disease to your children. 
            This comprehensive analysis provides personalized recommendations and next steps based on your specific genetic combination.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    marginRight: Spacing.md,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.xl,
    borderRadius: 20,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  form: {
    gap: Spacing.lg,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: Spacing.sm,
  },
  genotypeGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  genotypeButton: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  selectedGenotype: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  genotypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedGenotypeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  checkButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    marginTop: Spacing.xl,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: Spacing.sm,
  },
  riskIcon: {
    marginRight: Spacing.xs,
  },
  riskTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  riskDetails: {
    alignItems: 'center',
    padding: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  riskPercentage: {
    fontSize: 48,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 8,
  },
  riskLabel: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  resultDescription: {
    fontSize: 16,
    color: '#475569',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: Spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  listText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
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
    backgroundColor: Colors.primary + '15',
    borderRadius: 10,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  downloadButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  resetButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  urgencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#EF4444',
    margin: Spacing.lg,
    borderRadius: 10,
    gap: Spacing.sm,
  },
  urgencyText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
});