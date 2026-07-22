import {
    createProfessor,
    updateProfessor,
} from "@/features/professor/store/professorStore";
import { FormFieldConfig, Professor } from "@/shared/types/entities";
import EntityForm from "@/shared/ui/EntityForm";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const professorFields: FormFieldConfig[] = [
  {
    name: "nome",
    label: "Nome",
    placeholder: "Digite o nome do professor",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Digite o email do professor",
  },
  {
    name: "especialidade",
    label: "Especialidade",
    placeholder: "Ex: React Native",
  },
];

type ProfessorFormScreenProps = {
  mode: "create" | "edit";
  professor?: Professor;
};

export default function ProfessorFormScreen({
  mode,
  professor,
}: ProfessorFormScreenProps) {
  const router = useRouter();
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    if (!mensagemSucesso) {
      return;
    }

    const timeout = setTimeout(() => {
      router.replace("/professor/professores");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [mensagemSucesso, router]);

  return (
    <ScreenContainer>
      <EntityForm
        title={mode === "create" ? "Cadastrar Professor" : "Editar Professor"}
        subtitle="Preencha os dados do professor"
        fields={professorFields}
        initialValues={{
          nome: mode === "edit" ? (professor?.nome ?? "") : "",
          email: mode === "edit" ? (professor?.email ?? "") : "",
          especialidade:
            mode === "edit" ? (professor?.especialidade ?? "") : "",
        }}
        primaryActionLabel={
          mode === "create" ? "Salvar Professor" : "Atualizar"
        }
        topContent={
          mensagemSucesso ? (
            <StatusBanner message={mensagemSucesso} />
          ) : undefined
        }
        onPrimaryPress={(values) => {
          const payload = {
            nome: values.nome,
            email: values.email,
            especialidade: values.especialidade,
          };

          if (mode === "create") {
            createProfessor(payload);
            setMensagemSucesso(
              "Professor salvo com sucesso. Retornando para a listagem...",
            );
            return;
          }

          if (professor) {
            updateProfessor(professor.id, payload);
          }

          setMensagemSucesso(
            "Professor atualizado com sucesso. Retornando para a listagem...",
          );
        }}
        onSecondaryPress={() => router.replace("/professor/professores")}
      />
    </ScreenContainer>
  );
}
