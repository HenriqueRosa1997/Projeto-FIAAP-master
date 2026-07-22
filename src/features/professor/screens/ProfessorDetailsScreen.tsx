import { removeProfessor } from "@/features/professor/store/professorStore";
import { Professor } from "@/shared/types/entities";
import ActionButton from "@/shared/ui/ActionButton";
import ConfirmActionModal from "@/shared/ui/ConfirmActionModal";
import EntityDetails from "@/shared/ui/EntityDetails";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type ProfessorDetailsScreenProps = {
  professor?: Professor;
};

export default function ProfessorDetailsScreen({
  professor,
}: ProfessorDetailsScreenProps) {
  const router = useRouter();
  const [foiExcluido, setFoiExcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (!foiExcluido) {
      return;
    }

    const timeout = setTimeout(() => {
      router.replace("/professor/professores");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [foiExcluido, router]);

  return (
    <ScreenContainer>
      <ConfirmActionModal
        visible={modalAberto}
        title="Excluir professor"
        message="Deseja realmente excluir este professor?"
        confirmLabel="Excluir"
        onCancel={() => setModalAberto(false)}
        onConfirm={() => {
          if (!professor) {
            setModalAberto(false);
            return;
          }

          removeProfessor(professor.id);
          setModalAberto(false);
          setFoiExcluido(true);
        }}
      />

      <EntityDetails
        title="Detalhes do Professor"
        topContent={
          foiExcluido ? (
            <StatusBanner message="Professor excluido com sucesso. Retornando para a listagem..." />
          ) : undefined
        }
        items={[
          { label: "Nome", value: professor?.nome ?? "-" },
          { label: "Email", value: professor?.email ?? "-" },
          { label: "Especialidade", value: professor?.especialidade ?? "-" },
        ]}
        footer={
          <>
            <ActionButton
              label="Voltar"
              variant="secondary"
              onPress={() => router.replace("/professor/professores")}
            />
            {!foiExcluido ? (
              <ActionButton
                label="Excluir"
                variant="danger"
                onPress={() => setModalAberto(true)}
              />
            ) : null}
          </>
        }
      />
    </ScreenContainer>
  );
}
