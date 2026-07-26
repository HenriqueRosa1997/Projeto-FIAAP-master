import { useMemo, useState } from "react";
import { removeAluno, useAlunos, useAlunosStatus } from "@/features/aluno/store/alunoStore";
import ActionButton from "@/shared/ui/ActionButton";
import ConfirmActionModal from "@/shared/ui/ConfirmActionModal";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SearchField from "@/shared/ui/SearchField";
import SectionHeader from "@/shared/ui/SectionHeader";
import StatusBanner from "@/shared/ui/StatusBanner";
import Pagination from "@/shared/ui/Pagination";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function AlunoListScreen() {
  const router = useRouter();
  const alunos = useAlunos();
  const { loading, error } = useAlunosStatus();
  const [busca, setBusca] = useState("");
  const [page, setPage] = useState(0);
  const [alunoParaExcluir, setAlunoParaExcluir] = useState<{ id: string; nome: string } | null>(null);
  const [erroExclusao, setErroExclusao] = useState("");
  const pageSize = 10;

  const alunosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return alunos;
    }

    return alunos.filter((aluno) =>
      [aluno.nome, aluno.email, aluno.turma]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    );
  }, [alunos, busca]);
  const visibleAlunos = alunosFiltrados.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <ScreenContainer>
      <ConfirmActionModal
        visible={Boolean(alunoParaExcluir)}
        title="Excluir aluno"
        message={`Deseja realmente excluir o aluno “${alunoParaExcluir?.nome ?? ""}”?`}
        confirmLabel="Excluir"
        onCancel={() => setAlunoParaExcluir(null)}
        onConfirm={async () => {
          if (!alunoParaExcluir) return;

          try {
            await removeAluno(alunoParaExcluir.id);
            setAlunoParaExcluir(null);
          } catch {
            setErroExclusao("Não foi possível excluir o aluno. Tente novamente.");
            setAlunoParaExcluir(null);
          }
        }}
      />
      <View style={styles.headerRow}>
        <SectionHeader
          title="Alunos"
          subtitle="Gerencie os cadastros e acompanhe sua turma."
        />
        <ActionButton
          label="Cadastrar Aluno"
          onPress={() => router.push("/professor/alunos/criar")}
        />
      </View>
      {loading ? <ActivityIndicator accessibilityLabel="Carregando alunos" color="#1E63D5" /> : null}
      {error || erroExclusao ? <StatusBanner message={error ?? erroExclusao} variant="error" /> : null}

      <SearchField
        value={busca}
        onChangeText={(text) => { setBusca(text); setPage(0); }}
        placeholder="Buscar por nome, email ou turma"
      />

      {visibleAlunos.map((aluno) => (
        <EntityCard
          key={aluno.id}
          title={aluno.nome}
          subtitle={`${aluno.email} • ${aluno.turma}`}
          description={`Turma: ${aluno.turma}`}
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
              <ActionButton
                label="Excluir"
                variant="danger"
                onPress={() => {
                  setErroExclusao("");
                  setAlunoParaExcluir({ id: aluno.id, nome: aluno.nome });
                }}
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
      <Pagination page={page} totalItems={alunosFiltrados.length} pageSize={pageSize} onPrevious={() => setPage((current) => Math.max(0, current - 1))} onNext={() => setPage((current) => Math.min(Math.ceil(alunosFiltrados.length / pageSize) - 1, current + 1))} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    gap: 14,
    paddingBottom: 4,
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
    color: "#526075",
  },
});
