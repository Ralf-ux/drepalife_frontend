import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';
import { ArrowLeft, Send, User } from 'lucide-react-native';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'expert', timestamp: '10:00 AM' },
    { id: '2', text: 'I have some questions about my recent test results.', sender: 'patient', timestamp: '10:01 AM' },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { 
        id: Date.now().toString(), 
        text: message, 
        sender: 'patient', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.expertInfo}>
          <User size={32} color={Colors.primary} />
          <View>
            <Text style={styles.expertName}>Dr. Sarah Johnson</Text>
            <Text style={styles.expertStatus}>Online</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'patient' ? styles.patientMessage : styles.expertMessage
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.timestamp}>{msg.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  expertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expertName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
    marginLeft: Spacing.md,
  },
  expertStatus: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.green,
    marginLeft: Spacing.md,
  },
  messagesContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  patientMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  expertMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.gray100,
  },
  messageText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    color: Colors.gray800,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    color: Colors.gray500,
    marginTop: Spacing.xs,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.gray100,
    padding: Spacing.md,
    borderRadius: 24,
    marginRight: Spacing.md,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 24,
  },
});
