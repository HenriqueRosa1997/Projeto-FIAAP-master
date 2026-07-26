# Learn.io Mobile

Aplicação mobile desenvolvida com React Native e Expo para a plataforma Learn.io. A leitura de postagens é pública e a área administrativa do professor exige autenticação com autorização por perfil, oferecendo CRUD completo para postagens, professores e alunos.

## Visão geral

O projeto foi estruturado para funcionar como a versão final do desafio, com navegação baseada em arquivos, Firebase Auth para login e Firestore como base de dados.

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
- Firebase Auth
- Firestore
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

## Configuração Firebase

O projeto já vem configurado com Firebase nas duas plataformas:

- [src/services/firebase.native.ts](src/services/firebase.native.ts)
- [src/services/firebase.web.ts](src/services/firebase.web.ts)

Não há variáveis de ambiente obrigatórias no estado atual do código. Se o projeto for apontado para outro backend Firebase, a configuração deve ser atualizada nesses arquivos.

### Perfis de acesso

Não há variáveis públicas obrigatórias no aplicativo. A autorização é feita por *custom claims* do Firebase Auth, validadas também pelas regras do Firestore. Crie o primeiro administrador com o script de seed descrito abaixo.

### Cadastro de professores

Não há cadastro público. Somente administradores podem usar a aba **Professores** para criar uma conta docente. O formulário solicita uma senha inicial e chama a Cloud Function `createProfessorAccount`, que cria a conta no Firebase Authentication e o perfil em `professores`.

Antes do deploy, copie `functions/.env.example` para `functions/.env` e configure o mesmo e-mail de admin. Em seguida, instale as dependências e publique a Function:

```bash
cd functions
npm install
cd ..
firebase deploy --only firestore:rules,functions:createProfessorAccount
```

#### Seed do primeiro administrador

Use uma credencial de conta de serviço do Firebase, sem adicioná-la ao Git, para criar ou promover a conta inicial:

```bash
npm run seed:admin -- \
  --email admin@exemplo.com \
  --password "uma-senha-forte" \
  --nome "Administrador" \
  --especialidade "Gestão" \
  --service-account /caminho/seguro/service-account.json
```

Também é possível usar credenciais padrão da aplicação por meio de `GOOGLE_APPLICATION_CREDENTIALS`; nesse caso, omita `--service-account`. O script concede a claim e cria/atualiza `professores/{uid}`.

## Autenticação e acesso

O login do professor é feito com Firebase Auth em [src/Screens/Login/Login.tsx](src/Screens/Login/Login.tsx). Todo professor autenticado pode criar, editar e listar postagens. A sessão é preservada no mobile com AsyncStorage.

A área administrativa é protegida em [src/shared/context/AuthContext.tsx](src/shared/context/AuthContext.tsx) e [src/app/_layout.tsx](src/app/_layout.tsx):

- qualquer pessoa pode ler postagens em `/postagemAll`, inclusive sem sessão
- usuários sem sessão são redirecionados para `/login` ao acessar `/professor`
- professores autenticados acessam o gerenciamento de postagens
- a custom claim `role: "admin"` libera a administração de professores e alunos
- a custom claim `role: "teacher"`, ou um perfil próprio em `professores/{uid}`, libera o gerenciamento de postagens

As regras em [firestore.rules](firestore.rules) impedem que usuários sem perfil docente alterem postagens e reservam os cadastros de alunos e professores para administradores.

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

- [src/shared/repositories/createFirestoreCrudRepository.ts](src/shared/repositories/createFirestoreCrudRepository.ts) centraliza o CRUD com Firestore
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
