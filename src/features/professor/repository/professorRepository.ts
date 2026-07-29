import { createApiCrudRepository } from "@/shared/repositories/createApiCrudRepository";
import { Professor } from "@/shared/types/entities";

export const professorRepository = createApiCrudRepository<Professor>("/professores");
