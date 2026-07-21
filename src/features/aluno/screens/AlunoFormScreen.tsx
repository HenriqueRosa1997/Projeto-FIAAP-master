import { createAluno, updateAluno } from "@/features/aluno/store/alunoStore";
import { Aluno, FormFieldConfig } from "@/shared/types/entities";
import EntityForm from "@/shared/ui/EntityForm";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const alunoFields: FormFieldConfig[] = [
  {
    name: "nome",
    label: "Nome",
    placeholder: "Digite o nome do aluno",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Digite o email do aluno",
  },
  {
    name: "turma",
    label: "Turma",
    placeholder: "Ex: 2TDSA",
  },
];

type AlunoFormScreenProps = {
  mode: "create" | "edit";
  aluno?: Aluno;
};

export default function AlunoFormScreen({ mode, aluno }: AlunoFormScreenProps) {
  const router = useRouter();
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    if (!mensagemSucesso) {
      return;
    }

    const timeout = setTimeout(() => {
      router.replace("/professor/alunos");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [mensagemSucesso, router]);

  return (
    <ScreenContainer>
      <EntityForm
        title={mode === "create" ? "Cadastrar Aluno" : "Editar Aluno"}
        subtitle="Formulario generico com campos definidos pelo modulo de aluno"
        fields={alunoFields}
        initialValues={{
          nome: mode === "edit" ? (aluno?.nome ?? "") : "",
          email: mode === "edit" ? (aluno?.email ?? "") : "",
          turma: mode === "edit" ? (aluno?.turma ?? "") : "",
        }}
        primaryActionLabel={mode === "create" ? "Salvar Aluno" : "Atualizar"}
        topContent={
          mensagemSucesso ? (
            <StatusBanner message={mensagemSucesso} />
          ) : undefined
        }
        onPrimaryPress={(values) => {
          const payload = {
            nome: values.nome,
            email: values.email,
            turma: values.turma,
            status: (aluno?.status ?? "Ativo") as "Ativo" | "Inativo",
          };

          if (mode === "create") {
            createAluno(payload);
            setMensagemSucesso(
              "Aluno salvo com sucesso. Retornando para a listagem...",
            );
            return;
          }

          if (aluno) {
            updateAluno(aluno.id, payload);
          }

          setMensagemSucesso(
            "Aluno atualizado com sucesso. Retornando para a listagem...",
          );
        }}
        onSecondaryPress={() => router.replace("/professor/alunos")}
      />
    </ScreenContainer>
  );
}
