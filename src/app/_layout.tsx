import { AuthProvider, useAuth } from "@/shared/context/AuthContext";
import AppHeader from "@/shared/ui/AppHeader";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function renderAppHeader() {
  return <AppHeader />;
}

const stackScreenOptions = {
  headerShadowVisible: false,
  header: renderAppHeader,
};

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
  const routeKey = segments.join("/");
  const { user, initializing, canAccessProfessorArea, isAdmin } = useAuth();

  useEffect(() => {
    if (initializing) {
      return;
    }

    const [firstSegment, secondSegment] = routeKey.split("/");
    const inProfessorArea = firstSegment === "professor";
    const inAdminArea = inProfessorArea && (
      !secondSegment || secondSegment === "alunos" || secondSegment === "professores"
    );
    const inLoginScreen = firstSegment === "login";

    if ((!user || !canAccessProfessorArea) && inProfessorArea) {
      router.replace("/login");
      return;
    }

    if (user && !isAdmin && inAdminArea) {
      router.replace("/professor/postagens");
      return;
    }

    if (user && canAccessProfessorArea && inLoginScreen) {
      router.replace(isAdmin ? "/professor" : "/professor/postagens");
    }
  }, [canAccessProfessorArea, initializing, isAdmin, routeKey, router, user]);

  if (initializing) {
    return null;
  }

  return (
    <Stack
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen name="postagemAll/index" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
