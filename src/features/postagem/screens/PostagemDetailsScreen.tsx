import { removePostagem } from "@/features/postagem/store/postagemStore";
import { Postagem } from "@/shared/types/entities";
import ActionButton from "@/shared/ui/ActionButton";
import ConfirmActionModal from "@/shared/ui/ConfirmActionModal";
import EntityDetails from "@/shared/ui/EntityDetails";
import ScreenContainer from "@/shared/ui/ScreenContainer";
import StatusBanner from "@/shared/ui/StatusBanner";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type PostagemDetailsScreenProps = {
  postagem?: Postagem;
  backHref?: "/professor/postagens" | "/postagemAll";
  allowDelete?: boolean;
};

export default function PostagemDetailsScreen({
  postagem,
  backHref = "/professor/postagens",
  allowDelete = true,
}: PostagemDetailsScreenProps) {
  const router = useRouter();
  const [foiExcluida, setFoiExcluida] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (!foiExcluida) {
      return;
    }

    const timeout = setTimeout(() => {
      router.replace(backHref);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [backHref, foiExcluida, router]);

  return (
    <ScreenContainer>
      {allowDelete ? (
        <ConfirmActionModal
          visible={modalAberto}
          title="Excluir postagem"
          message="Deseja realmente excluir esta postagem?"
          confirmLabel="Excluir"
          onCancel={() => setModalAberto(false)}
          onConfirm={() => {
            if (!postagem) {
              setModalAberto(false);
              return;
            }

            removePostagem(postagem.id);
            setModalAberto(false);
            setFoiExcluida(true);
          }}
        />
      ) : null}

      <EntityDetails
        title="Detalhes da Postagem"
        topContent={
          foiExcluida ? (
            <StatusBanner message="Postagem excluida com sucesso. Retornando para a listagem..." />
          ) : undefined
        }
        items={[
          { label: "Titulo", value: postagem?.titulo ?? "-" },
          { label: "Autor", value: postagem?.autor ?? "-" },
          { label: "Categoria", value: postagem?.categoria ?? "-" },
          { label: "Conteudo", value: postagem?.conteudo ?? "-" },
        ]}
        footer={
          <>
            <ActionButton
              label="Voltar"
              variant="secondary"
              onPress={() => router.replace(backHref)}
            />
            {allowDelete && !foiExcluida ? (
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
