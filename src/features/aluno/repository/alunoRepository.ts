import { createApiCrudRepository } from "@/shared/repositories/createApiCrudRepository";
import { Aluno } from "@/shared/types/entities";

export const alunoRepository = createApiCrudRepository<Aluno>("/alunos");
