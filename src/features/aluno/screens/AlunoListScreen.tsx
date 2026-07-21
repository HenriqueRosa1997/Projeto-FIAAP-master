import { useMemo, useState } from "react";
import { useAlunos } from "@/features/aluno/store/alunoStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SearchField from "@/shared/ui/SearchField";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AlunoListScreen() {
  const router = useRouter();
  const alunos = useAlunos();
  const [busca, setBusca] = useState("");

  const alunosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return alunos;
    }

    return alunos.filter((aluno) =>
      [aluno.nome, aluno.email, aluno.turma, aluno.status]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    );
  }, [alunos, busca]);

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <SectionHeader
          title="Alunos"
          subtitle="Modulo especifico de alunos utilizando UI compartilhada"
        />
        <ActionButton
          label="Cadastrar Aluno"
          onPress={() => router.push("/professor/alunos/criar")}
        />
      </View>

      <SearchField
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por nome, email, turma ou status"
      />

      {alunosFiltrados.map((aluno) => (
        <EntityCard
          key={aluno.id}
          title={aluno.nome}
          subtitle={`${aluno.email} • ${aluno.turma}`}
          description={`Status atual do aluno: ${aluno.status}`}
          badge={aluno.status}
          onTitlePress={() =>
            router.push(`/professor/alunos/${aluno.id}` as const)
          }
          actions={
            <>
              <ActionButton
                label="Visualizar"
                variant="secondary"
                onPress={() =>
                  router.push(`/professor/alunos/${aluno.id}` as const)
                }
              />
              <ActionButton
                label="Editar"
                onPress={() =>
                  router.push(`/professor/alunos/${aluno.id}/editar` as const)
                }
              />
            </>
          }
          leading={
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{aluno.nome.slice(0, 2)}</Text>
            </View>
          }
        />
      ))}

      {alunosFiltrados.length === 0 ? (
        <Text style={styles.emptyState}>
          Nenhum aluno encontrado para a busca informada.
        </Text>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    gap: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#D9E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#1E63D5",
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  emptyState: {
    fontSize: 15,
    color: "#5E5E5E",
  },
});
