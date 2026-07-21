import PostagemFormScreen from "@/features/postagem/screens/PostagemFormScreen";
import { usePostagens } from "@/features/postagem/store/postagemStore";
import { useLocalSearchParams } from "expo-router";

export default function EditarPostagemPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postagens = usePostagens();
  const postagem = postagens.find((item) => item.id === id);

  return <PostagemFormScreen mode="edit" postagem={postagem} />;
}
