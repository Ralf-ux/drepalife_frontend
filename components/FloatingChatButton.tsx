import React, { useRef, useEffect, useState } from "react";
import { Animated, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { MessageCircle } from "lucide-react-native";
import { router } from "expo-router";
import axios from "axios";

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
      console.log("Making API call to backend...");
      // Example first API "hello" message
      const response = await axios.post("http://localhost:3000/consult", {
        symptoms: "Hello doctor, I would like to start a consultation.",
      });
      console.log("API response received:", response.data);

      // Navigate to chat page
      console.log("Navigating to chat page...");
      router.push("/(patient)/chat");
      console.log("Navigation completed");
    } catch (err) {
      console.error("Error starting chat:", (err as Error).message);
      console.error("Full error:", err);
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
