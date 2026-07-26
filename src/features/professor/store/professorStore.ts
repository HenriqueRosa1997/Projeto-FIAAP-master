import { professorRepository } from "@/features/professor/repository/professorRepository";
import { Professor } from "@/shared/types/entities";

export function useProfessores() {
  return professorRepository.useItems();
}

export function useProfessoresStatus() { return professorRepository.useStatus(); }

export function getProfessorById(id: string) {
  return professorRepository.getById(id);
}

export function createProfessor(item: Omit<Professor, "id"> & { id?: string }) {
  return professorRepository.create(item);
}

export function updateProfessor(
  id: string,
  updates: Partial<Omit<Professor, "id">>,
) {
  return professorRepository.update(id, updates);
}

export function removeProfessor(id: string) {
  return professorRepository.remove(id);
}
