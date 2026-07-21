import ProfessorFormScreen from "@/features/professor/screens/ProfessorFormScreen";
import { useProfessores } from "@/features/professor/store/professorStore";
import { useLocalSearchParams } from "expo-router";

export default function EditarProfessorPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const professores = useProfessores();
  const professor = professores.find((item) => item.id === id);

  return <ProfessorFormScreen mode="edit" professor={professor} />;
}
