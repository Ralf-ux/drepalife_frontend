import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { BASE_URL } from '@/constants/config';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import axios from 'axios';
import ToastManager, { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const success = await axios.post(`${BASE_URL}/api/users/login`, {
        useremail: email,
        password,
      });
      if (success.data.success) {
        if (success.data.user.role === 'health_expert') {
          router.push('/(expert)/dashboard');
        } else if (success.data.user.role === 'patient') {
          router.push('/(patient)/dashboard');
        } else if (success.data.user.role === 'admin') {
          router.push('/(admin)/dashboard');
        }
        try {
          await AsyncStorage.setItem('token', success.data.token);
          await AsyncStorage.setItem('user', JSON.stringify(success.data.user));
          console.log(
            'Token  and user info stored successfully',
            await AsyncStorage.getItem('user')
          );
        } catch (e) {
          console.log('Failed to save token', e);
        }
        Toast.success(success.data.message || 'Login successful!');
      } else {
        Toast.error(success.data.message || 'Login failed. Please try again.');
      }
    } catch (error: any) {
      console.log(error, 'login error');
      Toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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

      {/* Password input with eye icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      <ToastManager />
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: Spacing.md,
  },
  eyeIcon: {
    paddingHorizontal: Spacing.sm,
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
