import { mockAlunos } from "@/features/aluno/mocks/alunos";
import { createMockCrudStore } from "@/shared/state/createMockCrudStore";
import { Aluno } from "@/shared/types/entities";

const alunoStore = createMockCrudStore<Aluno>(mockAlunos);

export function useAlunos() {
  return alunoStore.useItems();
}

export function getAlunoById(id: string) {
  return alunoStore.getById(id);
}

export function createAluno(item: Omit<Aluno, "id"> & { id?: string }) {
  return alunoStore.create(item);
}

export function updateAluno(id: string, updates: Partial<Omit<Aluno, "id">>) {
  return alunoStore.update(id, updates);
}

export function removeAluno(id: string) {
  alunoStore.remove(id);
}
