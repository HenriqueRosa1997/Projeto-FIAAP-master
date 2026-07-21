import AlunoDetailsScreen from "@/features/aluno/screens/AlunoDetailsScreen";
import { useAlunos } from "@/features/aluno/store/alunoStore";
import { useLocalSearchParams } from "expo-router";

export default function DetalharAlunoPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alunos = useAlunos();
  const aluno = alunos.find((item) => item.id === id);

  return <AlunoDetailsScreen aluno={aluno} />;
}
