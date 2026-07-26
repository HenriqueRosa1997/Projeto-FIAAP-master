import { createFirestoreCrudRepository } from "@/shared/repositories/createFirestoreCrudRepository";
import { Aluno } from "@/shared/types/entities";

export const alunoRepository = createFirestoreCrudRepository<Aluno>("alunos");
