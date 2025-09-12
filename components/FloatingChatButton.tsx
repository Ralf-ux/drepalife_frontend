import React, { useRef, useEffect, useState } from "react";
import { Animated, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { MessageCircle } from "lucide-react-native";
import { router } from "expo-router";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

const FloatingChatButton = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Animate button pop-in
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePress = async () => {
    if (loading) return; // Prevent multiple presses
    setLoading(true);
    console.log("Floating chat button pressed");
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token exists:', !!token);
      console.log('BASE_URL:', BASE_URL);
      console.log('Full URL:', `${BASE_URL}/consult`);

      console.log("Making API call to backend...");
      // Example first API "hello" message
      const response = await axios.post(
        `${BASE_URL}/consult`,
        {
          symptoms: "Hello doctor, I would like to start a consultation.",
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response received:", response.data);

      // Navigate to chat page
      console.log("Navigating to chat page...");
      router.push("/(patient)/chat");
      console.log("Navigation completed");
    } catch (err) {
      console.error("Error starting chat:", (err as Error).message);
      console.error("Full error:", err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);

          // Handle authentication errors
          if (err.response.status === 401 || err.response.status === 403) {
            Toast.show({
              type: 'error',
              text1: 'Session expired',
              text2: 'Please log in again',
            });

            // Clear invalid token and user data, then redirect to login
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            router.replace('/(auth)/login');
            return;
          }

          Toast.show({
            type: 'error',
            text1: err.response.data?.message || 'Failed to start consultation',
          });
        } else if (err.request) {
          console.error('No response received:', err.request);
          Toast.show({
            type: 'error',
            text1: 'Network error - please check your connection',
          });
        } else {
          console.error('Request setup error:', err.message);
          Toast.show({
            type: 'error',
            text1: 'Request failed - please try again',
          });
        }
      } else {
        console.error('Non-axios error:', err);
        Toast.show({
          type: 'error',
          text1: 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View
      style={[
        styles.fabContainer,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity style={styles.fabButton} onPress={handlePress} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <MessageCircle size={28} color="#fff" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 80,
    right: 20,
    zIndex: 100,
  },
  fabButton: {
    backgroundColor: "#f63b3b",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FloatingChatButton;
