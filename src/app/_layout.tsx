import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="professor" />
      <Stack.Screen name="aluno" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
