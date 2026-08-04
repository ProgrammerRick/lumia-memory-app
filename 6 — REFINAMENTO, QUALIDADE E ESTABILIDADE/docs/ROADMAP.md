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

- [x] **Etapa 3 — Sistema de Memórias** ✅
  Primeiro sistema funcional do produto: modelo de dados de "Memória"
  (`types/memory.ts`), camada de armazenamento local (`services/storage`,
  `localStorage`), estado de domínio compartilhado (`MemoriesContext`), e
  as operações completas de **criar, editar, visualizar e excluir**
  memórias (com confirmação segura), incluindo seleção de imagem de capa a
  partir da galeria do dispositivo. Home e Timeline passaram a exibir
  memórias reais, com estado vazio elegante quando não há nenhuma.

- [x] **Etapa 4 — Memórias Multimídia** ✅
  Suporte a mídia dentro do sistema de memórias já existente: uma memória
  agora pode guardar múltiplas **fotos, vídeos e áudios**, além da imagem de
  capa. Nova camada `services/media/mediaService.ts` isola a leitura de
  arquivos; novos componentes `MediaPicker`, `MediaGallery` e
  `MediaTypeIndicator` (em `components/media/`) trazem a experiência de
  anexar, visualizar, reproduzir e remover mídia, integrados ao formulário
  de criação/edição, à tela de detalhe e aos cartões de Home/Timeline —
  **sem nenhuma alteração visual, de cores, tipografia ou navegação** em
  relação às etapas anteriores.

- [x] **Etapa 5 — Experiência de Uso e Interações** ✅ *(concluída nesta sessão)*
  Evolução puramente comportamental sobre a interface já aprovada: nova tela
  de **onboarding** (`OnboardingScreen`) exibida apenas na primeira visita,
  guardando sua conclusão em `localStorage`; **microinterações** de feedback
  (mídia adicionada, memória salva/atualizada, exclusão confirmada, botões
  com estado de carregamento); **estados de app** mais elegantes (skeleton
  de carregamento na Home/Timeline, toasts de sucesso/erro/mídia); reforço
  de **transições** já existentes (sem substituir nenhuma); pequenos
  detalhes na **timeline** (entrada escalonada já existente reafirmada); e
  melhorias de **acessibilidade** (áreas clicáveis com `role`/teclado, foco
  visível, `aria-live` nos toasts, mensagens de erro anunciadas). Nenhuma
  cor, fonte, layout, espaçamento ou componente visual foi alterado.

- [ ] **Etapa 6 — Busca, filtros e organização avançada**
  Busca textual, filtros por categoria/sentimento/período/tipo de mídia,
  favoritos e reordenação da timeline.

- [ ] **Etapa 7 — Conta, sincronização e backend**
  Introdução de autenticação, backend/API e sincronização entre
  dispositivos (incluindo os arquivos de mídia), respeitando a filosofia de
  privacidade do produto.

- [ ] **Etapa 8 — Polimento final e lançamento**
  Revisão geral de UX/UI, performance, animações finais, preparação para
  publicação/distribuição.

> Observação: o escopo detalhado de cada etapa futura pode ser refinado no
> início do respectivo chat, mas a ordem geral e os princípios acima são
> definitivos.
