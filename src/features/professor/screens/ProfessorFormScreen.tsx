import {
    updateProfessor,
} from "@/features/professor/store/professorStore";
import { createProfessorWithAccount } from "@/features/professor/repository/professorAuthRepository";
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
    autoCapitalize: "none",
    keyboardType: "email-address",
  },
  {
    name: "especialidade",
    label: "Especialidade",
    placeholder: "Ex: React Native",
  },
];

const passwordField: FormFieldConfig = {
  name: "senha",
  label: "Senha inicial",
  placeholder: "Crie uma senha com ao menos 6 caracteres",
  secureTextEntry: true,
  autoCapitalize: "none",
};

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

  if (mode === "edit" && !professor) {
    return (
      <ScreenContainer>
        <StatusBanner message="Professor não encontrado." variant="error" />
      </ScreenContainer>
    );
  }

  const professorAtual = professor;
  const fields = mode === "create" ? [...professorFields, passwordField] : professorFields;

  return (
    <ScreenContainer>
      <EntityForm
        title={mode === "create" ? "Cadastrar Professor" : "Editar Professor"}
        subtitle={mode === "create" ? "Os dados também criam o acesso de login" : "Atualize os dados do professor"}
        fields={fields}
        initialValues={{
          nome: mode === "edit" ? (professor?.nome ?? "") : "",
          email: mode === "edit" ? (professor?.email ?? "") : "",
          especialidade:
            mode === "edit" ? (professor?.especialidade ?? "") : "",
          senha: "",
        }}
        primaryActionLabel={
          mode === "create" ? "Salvar Professor" : "Atualizar"
        }
        topContent={
          mensagemSucesso ? (
            <StatusBanner message={mensagemSucesso} />
          ) : undefined
        }
        onPrimaryPress={async (values) => {
          const payload = {
            nome: values.nome,
            email: values.email,
            especialidade: values.especialidade,
          };

          if (mode === "create") {
            await createProfessorWithAccount({ ...payload, senha: values.senha });
            setMensagemSucesso(
              "Professor salvo com sucesso. Retornando para a listagem...",
            );
            return;
          }

          await updateProfessor(professorAtual!.id, payload);

          setMensagemSucesso(
            "Professor atualizado com sucesso. Retornando para a listagem...",
          );
        }}
        onSecondaryPress={() => router.replace("/professor/professores")}
      />
    </ScreenContainer>
  );
}
