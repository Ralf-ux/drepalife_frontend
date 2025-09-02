import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { UserRole } from '@/types';

export default function RoleSelectionPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity 
        style={styles.roleButton}
        onPress={() => router.push({ pathname: '/(auth)/register', params: { role: 'patient' } })}
      >
        <Text style={styles.roleText}>Patient</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.roleButton}
        onPress={() => router.push({ pathname: '/(auth)/register', params: { role: 'health_expert' } })}
      >
        <Text style={styles.roleText}>Health Expert</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.roleButton}
        onPress={() => router.push({ pathname: '/(auth)/register', params: { role: 'admin' } })}
      >
        <Text style={styles.roleText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roleButton: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f63b3b',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  roleText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
