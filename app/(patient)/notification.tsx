import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { BASE_URL } from '@/constants/config';
import { HealthTip } from '@/types';

export default function PatientNotification() {
  const [healthTips, setHealthTips] = useState<HealthTip[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const CACHE_KEY = 'health_tips_cache';
  const CACHE_TIMESTAMP_KEY = 'health_tips_timestamp';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const fetchHealthTips = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        // Try to load from cache first
        const cachedTips = await AsyncStorage.getItem(CACHE_KEY);
        const cachedTimestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedTips && cachedTimestamp) {
          const cacheTime = parseInt(cachedTimestamp);
          const now = Date.now();

          if (now - cacheTime < CACHE_DURATION) {
            setHealthTips(JSON.parse(cachedTips));
            return;
          }
        }
      }

      // Fetch from API
      const response = await axios.get(`${BASE_URL}/health-tips`);
      const tips = response.data;

      // Cache the data
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(tips));
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

      setHealthTips(tips);
    } catch (error) {
      console.error('Failed to fetch health tips:', error);
      // Try to load from cache as fallback
      try {
        const cachedTips = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedTips) {
          setHealthTips(JSON.parse(cachedTips));
        }
      } catch (cacheError) {
        console.error('Failed to load cached tips:', cacheError);
      }
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHealthTips(true).finally(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Tips</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {healthTips.length === 0 ? (
          <Text style={styles.noTips}>No health tips available.</Text>
        ) : (
          healthTips.map((tip) => (
            <View key={tip._id} style={styles.tipCard}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipContent}>{tip.content}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 14,
    color: Colors.gray600,
  },
  noTips: {
    fontSize: 16,
    color: Colors.gray600,
    textAlign: 'center',
    marginTop: 50,
  },
});
