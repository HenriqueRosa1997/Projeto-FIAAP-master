import { Postagem } from "@/shared/types/entities";

export const mockPostagens: Postagem[] = [
  {
    id: "1",
    titulo: "Titulo da Postagem",
    autor: "Fulano da Silva",
    resumo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed lectus a turpis pulvinar vulputate eu et felis. Donec varius nibh vel risus interdum mattis.",
    conteudo:
      "Conteudo completo da postagem com mais detalhes para futura tela de visualizacao e integracao com backend.",
    categoria: "Comunicados",
    status: "Publicado",
  },
  {
    id: "2",
    titulo: "Agenda da Semana",
    autor: "Maria Oliveira",
    resumo:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Praesent euismod tellus quis volutpat convallis.",
    conteudo:
      "Agenda detalhada com atividades, datas e lembretes para os alunos acompanharem no mural principal.",
    categoria: "Agenda",
    status: "Publicado",
  },
  {
    id: "3",
    titulo: "Material Complementar",
    autor: "Carlos Souza",
    resumo:
      "Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    conteudo:
      "Lista de materiais complementares sugeridos para aprofundar o conteudo trabalhado nas aulas.",
    categoria: "Materiais",
    status: "Rascunho",
  },
];
