import { Stack } from 'expo-router';

export default function MyRecordsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="form"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="detail" options={{ headerShown: false }} />
    </Stack>
  );
}
