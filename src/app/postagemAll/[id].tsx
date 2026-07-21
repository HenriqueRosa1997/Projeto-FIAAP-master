import { useLocalSearchParams } from "expo-router";
import PostagemDetailsScreen from "@/features/postagem/screens/PostagemDetailsScreen";
import { usePostagens } from "@/features/postagem/store/postagemStore";

export default function VisualizarPostagemPublicaPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postagens = usePostagens();
  const postagem = postagens.find((item) => item.id === id);

  return (
    <PostagemDetailsScreen
      postagem={postagem}
      backHref="/postagemAll"
      allowDelete={false}
    />
  );
}
