import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="calendar" />
      <Stack.Screen 
        name="form" 
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="confirm" />
      <Stack.Screen 
        name="result" 
        options={{
          presentation: 'modal',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
