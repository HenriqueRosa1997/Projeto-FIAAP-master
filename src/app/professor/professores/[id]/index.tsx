import ProfessorDetailsScreen from "@/features/professor/screens/ProfessorDetailsScreen";
import { useProfessores } from "@/features/professor/store/professorStore";
import { useLocalSearchParams } from "expo-router";

export default function DetalharProfessorPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const professores = useProfessores();
  const professor = professores.find((item) => item.id === id);

  return <ProfessorDetailsScreen professor={professor} />;
}
