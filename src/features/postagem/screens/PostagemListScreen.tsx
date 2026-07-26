import { useMemo, useState } from "react";
import { removePostagem, usePostagens, usePostagensStatus } from "@/features/postagem/store/postagemStore";
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

export default function PostagemListScreen() {
  const router = useRouter();
  const postagens = usePostagens();
  const { loading, error } = usePostagensStatus();
  const [busca, setBusca] = useState("");
  const [page, setPage] = useState(0);
  const [postagemParaExcluir, setPostagemParaExcluir] = useState<{ id: string; titulo: string } | null>(null);
  const [erroExclusao, setErroExclusao] = useState("");
  const pageSize = 10;

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
  const visiblePostagens = postagensFiltradas.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <ScreenContainer>
      <ConfirmActionModal
        visible={Boolean(postagemParaExcluir)}
        title="Excluir postagem"
        message={`Deseja realmente excluir a postagem “${postagemParaExcluir?.titulo ?? ""}”?`}
        confirmLabel="Excluir"
        onCancel={() => setPostagemParaExcluir(null)}
        onConfirm={async () => {
          if (!postagemParaExcluir) return;

          try {
            await removePostagem(postagemParaExcluir.id);
            setPostagemParaExcluir(null);
          } catch {
            setErroExclusao("Não foi possível excluir a postagem. Tente novamente.");
            setPostagemParaExcluir(null);
          }
        }}
      />
      <View style={styles.headerRow}>
        <SectionHeader title="Minhas Publicacoes" />
        <ActionButton
          label="Criar Publicacao"
          onPress={() => router.push("/professor/postagens/criar")}
        />
      </View>
      {loading ? <ActivityIndicator accessibilityLabel="Carregando postagens" color="#1E63D5" /> : null}
      {error || erroExclusao ? <StatusBanner message={error ?? erroExclusao} variant="error" /> : null}

      <SearchField
        value={busca}
        onChangeText={(text) => { setBusca(text); setPage(0); }}
        placeholder="Buscar por titulo, autor, categoria ou resumo"
      />

      {visiblePostagens.map((postagem) => (
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
              <ActionButton
                label="Excluir"
                variant="danger"
                onPress={() => {
                  setErroExclusao("");
                  setPostagemParaExcluir({ id: postagem.id, titulo: postagem.titulo });
                }}
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
      <Pagination page={page} totalItems={postagensFiltradas.length} pageSize={pageSize} onPrevious={() => setPage((current) => Math.max(0, current - 1))} onNext={() => setPage((current) => Math.min(Math.ceil(postagensFiltradas.length / pageSize) - 1, current + 1))} />
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
