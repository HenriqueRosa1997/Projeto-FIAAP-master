import { usePostagens } from "@/features/postagem/store/postagemStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function PostagemFeedScreen() {
  const router = useRouter();
  const postagens = usePostagens();

  return (
    <ScreenContainer>
      <SectionHeader
        title="Postagens"
        subtitle="Mural principal com dados mockados para os alunos visualizarem"
      />

      {postagens.map((postagem) => (
        <EntityCard
          key={postagem.id}
          title={postagem.titulo}
          subtitle={`Autor: ${postagem.autor}`}
          description={postagem.resumo}
          badge={postagem.status}
          leading={<View style={styles.thumbnail} />}
          onTitlePress={() => router.push(`/postagemAll/${postagem.id}` as const)}
          actions={
            <ActionButton
              label="Visualizar"
              variant="secondary"
              onPress={() => router.push(`/postagemAll/${postagem.id}` as const)}
            />
          }
        />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 120,
    height: 120,
    backgroundColor: "#D9D9D9",
    flexShrink: 0,
  },
});
