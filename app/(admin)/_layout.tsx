import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="users" />
      <Stack.Screen name="experts" />
      <Stack.Screen name="content" />
      <Stack.Screen name="analytics" />
    </Stack>
  );
}