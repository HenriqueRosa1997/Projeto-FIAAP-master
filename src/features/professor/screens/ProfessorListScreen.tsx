import { useMemo, useState } from "react";
import { useProfessores } from "@/features/professor/store/professorStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SearchField from "@/shared/ui/SearchField";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfessorListScreen() {
  const router = useRouter();
  const professores = useProfessores();
  const [busca, setBusca] = useState("");

  const professoresFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return professores;
    }

    return professores.filter((professor) =>
      [professor.nome, professor.email, professor.especialidade, professor.status]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    );
  }, [busca, professores]);

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <SectionHeader
          title="Professores"
          subtitle="CRUD de professores organizado em feature especifica"
        />
        <ActionButton
          label="Cadastrar Professor"
          onPress={() => router.push("/professor/professores/criar")}
        />
      </View>

      <SearchField
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por nome, email, especialidade ou status"
      />

      {professoresFiltrados.map((professor) => (
        <EntityCard
          key={professor.id}
          title={professor.nome}
          subtitle={professor.email}
          description={`Especialidade: ${professor.especialidade}`}
          badge={professor.status}
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
