export type Postagem = {
  id: string;
  titulo: string;
  autor: string;
  resumo: string;
  conteudo: string;
  categoria: string;
};

export type Professor = {
  id: string;
  nome: string;
  email: string;
  especialidade: string;
};

export type Aluno = {
  id: string;
  nome: string;
  email: string;
  turma: string;
};

export type FormFieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
};

export type DetailItem = {
  label: string;
  value: string;
};
