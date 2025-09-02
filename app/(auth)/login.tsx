import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const success = await login(email, password, 'patient');
    if (!success) {
      setError('Invalid email or password');
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Drepalife</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.gray50,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  error: {
    color: 'red',
    marginBottom: Spacing.sm,
  },
  input: {
    width: '100%',
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
  },
  link: {
    marginTop: Spacing.md,
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
  },
});
