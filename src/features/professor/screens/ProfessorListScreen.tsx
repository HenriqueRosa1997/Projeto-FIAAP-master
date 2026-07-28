import { useMemo, useState } from "react";
import { removeProfessor, useProfessores, useProfessoresStatus } from "@/features/professor/store/professorStore";
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

export default function ProfessorListScreen() {
  const router = useRouter();
  const professores = useProfessores();
  const { loading, error } = useProfessoresStatus();
  const [busca, setBusca] = useState("");
  const [page, setPage] = useState(0);
  const [professorParaExcluir, setProfessorParaExcluir] = useState<{ id: string; nome: string } | null>(null);
  const [erroExclusao, setErroExclusao] = useState("");
  const pageSize = 10;

  const professoresFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return professores;
    }

    return professores.filter((professor) =>
      [professor.nome, professor.email, professor.especialidade]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    );
  }, [busca, professores]);
  const visibleProfessores = professoresFiltrados.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <ScreenContainer>
      <ConfirmActionModal
        visible={Boolean(professorParaExcluir)}
        title="Excluir professor"
        message={`Deseja realmente excluir o professor “${professorParaExcluir?.nome ?? ""}”?`}
        confirmLabel="Excluir"
        onCancel={() => setProfessorParaExcluir(null)}
        onConfirm={async () => {
          if (!professorParaExcluir) return;

          try {
            await removeProfessor(professorParaExcluir.id);
            setProfessorParaExcluir(null);
          } catch {
            setErroExclusao("Não foi possível excluir o professor. Tente novamente.");
            setProfessorParaExcluir(null);
          }
        }}
      />
      <View style={styles.headerRow}>
        <SectionHeader title="Professores" />
        <ActionButton
          label="Criar conta de professor"
          onPress={() => router.push("/professor/professores/criar")}
        />
      </View>
      {loading ? <ActivityIndicator accessibilityLabel="Carregando professores" color="#1E63D5" /> : null}
      {error || erroExclusao ? <StatusBanner message={error ?? erroExclusao} variant="error" /> : null}

      <SearchField
        value={busca}
        onChangeText={(text) => { setBusca(text); setPage(0); }}
        placeholder="Buscar por nome, email ou especialidade"
      />

      {visibleProfessores.map((professor) => (
        <EntityCard
          key={professor.id}
          title={professor.nome}
          subtitle={professor.email}
          description={`Especialidade: ${professor.especialidade}`}
          onTitlePress={() =>
            router.push(`/professor/professores/${professor.id}` as const)
          }
          actions={
            <>
              <ActionButton
                label="Visualizar"
                variant="secondary"
                onPress={() =>
                  router.push(`/professor/professores/${professor.id}` as const)
                }
              />
              <ActionButton
                label="Editar"
                onPress={() =>
                  router.push(
                    `/professor/professores/${professor.id}/editar` as const,
                  )
                }
              />
              <ActionButton
                label="Excluir"
                variant="danger"
                onPress={() => {
                  setErroExclusao("");
                  setProfessorParaExcluir({ id: professor.id, nome: professor.nome });
                }}
              />
            </>
          }
          leading={
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {professor.nome.slice(0, 2)}
              </Text>
            </View>
          }
        />
      ))}

      {professoresFiltrados.length === 0 ? (
        <Text style={styles.emptyState}>
          Nenhum professor encontrado para a busca informada.
        </Text>
      ) : null}
      <Pagination page={page} totalItems={professoresFiltrados.length} pageSize={pageSize} onPrevious={() => setPage((current) => Math.max(0, current - 1))} onNext={() => setPage((current) => Math.min(Math.ceil(professoresFiltrados.length / pageSize) - 1, current + 1))} />
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
