import { createFirestoreCrudRepository } from "@/shared/repositories/createFirestoreCrudRepository";
import { Professor } from "@/shared/types/entities";

export const professorRepository = createFirestoreCrudRepository<Professor>(
  "professores",
);
