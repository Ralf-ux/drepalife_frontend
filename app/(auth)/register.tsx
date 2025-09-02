import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';
import { UserRole } from '@/types';
import axios from 'axios';

export default function RegisterScreen() {
  const { register } = useAuth();
  const params = useLocalSearchParams();
  const selectedRole = (params.role as UserRole) || 'patient';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log(formData, 'heloooo', selectedRole);
    const success = await axios.post(
      'http://192.168.5.1:3000/api/users/register',
      {
        name: formData.firstName,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        emergencycontact: '117',

        gender: 'male',
      }
    );
    console.log('response', success);
    console.log(success.data);

    if (!success) {
      setError('Registration failed. Please try again.');
    } else {
      // Navigation will be handled by AuthContext based on user role
      setError(
        success.data.message || 'Registration successful. Please log in.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
