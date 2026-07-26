import { postagemRepository } from "@/features/postagem/repository/postagemRepository";
import { Postagem } from "@/shared/types/entities";

export function usePostagens() {
  return postagemRepository.useItems();
}

export function usePostagensStatus() { return postagemRepository.useStatus(); }

export function getPostagemById(id: string) {
  return postagemRepository.getById(id);
}

export function createPostagem(item: Omit<Postagem, "id"> & { id?: string }) {
  return postagemRepository.create(item);
}

export function updatePostagem(
  id: string,
  updates: Partial<Omit<Postagem, "id">>,
) {
  return postagemRepository.update(id, updates);
}

export function removePostagem(id: string) {
  return postagemRepository.remove(id);
}
