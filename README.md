# Learn.io Mobile

Aplicação mobile desenvolvida com React Native e Expo para a plataforma Learn.io. A leitura de postagens é pública e a área administrativa do professor exige autenticação com autorização por perfil, oferecendo CRUD completo para postagens, professores e alunos.

## Visão geral

O projeto usa navegação baseada em arquivos, uma API REST em Fastify e PostgreSQL.

Fluxos principais:

- leitura pública de postagens
- visualização do detalhe de uma postagem
- login do professor
- área administrativa protegida
- criação, edição, listagem e remoção de postagens
- criação, edição, listagem e remoção de professores
- criação, edição, listagem e remoção de alunos

## Stack

- Expo 57
- React Native 0.86
- Expo Router
- TypeScript
- API REST (Fastify)
- PostgreSQL / TypeORM
- AsyncStorage para persistência da sessão no mobile

## Requisitos

- Node.js 22.13 ou superior
- npm
- Expo Go, emulador ou navegador compatível

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

Scripts úteis:

```bash
npm run android
npm run ios
npm run web
npm run lint
```

## Configuração da API

Copie [.env.example](.env.example) para `.env` e defina a URL que o dispositivo consegue acessar. Em Android físico, use o IP local da máquina em vez de `localhost`.

```bash
EXPO_PUBLIC_API_URL=http://192.168.0.10:3001
```

Em outro terminal, configure e execute a API:

```bash
cd api
cp .env.example .env
npm install
npm run start:dev
```

As migrations são executadas na inicialização. Configure as credenciais PostgreSQL em `api/.env`.

## Autenticação e acesso

O login do professor usa `POST /user/signin`; o JWT retornado é preservado no mobile com AsyncStorage. Todo professor autenticado pode criar, editar e listar postagens.

A área administrativa é protegida em [src/shared/context/AuthContext.tsx](src/shared/context/AuthContext.tsx) e [src/app/_layout.tsx](src/app/_layout.tsx):

- a API valida o JWT e o perfil `PROFESSOR` nos endpoints administrativos
- usuários sem sessão são redirecionados para `/login` ao acessar `/professor`

## Rotas

O app usa Expo Router dentro de [src/app](src/app).

### Autenticação e leitura

- [src/app/index.tsx](src/app/index.tsx) redireciona para a home pública
- [src/app/postagemAll/index.tsx](src/app/postagemAll/index.tsx) lista as postagens publicamente e é a tela inicial
- [src/app/postagemAll/[id].tsx](src/app/postagemAll/%5Bid%5D.tsx) exibe o detalhe da postagem
- [src/app/login.tsx](src/app/login.tsx) exibe a tela de autenticação

### Área do professor

- [src/app/professor/index.tsx](src/app/professor/index.tsx) é a entrada da área administrativa
- [src/app/professor/postagens/index.tsx](src/app/professor/postagens/index.tsx) lista postagens
- [src/app/professor/postagens/criar.tsx](src/app/professor/postagens/criar.tsx) cria postagem
- [src/app/professor/postagens/[id]/index.tsx](src/app/professor/postagens/%5Bid%5D/index.tsx) detalha postagem
- [src/app/professor/postagens/[id]/editar.tsx](src/app/professor/postagens/%5Bid%5D/editar.tsx) edita postagem
- [src/app/professor/alunos/index.tsx](src/app/professor/alunos/index.tsx) lista alunos
- [src/app/professor/alunos/criar.tsx](src/app/professor/alunos/criar.tsx) cria aluno
- [src/app/professor/alunos/[id]/index.tsx](src/app/professor/alunos/%5Bid%5D/index.tsx) detalha aluno
- [src/app/professor/alunos/[id]/editar.tsx](src/app/professor/alunos/%5Bid%5D/editar.tsx) edita aluno
- [src/app/professor/professores/index.tsx](src/app/professor/professores/index.tsx) lista professores
- [src/app/professor/professores/criar.tsx](src/app/professor/professores/criar.tsx) cria professor
- [src/app/professor/professores/[id]/index.tsx](src/app/professor/professores/%5Bid%5D/index.tsx) detalha professor
- [src/app/professor/professores/[id]/editar.tsx](src/app/professor/professores/%5Bid%5D/editar.tsx) edita professor

## Arquitetura

O código está organizado por domínio em [src/features](src/features) e por camada compartilhada em [src/shared](src/shared).

### Domínios

- [src/features/postagem](src/features/postagem)
- [src/features/aluno](src/features/aluno)
- [src/features/professor](src/features/professor)

Cada domínio concentra:

- repositório do domínio
- store com a lógica de persistência e leitura
- telas específicas

### Camada compartilhada

- [src/shared/repositories/createApiCrudRepository.ts](src/shared/repositories/createApiCrudRepository.ts) centraliza o CRUD REST
- [src/shared/context/AuthContext.tsx](src/shared/context/AuthContext.tsx) concentra autenticação e autorização
- [src/shared/ui](src/shared/ui) reúne os componentes reutilizáveis da interface

## Componentes e layout

O layout global é definido em [src/app/_layout.tsx](src/app/_layout.tsx) e usa um cabeçalho compartilhado para manter a consistência visual entre telas públicas e administrativas.

## Scripts

- `npm start` inicia o Expo
- `npm run android` abre o app no Android
- `npm run ios` abre o app no iOS
- `npm run web` executa a versão web
- `npm run lint` valida o código com ESLint

## Verificação

```bash
npm run lint
