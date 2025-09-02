import { Stack } from 'expo-router';

export default function ExpertLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="patients" />
      <Stack.Screen name="consultations" />
      <Stack.Screen name="content" />
      <Stack.Screen name="analytics" />
    </Stack>
  );
}