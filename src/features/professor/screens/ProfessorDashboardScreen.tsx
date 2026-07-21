import { useAlunos } from "@/features/aluno/store/alunoStore";
import { usePostagens } from "@/features/postagem/store/postagemStore";
import { useProfessores } from "@/features/professor/store/professorStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProfessorDashboardScreen() {
  const router = useRouter();
  const alunos = useAlunos();
  const postagens = usePostagens();
  const professores = useProfessores();

  const postagemEmDestaque = postagens[0];
  const professorEmDestaque = professores[0];
  const alunoEmDestaque = alunos[0];

  return (
    <ScreenContainer>
      <SectionHeader
        title="Painel do Professor"
        subtitle="Acesse rapidamente as principais areas de gerenciamento"
      />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SectionHeader
            title="Gestao de Postagens"
            subtitle="Gerencie publicacoes e comunicados do mural"
          />
          <View style={styles.actionsRow}>
            <ActionButton
              label="Nova Postagem"
              onPress={() => router.push("/professor/postagens/criar")}
            />
            <ActionButton
              label="Ver Detalhes"
              variant="secondary"
              onPress={() => router.push("/professor/postagens/1")}
            />
            <ActionButton
              label="Listar"
              variant="secondary"
              onPress={() => router.push("/professor/postagens")}
            />
          </View>
        </View>

        {postagemEmDestaque ? (
          <EntityCard
            title={postagemEmDestaque.titulo}
            subtitle={`Autor: ${postagemEmDestaque.autor}`}
            description={postagemEmDestaque.resumo}
            badge={postagemEmDestaque.status}
            leading={<View style={styles.thumbnail} />}
          />
        ) : null}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SectionHeader
            title="Gestao de Professores"
            subtitle="Cadastre e acompanhe os professores da plataforma"
          />
          <View style={styles.actionsRow}>
            <ActionButton
              label="Novo Professor"
              onPress={() => router.push("/professor/professores/criar")}
            />
            <ActionButton
              label="Editar Perfil"
              variant="secondary"
              onPress={() => router.push("/professor/professores/1/editar")}
            />
            <ActionButton
              label="Listar"
              variant="secondary"
              onPress={() => router.push("/professor/professores")}
            />
          </View>
        </View>

        {professorEmDestaque ? (
          <EntityCard
            title={professorEmDestaque.nome}
            subtitle={professorEmDestaque.email}
            description={`Especialidade: ${professorEmDestaque.especialidade}`}
            badge={professorEmDestaque.status}
          />
        ) : null}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SectionHeader
            title="Gestao de Alunos"
            subtitle="Cadastre e acompanhe os alunos vinculados ao sistema"
          />
          <View style={styles.actionsRow}>
            <ActionButton
              label="Novo Aluno"
              onPress={() => router.push("/professor/alunos/criar")}
            />
            <ActionButton
              label="Visualizar"
              variant="secondary"
              onPress={() => router.push("/professor/alunos/1")}
            />
            <ActionButton
              label="Listar"
              variant="secondary"
              onPress={() => router.push("/professor/alunos")}
            />
          </View>
        </View>

        {alunoEmDestaque ? (
          <EntityCard
            title={alunoEmDestaque.nome}
            subtitle={`${alunoEmDestaque.email} • ${alunoEmDestaque.turma}`}
            description={`Status atual do aluno: ${alunoEmDestaque.status}`}
            badge={alunoEmDestaque.status}
          />
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
  },
  sectionHeader: {
    gap: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  thumbnail: {
    width: 120,
    height: 120,
    backgroundColor: "#D9D9D9",
  },
});
