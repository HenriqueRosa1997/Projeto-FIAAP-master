import { AuthProvider, useAuth } from "@/shared/context/AuthContext";
import AppHeader from "@/shared/ui/AppHeader";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function getHeaderTitle(routeName: string) {
  const titles: Record<string, string> = {
    login: "Login",
    "postagemAll/index": "Postagens",
    "postagemAll/[id]": "Visualizar Postagem",
    "professor/index": "Professor",
    "professor/postagens/index": "Postagens",
    "professor/postagens/criar": "Criar Postagem",
    "professor/postagens/[id]/index": "Detalhar Postagem",
    "professor/postagens/[id]/editar": "Editar Postagem",
    "professor/alunos/index": "Alunos",
    "professor/alunos/criar": "Criar Aluno",
    "professor/alunos/[id]/index": "Detalhar Aluno",
    "professor/alunos/[id]/editar": "Editar Aluno",
    "professor/professores/index": "Professores",
    "professor/professores/criar": "Criar Professor",
    "professor/professores/[id]/index": "Detalhar Professor",
    "professor/professores/[id]/editar": "Editar Professor",
  };

  return titles[routeName] ?? "Learn.io";
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}

function RootStack() {
  const router = useRouter();
  const segments = useSegments();
  const { user, initializing } = useAuth();

  useEffect(() => {
    if (initializing) {
      return;
    }

    const firstSegment = segments[0];
    const inProfessorArea = firstSegment === "professor";
    const inLoginScreen = firstSegment === "login";

    if (!user && inProfessorArea) {
      router.replace("/login");
      return;
    }

    if (user && inLoginScreen) {
      router.replace("/professor");
    }
  }, [initializing, router, segments, user]);

  if (initializing) {
    return null;
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        header: () => <AppHeader title={getHeaderTitle(route.name)} />,
      })}
    >
      <Stack.Screen name="postagemAll/index" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
