# ROADMAP — Lumia

Este roadmap descreve as etapas planejadas do desenvolvimento do Lumia.
Cada etapa é desenvolvida evoluindo a partir da versão anterior — nunca
recriando o projeto.

- [x] **Etapa 1 — Fundação** ✅
  Estrutura profissional do projeto, Design System completo, tema global,
  componentes base (UI e layout), navegação entre telas, animações base, e
  as 5 telas iniciais sem funcionalidade real: Welcome, Home (vazia), Criar
  Memória (vazia), Timeline (vazia) e Configurações (vazia).

- [x] **Etapa 2 — Interface Premium** ✅
  Refinamento visual completo: microinterações (ripple discreto, hover,
  tap), tela de carregamento elegante na entrada, texturas e brilhos mais
  ricos em `AppShell`/`BottomNav`/`Logo`, transições de tela com leve
  profundidade, e identidade visual madura. Nenhuma funcionalidade, sistema
  ou dado novo foi introduzido nesta etapa.

- [x] **Etapa 3 — Sistema de Memórias** ✅ *(concluída nesta sessão)*
  Primeiro sistema funcional do produto: modelo de dados de "Memória"
  (`types/memory.ts`), camada de armazenamento local (`services/storage`,
  `localStorage`), estado de domínio compartilhado (`MemoriesContext`), e
  as operações completas de **criar, editar, visualizar e excluir**
  memórias (com confirmação segura), incluindo seleção de imagem de capa a
  partir da galeria do dispositivo. Home e Timeline passaram a exibir
  memórias reais, com estado vazio elegante quando não há nenhuma.

- [ ] **Etapa 4 — Vídeo e áudio**
  Suporte à criação de memórias em vídeo e áudio (gravação e/ou upload),
  incluindo players customizados com a identidade visual do Lumia.

- [ ] **Etapa 5 — Busca, filtros e organização avançada**
  Busca textual, filtros por categoria/sentimento/período, favoritos e
  reordenação da timeline.

- [ ] **Etapa 6 — Conta, sincronização e backend**
  Introdução de autenticação, backend/API e sincronização entre
  dispositivos, respeitando a filosofia de privacidade do produto.

- [ ] **Etapa 7 — Polimento final e lançamento**
  Revisão geral de UX/UI, acessibilidade, performance, animações finais,
  onboarding completo, preparação para publicação/distribuição.

> Observação: o escopo detalhado de cada etapa futura pode ser refinado no
> início do respectivo chat, mas a ordem geral e os princípios acima são
> definitivos.
