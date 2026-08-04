# CHANGELOG — Lumia

Todas as mudanças relevantes do projeto são registradas aqui, por etapa.

## [Etapa 3] — Sistema de Memórias (esta etapa)

> Primeira etapa de **funcionalidade real** do produto. O Lumia deixa de ser
> apenas uma interface e passa a permitir que o usuário guarde, edite,
> visualize e apague suas próprias memórias, localmente no dispositivo.

### Adicionado

- **Modelo de dados** `src/types/memory.ts`: interface `Memory` com `id`,
  `title`, `description`, `date`, `category`, `feeling`, `coverImage`,
  `createdAt` e `updatedAt`, além de campos reservados (não implementados)
  para vídeo, áudio, localização e status de sincronização, preparando o
  tipo para as próximas etapas sem precisar quebrá-lo depois.
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
  de uma memória (imagem, título, texto, data, categoria, sentimento), com
  ações de editar e excluir (com confirmação segura via `ConfirmDialog`).
- **`CreateMemoryScreen` reescrita**: formulário real com título,
  descrição, data, categoria (chips), sentimento (chips) e imagem de capa
  (`ImagePicker`, seleção da galeria do dispositivo). Funciona tanto para
  criar quanto para editar uma memória existente, com validação simples do
  título e feedback de "Guardando...".
- **`TimelineScreen` reescrita**: linha do tempo real, com memórias
  agrupadas por mês/ano (mais recentes primeiro), marcador visual de linha
  do tempo e entrada animada e escalonada dos grupos/cartões.
- **`HomeScreen` atualizada**: estado vazio elegante quando não há
  memórias (com atalho para criar a primeira); com memórias, mostra a
  contagem total, atalho rápido para criar uma nova e as últimas memórias
  guardadas.
- **Novos componentes reutilizáveis** em `src/components/ui/`: `Chip`
  (seleção em pílula), `ConfirmDialog` (confirmação genérica de ações
  destrutivas), `ImagePicker` (seleção de imagem da galeria com
  pré-visualização).
- **Novos componentes de domínio** em `src/components/memories/`:
  `MemoryCard` (cartão reutilizado em Home e Timeline) e `MemoryBadges`
  (`CategoryBadge`, `FeelingBadge`).
- **Utilitários novos**: `src/utils/date.ts` (formatação de datas em
  português e agrupamento por mês) e `src/utils/memoryMeta.ts` (opções e
  metadados de categoria/sentimento).
- Variante `danger` adicionada ao componente `Button` para a ação de
  excluir memória, seguindo o mesmo contrato de props já existente.
- Slot `leading` adicionado ao `ScreenHeader` para suportar o botão de
  voltar da tela de detalhe, sem afetar as demais telas.

### Não incluído nesta etapa (propositalmente)

- Nenhuma captura de vídeo, áudio ou câmera (apenas seleção de imagem da
  galeria/dispositivo).
- Nenhuma localização geográfica real.
- Nenhuma sincronização, backend, API, banco de dados online ou login.
- Nenhuma busca ou filtro avançado na Timeline (reservado para a Etapa 5).

### Decisões técnicas importantes

- Toda a persistência local está isolada atrás da interface
  `MemoryRepository`, permitindo trocar `localStorage` por SQLite ou um
  backend no futuro sem alterar nenhuma tela ou componente.
- O estado de memórias vive em Context API nativa (`MemoriesContext`), sem
  introduzir gerenciador de estado externo, mantendo o padrão já usado por
  `NavigationContext`.
- Imagens de capa são guardadas como *data URL* (base64) dentro do próprio
  registro da memória — solução simples e suficiente para armazenamento
  local nesta fase; deve ser revista ao introduzir armazenamento em
  arquivo/nuvem.
- A tela "Criar memória" foi reaproveitada também para edição (via
  `params.memoryId`), evitando duplicar uma tela quase idêntica.
- Todos os componentes, cores, tipografia e animações seguem estritamente o
  Design System já estabelecido nas Etapas 1 e 2 — nenhum token novo de cor,
  fonte, raio ou sombra foi introduzido fora do já documentado (com exceção
  de `--color-lumia-rose`/`--color-lumia-sage`, adicionados para ações de
  exclusão e estados futuros, documentados em `DESIGN_SYSTEM.md`).

## [Etapa 2] — Interface Premium

### Melhorado

- **Logo**: halo cônico com rotação muito lenta (chama viva), núcleo com
  gradiente e sombras internas mais ricas.
- **Button** / **IconButton**: ripple discreto no toque, hierarquia visual
  mais refinada.
- **GlassCard**: elevação e brilho de borda suave no hover quando
  `interactive`.
- **ScreenHeader**: marcador visual (ponto dourado) ao lado do eyebrow.
- **EmptyState**: glow suave atrás do ícone flutuante.
- **AppShell**: friso de luz superior e textura de grão discreta.
- **BottomNav**: friso de luz superior, glow mais rico no botão "Criar" e
  brilho no ícone da aba ativa.
- **ScreenTransition**: leve escala somada ao fade + slide já existentes.
- **WelcomeScreen**: vinheta mais cinematográfica, glow pulsante atrás do
  botão principal.
- Nova tela de **carregamento elegante** (`AppLoader`) exibida ao abrir o
  app.
- Novas imagens de identidade visual para `public/images/`.
- `src/index.css`: regra de acessibilidade `prefers-reduced-motion`.

### Não incluído nesta etapa (propositalmente)

- Nenhum formulário funcional, nenhuma persistência de dados, nenhuma
  integração real com câmera/galeria/microfone, nenhum CRUD.

## [Etapa 1] — Fundação do projeto

### Adicionado

- Estrutura profissional de pastas (`docs/`, `archive/`, `src/components`,
  `src/context`, `src/screens`, `src/types`, `src/utils`).
- Documentação completa em `docs/`.
- Design System "Twilight & Candlelight" via Tailwind v4 (`@theme`).
- Sistema de navegação interno sem router externo.
- Componentes base do Design System e de layout.
- Telas iniciais: Welcome, Home, Criar Memória, Timeline, Configurações
  (todas sem funcionalidade real).
- Imagens geradas para a identidade visual inicial.

### Decisões técnicas importantes

- Navegação por estado interno (Context API), não por rotas de URL.
- Tema dark-first, sem modo claro nesta fase.
- Tailwind v4 configurado 100% via CSS (`@theme`), sem `tailwind.config.js`.
- `AppShell` apresenta o app dentro de uma "vitrine" em formato de telefone
  em telas largas.
