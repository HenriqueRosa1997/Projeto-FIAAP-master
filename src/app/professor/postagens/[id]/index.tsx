import PostagemDetailsScreen from "@/features/postagem/screens/PostagemDetailsScreen";
import { usePostagens } from "@/features/postagem/store/postagemStore";
import { useLocalSearchParams } from "expo-router";

export default function DetalharPostagemPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postagens = usePostagens();
  const postagem = postagens.find((item) => item.id === id);

  return <PostagemDetailsScreen postagem={postagem} />;
}
