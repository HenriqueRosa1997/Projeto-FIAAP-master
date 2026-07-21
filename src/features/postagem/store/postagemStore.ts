import { mockPostagens } from "@/features/postagem/mocks/postagens";
import { createMockCrudStore } from "@/shared/state/createMockCrudStore";
import { Postagem } from "@/shared/types/entities";

const postagemStore = createMockCrudStore<Postagem>(mockPostagens);

export function usePostagens() {
  return postagemStore.useItems();
}

export function getPostagemById(id: string) {
  return postagemStore.getById(id);
}

export function createPostagem(item: Omit<Postagem, "id"> & { id?: string }) {
  return postagemStore.create(item);
}

export function updatePostagem(
  id: string,
  updates: Partial<Omit<Postagem, "id">>,
) {
  return postagemStore.update(id, updates);
}

export function removePostagem(id: string) {
  postagemStore.remove(id);
}
