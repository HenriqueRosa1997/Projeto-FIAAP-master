import {
    createPostagem,
    updatePostagem,
} from "@/features/postagem/store/postagemStore";
import { FormFieldConfig, Postagem } from "@/shared/types/entities";
import EntityForm from "@/shared/ui/EntityForm";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const postagemFields: FormFieldConfig[] = [
  {
    name: "titulo",
    label: "Titulo",
    placeholder: "Digite o titulo da postagem",
  },
  {
    name: "autor",
    label: "Autor",
    placeholder: "Informe o autor",
  },
  {
    name: "categoria",
    label: "Categoria",
    placeholder: "Ex: Comunicados",
  },
  {
    name: "conteudo",
    label: "Conteudo",
    placeholder: "Descreva a postagem",
    multiline: true,
  },
];

type PostagemFormScreenProps = {
  mode: "create" | "edit";
  postagem?: Postagem;
};

export default function PostagemFormScreen({
  mode,
  postagem,
}: PostagemFormScreenProps) {
  const router = useRouter();
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    if (!mensagemSucesso) {
      return;
    }

    const timeout = setTimeout(() => {
      router.replace("/professor/postagens");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [mensagemSucesso, router]);

  return (
    <ScreenContainer>
      <EntityForm
        title={mode === "create" ? "Cadastrar Postagem" : "Editar Postagem"}
        subtitle="Preencha os dados da postagem"
        fields={postagemFields}
        initialValues={{
          titulo: mode === "edit" ? (postagem?.titulo ?? "") : "",
          autor: mode === "edit" ? (postagem?.autor ?? "") : "",
          categoria: mode === "edit" ? (postagem?.categoria ?? "") : "",
          conteudo: mode === "edit" ? (postagem?.conteudo ?? "") : "",
        }}
        primaryActionLabel={mode === "create" ? "Salvar Postagem" : "Atualizar"}
        topContent={
          mensagemSucesso ? (
            <StatusBanner message={mensagemSucesso} />
          ) : undefined
        }
        onPrimaryPress={(values) => {
          const payload = {
            titulo: values.titulo,
            autor: values.autor,
            categoria: values.categoria,
            conteudo: values.conteudo,
            resumo:
              values.conteudo.slice(0, 120).trim() || "Resumo da postagem",
          };

          if (mode === "create") {
            createPostagem(payload);
            setMensagemSucesso(
              "Postagem salva com sucesso. Retornando para a listagem...",
            );
            return;
          }

          if (postagem) {
            updatePostagem(postagem.id, payload);
          }

          setMensagemSucesso(
            "Postagem atualizada com sucesso. Retornando para a listagem...",
          );
        }}
        onSecondaryPress={() => router.replace("/professor/postagens")}
      />
    </ScreenContainer>
  );
}
