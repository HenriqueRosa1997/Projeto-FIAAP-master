import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProfessorDashboardScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <SectionHeader
        title="Administração"
        subtitle="Escolha uma área para gerenciar"
      />

      <View style={styles.section}>
        <EntityCard
          title="Postagens"
          subtitle="Conteúdo publicado"
          description="Crie, edite e exclua as postagens do mural."
          actions={
            <ActionButton
              label="Abrir postagens"
              onPress={() => router.push("/professor/postagens")}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <EntityCard
          title="Professores"
          subtitle="Equipe docente"
          description="Cadastre, edite e exclua professores da plataforma."
          actions={
            <ActionButton
              label="Abrir professores"
              onPress={() => router.push("/professor/professores")}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <EntityCard
          title="Alunos"
          subtitle="Cadastros acadêmicos"
          description="Cadastre, edite e exclua alunos do sistema."
          actions={
            <ActionButton
              label="Abrir alunos"
              onPress={() => router.push("/professor/alunos")}
            />
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
  },
});
