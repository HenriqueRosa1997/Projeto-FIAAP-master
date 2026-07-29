import { request } from "@/services/api";

type CreateProfessorAccountInput = { nome: string; email: string; especialidade: string; senha: string };

export async function createProfessorWithAccount(data: CreateProfessorAccountInput) {
  await request("/professores", { method: "POST", body: JSON.stringify(data) });
}
