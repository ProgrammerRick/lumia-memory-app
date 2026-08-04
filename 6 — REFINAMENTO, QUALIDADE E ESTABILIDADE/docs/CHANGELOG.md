# CHANGELOG — Lumia

Todas as mudanças relevantes do projeto são registradas aqui, por etapa.

## [Etapa 5] — Experiência de Uso e Interações (esta etapa)

> Esta etapa não mexeu em nenhuma cor, fonte, espaçamento, raio, sombra ou
> layout já aprovado. O objetivo foi fazer o Lumia **parecer mais vivo**
> através de comportamento: uma primeira experiência para novos usuários,
> pequenos gestos de resposta a cada ação, estados de carregamento/erro mais
> elegantes e reforços de acessibilidade — tudo reaproveitando os
> componentes do Design System já existentes.

### Adicionado

- **Onboarding inicial** (`src/screens/OnboardingScreen.tsx`): três passos
  curtos apresentando o Lumia, o conceito de memória e como criar a
  primeira, reaproveitando `Logo`, `GlassCard` e `Button` já existentes e o
  mesmo padrão de transição (`fade + slide`, mesmo easing) do restante do
  app. Exibido apenas uma vez — a conclusão é guardada em `localStorage`
  através do novo utilitário `src/utils/onboarding.ts`
  (`lumia:onboarding-completed`). `WelcomeScreen` agora decide, ao tocar em
  "Começar", entre ir para o onboarding (primeira vez) ou direto para a
  Home (visitas seguintes). Em `SettingsScreen`, uma nova opção "Rever
  apresentação inicial" permite limpar essa flag manualmente.
- **Microinterações de feedback**:
  - `MediaPicker` agora confirma visualmente quando uma mídia é adicionada
    (`showToast(..., "media")`) e quando um arquivo é rejeitado por ser
    grande demais ou inválido (`showToast(..., "error")`).
  - `CreateMemoryScreen`: o botão de salvar ganhou estado de carregamento
    visível (`Button loading`) tanto ao criar quanto ao editar uma memória,
    com o texto mudando para "Guardando...".
  - `MemoryDetailScreen`: a exclusão de uma memória agora mostra
    "Excluindo..." no próprio diálogo de confirmação antes de concluir a
    ação, evitando qualquer sensação de clique "no vazio".
  - `Button` (Design System) ganhou a prop `loading`, reutilizável em
    qualquer botão do app sem introduzir um novo componente.
- **Novos tipos de toast** (`ToastContext`): `media` e `error`, além dos já
  existentes `success` e `delete` — mesmo componente visual
  (`glass-panel-strong`), apenas novos ícones Lucide.
- **Estados de carregamento elegantes**:
  - `MemoryCardSkeleton` (novo, em `components/memories/`): placeholder com
    a mesma silhueta exata do `MemoryCard`, usado por `HomeScreen` e
    `TimelineScreen` durante a leitura inicial do armazenamento local, no
    lugar de uma tela em branco ou de um "piscar" direto para o vazio.
  - `MemoriesContext` ganhou a flag `isReady` (puramente de apresentação;
    não muda a fonte de dados, que continua local e síncrona).
- **Melhorias de acessibilidade**:
  - `MemoryCard` e os itens de `SettingsScreen` ganharam `role="button"`,
    `tabIndex` e suporte a `Enter`/`Espaço` quando possuem uma ação de
    clique, sem qualquer mudança visual.
  - Novo estado de foco visível (`:focus-visible`, em `src/index.css`) com
    contorno dourado translúcido — aparece apenas na navegação por teclado.
  - `ToastContext` passou a anunciar mensagens via `aria-live="polite"` /
    `role="status"`.
  - `ConfirmDialog` ganhou `role="alertdialog"`, `aria-modal` e
    `aria-label`.
  - Mensagem de erro de título obrigatório em `CreateMemoryScreen` agora
    usa `role="alert"` e o campo correspondente recebe `aria-invalid`.
  - Rótulos (`<label htmlFor>`) associados corretamente aos campos de
    título, descrição e data do formulário de memória.

### Não incluído nesta etapa (propositalmente)

- Nenhuma nova tela de conteúdo, funcionalidade de dados ou campo de
  memória — o modelo de dados (`Memory`, `MediaItem`) permanece o mesmo da
  Etapa 4.
- Nenhuma busca, filtro, favorito ou reordenação (reservado à Etapa 6).
- Nenhuma cor, fonte, ícone-set, raio, sombra, layout ou animação nova fora
  do Design System já documentado — todas as adições desta etapa são
  comportamentais.
- Nenhum backend, conta, login ou sincronização.

### Decisões técnicas importantes

- O onboarding foi implementado como uma nova tela dentro do sistema de
  navegação interno já existente (`AppScreen`/`NavigationContext`), e não
  como um modal solto ou uma biblioteca externa de tour guiado.
- Nenhum componente do Design System foi duplicado; toda melhoria de
  experiência reaproveita `Button`, `GlassCard`, `EmptyState`, `Chip`,
  `ConfirmDialog` e o `ToastContext` já existentes, estendendo-os com props
  ou variantes novas quando necessário (`loading`, novos `ToastKind`).
- `isReady` e o skeleton de carregamento são deliberadamente breves (alguns
  milissegundos) — o Lumia continua sendo um app local e rápido; o objetivo
  é apenas evitar uma transição abrupta para o estado vazio.

## [Etapa 4] — Memórias Multimídia

> A partir desta etapa, uma memória deixa de ter apenas uma imagem de capa:
> ela pode guardar consigo várias fotos, vídeos e áudios, exatamente como
> uma caixa de lembranças física guardaria. Nenhuma tela foi recriada e
> nenhuma cor, fonte, espaçamento, sombra ou animação existente foi
> alterada — a multimídia foi incorporada como uma atualização natural da
> interface já aprovada nas Etapas 1 a 3.

### Adicionado

- **Modelo de dados evoluído** (`src/types/memory.ts`): novos tipos
  `MediaType` (`"image" | "video" | "audio"`) e `MediaItem`
  (`id`, `type`, `url`, `name`, `size`, `createdAt`). O tipo `Memory` e
  `MemoryInput` ganharam o campo opcional `media?: MediaItem[]`, mantendo
  compatibilidade total com memórias já existentes (sem mídia).
- **Nova camada de serviço** `src/services/media/mediaService.ts`: isola a
  leitura de arquivos do dispositivo (`FileReader`), conversão para data
  URL, checagem de tamanho máximo (15 MB por arquivo) e formatação de
  tamanho de arquivo — nenhuma tela lê arquivos diretamente.
- **`services/storage/memoryStorage.ts`** ajustado minimamente para
  persistir também o array `media` de cada memória (criação e atualização),
  sem alterar o contrato `MemoryRepository`.
- **Novos componentes** em `src/components/media/`:
  - `MediaPicker` — três atalhos (Foto, Vídeo, Áudio) reaproveitando o
    componente `Chip` já existente, para anexar arquivos a uma memória.
  - `MediaGallery` — grade de fotos/vídeos e lista de players de áudio,
    usada tanto no formulário (com remoção) quanto na tela de detalhe
    (somente leitura), reaproveitando `GlassCard`.
  - `MediaTypeIndicator` — pequenos ícones discretos (foto/vídeo/áudio)
    exibidos no `MemoryCard` quando a memória possui mídia.
- **`CreateMemoryScreen`**: novo bloco "Fotos, vídeos e áudios", com o
  mesmo padrão visual (label uppercase, `motion.div` com fade + slide
  escalonado) das demais seções do formulário. Funciona tanto ao criar
  quanto ao editar uma memória existente.
- **`MemoryDetailScreen`**: nova seção de galeria de mídia, exibida após a
  descrição, mostrando todas as fotos, vídeos e áudios guardados na
  memória.
- **`MemoryCard`** (Home e Timeline): pequeno indicador de mídia
  (`MediaTypeIndicator`) ao lado da categoria, sinalizando quando a memória
  possui fotos, vídeos e/ou áudios — sem alterar tamanho, layout ou estilo
  do cartão.

### Não incluído nesta etapa (propositalmente)

- Nenhuma gravação nativa de vídeo/áudio pela câmera/microfone do
  dispositivo — apenas seleção de arquivos já existentes (galeria/disco),
  assim como a imagem de capa desde a Etapa 3.
- Nenhum upload, nuvem, backend, API externa, compressão avançada ou
  streaming — toda mídia continua guardada localmente como data URL.
- Nenhuma busca, filtro por tipo de mídia ou reordenação.
- Nenhuma cor, fonte, ícone-set, raio, sombra ou animação nova fora do
  Design System já documentado.

### Decisões técnicas importantes

- A lógica de mídia foi mantida **fora das telas**, em
  `src/services/media/`, seguindo o mesmo princípio já usado para memórias
  em `src/services/storage/`.
- `MediaItem` guarda o arquivo como data URL (base64) dentro do próprio
  registro da memória, no `localStorage` — mesma abordagem já usada para
  `coverImage` desde a Etapa 3, mantendo o app 100% local.
- Nenhum componente do Design System (`Button`, `Chip`, `GlassCard`,
  `IconButton`, `ScreenHeader`, etc.) foi duplicado; todos os novos
  componentes de mídia reaproveitam esses blocos já existentes.
- A interface visual permanece pixel-a-pixel a mesma nas telas e fluxos que
  não dizem respeito a mídia — nenhuma tela foi redesenhada.

## [Etapa 3] — Sistema de Memórias

> Primeira etapa de **funcionalidade real** do produto. O Lumia deixa de ser
> apenas uma interface e passa a permitir que o usuário guarde, edite,
> visualize e apague suas próprias memórias, localmente no dispositivo.

### Adicionado

- **Modelo de dados** `src/types/memory.ts`: interface `Memory` com `id`,
  `title`, `description`, `date`, `category`, `feeling`, `coverImage`,
  `createdAt` e `updatedAt`, além de campos reservados (não implementados)
  para vídeo, áudio, localização e status de sincronização.
- **Camada de armazenamento** `src/services/storage/memoryStorage.ts`:
  interface `MemoryRepository` (`list`, `getById`, `create`, `update`,
  `remove`) e implementação local `LocalStorageMemoryRepository`, isolando
  toda a lógica de persistência das telas.
- **Estado de domínio** `src/context/MemoriesContext.tsx`: hook
  `useMemories()` compartilhado por todas as telas, mantendo a lista de
  memórias sincronizada após criar, editar ou excluir.
- **Feedback visual** `src/context/ToastContext.tsx`: hook `useToast()` com
  um toast discreto (`glass-panel-strong`) para confirmar ações de salvar e
  excluir sem interromper a navegação.
- **Navegação com parâmetros**: `NavigationContext` agora aceita
  `navigate(screen, params)` e expõe `params`/`goBack()`, permitindo abrir a
  nova tela `"memory-detail"` com `{ memoryId }` e reaproveitar a tela
  `"create"` também como edição.
- **Nova tela** `src/screens/MemoryDetailScreen.tsx`: visualização completa
  de uma memória, com ações de editar e excluir (com confirmação segura via
  `ConfirmDialog`).
- **`CreateMemoryScreen` reescrita**: formulário real com título,
  descrição, data, categoria (chips), sentimento (chips) e imagem de capa
  (`ImagePicker`).
- **`TimelineScreen` reescrita**: linha do tempo real, agrupada por mês/ano.
- **`HomeScreen` atualizada**: estado vazio elegante, contagem total, atalho
  rápido para criar e últimas memórias guardadas.
- **Novos componentes reutilizáveis** em `src/components/ui/`: `Chip`,
  `ConfirmDialog`, `ImagePicker`.
- **Novos componentes de domínio** em `src/components/memories/`:
  `MemoryCard`, `MemoryBadges`.
- **Utilitários novos**: `src/utils/date.ts`, `src/utils/memoryMeta.ts`.
- Variante `danger` adicionada ao componente `Button`.
- Slot `leading` adicionado ao `ScreenHeader`.

### Não incluído nesta etapa (propositalmente)

- Nenhuma captura de vídeo, áudio ou câmera.
- Nenhuma localização geográfica real.
- Nenhuma sincronização, backend, API, banco de dados online ou login.
- Nenhuma busca ou filtro avançado na Timeline.

## [Etapa 2] — Interface Premium

Refinamento visual completo sobre a fundação da Etapa 1: microinterações
(ripple discreto, hover, tap), tela de carregamento na entrada, texturas e
brilhos mais ricos, transições de tela com leve profundidade. Nenhuma
funcionalidade nova.

## [Etapa 1] — Fundação

Estrutura profissional do projeto, Design System "Twilight & Candlelight"
completo, componentes base (UI e layout), navegação interna entre telas e as
5 telas iniciais sem funcionalidade real.
