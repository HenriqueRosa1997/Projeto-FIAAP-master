import { Stack } from "expo-router";
import AppHeader from "@/components/AppHeader";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="professor"
        options={{
          header: () => <AppHeader title="Professor" />,
        }}
      />
      <Stack.Screen
        name="postagemAll"
        options={{
          header: () => <AppHeader title="Postagens" />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          header: () => <AppHeader title="Login" />,
        }}
      />
    </Stack>
  );
}
