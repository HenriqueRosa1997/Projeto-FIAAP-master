import { createApiCrudRepository } from "@/shared/repositories/createApiCrudRepository";
import { Postagem } from "@/shared/types/entities";

export const postagemRepository = createApiCrudRepository<Postagem>("/posts");
