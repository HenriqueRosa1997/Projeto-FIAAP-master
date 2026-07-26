import { functions } from "@/services/firebase";
import { httpsCallable } from "firebase/functions";

type CreateProfessorAccountInput = {
  nome: string;
  email: string;
  especialidade: string;
  senha: string;
};

const createProfessorAccount = httpsCallable<CreateProfessorAccountInput, { uid: string }>(
  functions,
  "createProfessorAccount",
);

export async function createProfessorWithAccount(data: CreateProfessorAccountInput) {
  try {
    await createProfessorAccount(data);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error
      ? error.code
      : undefined;

    if (code === "functions/not-found") {
      throw new Error("O serviço de cadastro não está publicado. Execute o deploy da Cloud Function.");
    }

    if (code === "functions/permission-denied") {
      throw new Error("Sua conta não tem permissão para cadastrar professores.");
    }

    if (code === "functions/already-exists") {
      throw new Error("Já existe uma conta com este e-mail.");
    }

    if (code === "functions/invalid-argument") {
      throw new Error("Preencha todos os dados e informe uma senha de pelo menos seis caracteres.");
    }

    throw new Error("Não foi possível cadastrar o professor. Verifique a configuração da Cloud Function.");
  }
}
