import { alunoRepository } from "@/features/aluno/repository/alunoRepository";
import { Aluno } from "@/shared/types/entities";

export function useAlunos() {
  return alunoRepository.useItems();
}

export function useAlunosStatus() { return alunoRepository.useStatus(); }

export function getAlunoById(id: string) {
  return alunoRepository.getById(id);
}

export function createAluno(item: Omit<Aluno, "id"> & { id?: string }) {
  return alunoRepository.create(item);
}

export function updateAluno(id: string, updates: Partial<Omit<Aluno, "id">>) {
  return alunoRepository.update(id, updates);
}

export function removeAluno(id: string) {
  return alunoRepository.remove(id);
}
