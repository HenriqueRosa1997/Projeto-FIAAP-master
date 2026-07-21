import AppHeader from "@/shared/ui/AppHeader";
import { Stack } from "expo-router";

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
