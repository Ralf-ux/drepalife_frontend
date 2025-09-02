import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Send, Phone, Video } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'expert';
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! How can I help you today?',
    sender: 'expert',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'I have been experiencing some chest pain and wanted to get it checked.',
    sender: 'user',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    text: 'I understand your concern. Can you describe when the pain occurs and its intensity?',
    sender: 'expert',
    timestamp: '10:33 AM',
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>Dr. Sarah Johnson</Text>
          <Text style={styles.expertStatus}>🟢 Online</Text>
        </View>
        <View style={styles.callButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Phone size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Video size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.expertMessage,
            ]}
          >
            <Text style={[
              styles.messageText,
              message.sender === 'user' ? styles.userMessageText : styles.expertMessageText,
            ]}>
              {message.text}
            </Text>
            <Text style={[
              styles.timestamp,
              message.sender === 'user' ? styles.userTimestamp : styles.expertTimestamp,
            ]}>
              {message.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
  },
  expertStatus: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.gray600,
  },
  callButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  messageBubble: {
    marginBottom: Spacing.md,
    maxWidth: '80%',
    padding: Spacing.sm,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  expertMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
    lineHeight: Typography.lineHeight.body * Typography.fontSize.md,
  },
  userMessageText: {
    color: Colors.white,
  },
  expertMessageText: {
    color: Colors.gray800,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Regular',
    marginTop: Spacing.xs,
  },
  userTimestamp: {
    color: Colors.white,
    opacity: 0.8,
    textAlign: 'right',
  },
  expertTimestamp: {
    color: Colors.gray500,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    maxHeight: 100,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});