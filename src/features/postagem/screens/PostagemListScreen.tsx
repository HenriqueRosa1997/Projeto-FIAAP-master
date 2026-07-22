import { useMemo, useState } from "react";
import { usePostagens } from "@/features/postagem/store/postagemStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SearchField from "@/shared/ui/SearchField";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PostagemListScreen() {
  const router = useRouter();
  const postagens = usePostagens();
  const [busca, setBusca] = useState("");

  const postagensFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return postagens;
    }

    return postagens.filter((postagem) =>
      [postagem.titulo, postagem.autor, postagem.categoria, postagem.resumo]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    );
  }, [busca, postagens]);

  return (
    <ScreenContainer>
      <View style={styles.headerRow}>
        <SectionHeader title="Minhas Publicacoes" />
        <ActionButton
          label="Criar Publicacao"
          onPress={() => router.push("/professor/postagens/criar")}
        />
      </View>

      <SearchField
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por titulo, autor, categoria ou resumo"
      />

      {postagensFiltradas.map((postagem) => (
        <EntityCard
          key={postagem.id}
          title={postagem.titulo}
          subtitle={`Autor: ${postagem.autor}`}
          description={postagem.resumo}
          onTitlePress={() =>
            router.push(`/professor/postagens/${postagem.id}` as const)
          }
          actions={
            <>
              <ActionButton
                label="Visualizar"
                variant="secondary"
                onPress={() =>
                  router.push(`/professor/postagens/${postagem.id}` as const)
                }
              />
              <ActionButton
                label="Editar"
                onPress={() =>
                  router.push(
                    `/professor/postagens/${postagem.id}/editar` as const,
                  )
                }
              />
            </>
          }
        />
      ))}

      {postagensFiltradas.length === 0 ? (
        <Text style={styles.emptyState}>
          Nenhuma postagem encontrada para a busca informada.
        </Text>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    gap: 12,
  },
  emptyState: {
    fontSize: 15,
    color: "#5E5E5E",
  },
});
