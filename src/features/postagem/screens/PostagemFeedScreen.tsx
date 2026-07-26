import { usePostagens, usePostagensStatus } from "@/features/postagem/store/postagemStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SearchField from "@/shared/ui/SearchField";
import SectionHeader from "@/shared/ui/SectionHeader";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

export default function PostagemFeedScreen() {
  const router = useRouter();
  const postagens = usePostagens();
  const { loading, error } = usePostagensStatus();
  const [busca, setBusca] = useState("");
  const postagensFiltradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase();

    if (!termo) {
      return postagens;
    }

    return postagens.filter((postagem) =>
      [postagem.titulo, postagem.autor, postagem.resumo, postagem.categoria]
        .join(" ")
        .toLocaleLowerCase()
        .includes(termo),
    );
  }, [busca, postagens]);

  return (
    <ScreenContainer>
      <SectionHeader
        title="Postagens"
        subtitle="Conteúdos e comunicados da comunidade acadêmica."
      />
      {loading ? <ActivityIndicator accessibilityLabel="Carregando postagens" color="#1E63D5" /> : null}
      {error ? <StatusBanner message={error} variant="error" /> : null}
      <SearchField
        value={busca}
        onChangeText={setBusca}
        placeholder="Buscar por título, autor ou assunto"
      />

      {postagensFiltradas.map((postagem) => (
        <EntityCard
          key={postagem.id}
          title={postagem.titulo}
          subtitle={`Autor: ${postagem.autor}`}
          description={postagem.resumo}
          onTitlePress={() =>
            router.push(`/postagemAll/${postagem.id}` as const)
          }
          actions={
            <ActionButton
              label="Visualizar"
              variant="secondary"
              onPress={() =>
                router.push(`/postagemAll/${postagem.id}` as const)
              }
            />
          }
        />
      ))}
      {!loading && !error && postagensFiltradas.length === 0 ? (
        <Text>
          {busca.trim()
            ? "Nenhuma postagem encontrada para a busca informada."
            : "Nenhuma postagem disponível no momento."}
        </Text>
      ) : null}
    </ScreenContainer>
  );
}
