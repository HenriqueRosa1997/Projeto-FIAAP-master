import { usePostagens } from "@/features/postagem/store/postagemStore";
import ActionButton from "@/shared/ui/ActionButton";
import EntityCard from "@/shared/ui/EntityCard";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import SectionHeader from "@/shared/ui/SectionHeader";
import { useRouter } from "expo-router";

export default function PostagemFeedScreen() {
  const router = useRouter();
  const postagens = usePostagens();

  return (
    <ScreenContainer>
      <SectionHeader title="Postagens" />

      {postagens.map((postagem) => (
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
    </ScreenContainer>
  );
}
