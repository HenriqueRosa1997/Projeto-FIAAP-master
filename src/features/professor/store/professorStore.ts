import { mockProfessores } from "@/features/professor/mocks/professores";
import { createMockCrudStore } from "@/shared/state/createMockCrudStore";
import { Professor } from "@/shared/types/entities";

const professorStore = createMockCrudStore<Professor>(mockProfessores);

export function useProfessores() {
  return professorStore.useItems();
}

export function getProfessorById(id: string) {
  return professorStore.getById(id);
}

export function createProfessor(item: Omit<Professor, "id"> & { id?: string }) {
  return professorStore.create(item);
}

export function updateProfessor(
  id: string,
  updates: Partial<Omit<Professor, "id">>,
) {
  return professorStore.update(id, updates);
}

export function removeProfessor(id: string) {
  professorStore.remove(id);
}
