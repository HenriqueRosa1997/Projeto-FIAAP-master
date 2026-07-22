import { removeAluno } from "@/features/aluno/store/alunoStore";
import { Aluno } from "@/shared/types/entities";
import ActionButton from "@/shared/ui/ActionButton";
import ConfirmActionModal from "@/shared/ui/ConfirmActionModal";
import EntityDetails from "@/shared/ui/EntityDetails";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type AlunoDetailsScreenProps = {
  aluno?: Aluno;
};

export default function AlunoDetailsScreen({ aluno }: AlunoDetailsScreenProps) {
  const router = useRouter();
  const [foiExcluido, setFoiExcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (!foiExcluido) {
      return;
    }

    const timeout = setTimeout(() => {
      router.replace("/professor/alunos");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [foiExcluido, router]);

  return (
    <ScreenContainer>
      <ConfirmActionModal
        visible={modalAberto}
        title="Excluir aluno"
        message="Deseja realmente excluir este aluno?"
        confirmLabel="Excluir"
        onCancel={() => setModalAberto(false)}
        onConfirm={() => {
          if (!aluno) {
            setModalAberto(false);
            return;
          }

          removeAluno(aluno.id);
          setModalAberto(false);
          setFoiExcluido(true);
        }}
      />

      <EntityDetails
        title="Detalhes do Aluno"
        topContent={
          foiExcluido ? (
            <StatusBanner message="Aluno excluido com sucesso. Retornando para a listagem..." />
          ) : undefined
        }
        items={[
          { label: "Nome", value: aluno?.nome ?? "-" },
          { label: "Email", value: aluno?.email ?? "-" },
          { label: "Turma", value: aluno?.turma ?? "-" },
        ]}
        footer={
          <>
            <ActionButton
              label="Voltar"
              variant="secondary"
              onPress={() => router.replace("/professor/alunos")}
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
