import { Stack } from 'expo-router';

export default function PatientLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="booking" />
      <Stack.Screen name="doctors" />
      <Stack.Screen name="queue" />
      <Stack.Screen name="history" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="genotype" />
    </Stack>
  );
}