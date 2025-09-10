import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { router } from 'expo-router';
import { AppWindow, ArrowLeft, Send, User } from 'lucide-react-native';
import axios from 'axios';
import { BASE_URL } from '@/constants/config';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'expert',
      timestamp: '10:00 AM',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'patient',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        console.log('Sending message to backend:', message);

       
        const response = await axios.post(`${BASE_URL}/consult`, {
          symptoms: message,
        });

        console.log('Received response from backend:', response.data);

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: response.data.advice,
          sender: 'expert',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);

        const errorMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'expert',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
  
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.expertInfo}>
          <Image
            source={require('@/assets/images/drepa.png')}
            style={styles.logo}
          />
          <Text style={styles.botName}>Drepa Bot</Text>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'patient'
                ? styles.patientMessage
                : styles.expertMessage,
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
  logo: {
    width: 32,
    height: 32,
    marginRight: Spacing.sm,
  },
  botName: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-SemiBold',
    color: Colors.gray800,
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
