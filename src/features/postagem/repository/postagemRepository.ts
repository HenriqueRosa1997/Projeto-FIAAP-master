import { createFirestoreCrudRepository } from "@/shared/repositories/createFirestoreCrudRepository";
import { Postagem } from "@/shared/types/entities";

export const postagemRepository = createFirestoreCrudRepository<Postagem>(
  "postagens",
);
