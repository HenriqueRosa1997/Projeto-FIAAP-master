import AlunoFormScreen from "@/features/aluno/screens/AlunoFormScreen";
import { useAlunos } from "@/features/aluno/store/alunoStore";
import { useLocalSearchParams } from "expo-router";

export default function EditarAlunoPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alunos = useAlunos();
  const aluno = alunos.find((item) => item.id === id);

  return <AlunoFormScreen mode="edit" aluno={aluno} />;
}
