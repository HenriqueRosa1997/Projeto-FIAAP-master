import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="professor/index"
        options={{
          title: "Professor",
        }}
      />

      <Stack.Screen
        name="aluno/index"
        options={{
          title: "Aluno",
        }}
      />

      <Stack.Screen
        name="Login/Login"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
}
