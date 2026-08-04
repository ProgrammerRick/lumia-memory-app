# AI_MEMORY — Lumia

> **Este é o documento mais importante do projeto.**
> Ele deve ser lido integralmente por qualquer IA (Claude ou outra) antes de
> iniciar trabalho em uma nova etapa/chat do Lumia. Ele deve ser **atualizado
> ao final de cada etapa**, sem exceção.

---

## 1. Resumo do projeto

Lumia é um aplicativo premium para guardar memórias pessoais (fotos, textos,
vídeos, áudios), com identidade visual nostálgica, elegante, minimalista e
tranquila. Não é rede social nem app de notas. Evolui sempre a partir da
versão existente, nunca recriado do zero.

Ver detalhes completos em `docs/PRODUCT_VISION.md`.

## 2. Estado atual do projeto

**Etapa concluída: 4 — Memórias Multimídia.**

O projeto contém, até agora:

- Estrutura de pastas profissional (ver seção 6).
- Design System "Twilight & Candlelight" completo (cores, tipografia,
  glass, sombras, animações) — **inalterado nesta etapa**.
- Sistema de navegação interno entre telas (sem router externo), capaz de
  carregar parâmetros (`navigate(screen, { memoryId })`) e de voltar
  (`goBack()`).
- **Sistema de memórias funcional e completo** (Etapa 3): modelo de dados,
  armazenamento local via `localStorage` isolado atrás de
  `MemoryRepository`, estado de domínio compartilhado (`MemoriesContext`),
  CRUD completo com confirmação segura, feedback via `ToastContext`, Home e
  Timeline com dados reais.
- **Suporte a multimídia (Etapa 4, nova nesta sessão)**:
  - Uma memória pode carregar um array `media: MediaItem[]` — cada item com
    `id`, `type` (`"image" | "video" | "audio"`), `url` (data URL), `name`,
    `size` e `createdAt`.
  - Nova camada `src/services/media/mediaService.ts`: leitura de arquivos
    (`FileReader` → data URL), checagem de tamanho máximo (15 MB/arquivo),
    formatação de tamanho de arquivo. Nenhuma tela lê arquivos diretamente.
  - Novos componentes em `src/components/media/`: `MediaPicker` (anexar
    foto/vídeo/áudio, reaproveitando `Chip`), `MediaGallery` (grade de
    fotos/vídeos + lista de players de áudio, reaproveitando `GlassCard`),
    `MediaTypeIndicator` (ícones discretos no `MemoryCard`).
  - `CreateMemoryScreen` ganhou a seção "Fotos, vídeos e áudios" (mesmo
    padrão visual das demais seções do formulário).
  - `MemoryDetailScreen` ganhou a galeria de mídia, exibida após a
    descrição.
  - `MemoryCard` (Home/Timeline) ganhou indicador discreto de mídia, sem
    alterar layout, tamanho ou estilo.
  - **Nenhuma gravação real de câmera/microfone** — apenas seleção de
    arquivos já existentes no dispositivo, como já acontecia com a imagem
    de capa desde a Etapa 3. Isso é esperado e intencional.
- Nenhuma persistência em nuvem, nenhuma API, nenhuma autenticação ainda
  existe — isso é esperado e intencional nesta fase.

## 3. Tecnologias e bibliotecas (contrato — NÃO ALTERAR)

- React 19 + Vite 7 + TypeScript.
- Tailwind CSS v4 (configuração 100% em CSS via `@theme`, em
  `src/index.css`; **não existe** `tailwind.config.js` e não deve ser criado).
- Framer Motion — todas as animações do projeto.
- Lucide React — todos os ícones do projeto (incluindo os novos ícones de
  mídia: `Camera`, `Video`, `Mic`, `Image`, `Music`, usados na Etapa 4).
- `clsx` + `tailwind-merge` (via helper `src/utils/cn.ts`).
- Nenhuma biblioteca nova foi adicionada na Etapa 4 além das já previstas no
  contrato — apenas novos ícones da mesma biblioteca `lucide-react` já
  usada desde a Etapa 1.

**Proibido:** Next.js, React Native, Expo, Angular, Vue, Svelte, Electron,
react-router (ou qualquer router de URL), Redux/Zustand ou qualquer
gerenciador de estado global externo, Firebase, Supabase, backend, API
externa, login/autenticação, pagamentos.

## 4. Padrões de código adotados

- Componentes funcionais + hooks, sempre tipados em TypeScript.
- Um componente por arquivo, nome do arquivo = nome do componente.
- Interfaces de props declaradas no topo de cada arquivo de componente.
- Comentário JSDoc curto no topo de cada componente/tela/serviço explicando
  seu propósito.
- Estilização via classes Tailwind + tokens do Design System; `cn()` para
  classes condicionais/mescladas.
- Acesso a dados **sempre** via `src/services/storage/` e
  `src/context/MemoriesContext.tsx` — nunca `localStorage` direto de dentro
  de uma tela ou componente.
- Acesso a arquivos de mídia **sempre** via `src/services/media/` — nunca
  `FileReader` direto de dentro de uma tela ou componente (regra nova da
  Etapa 4, mesmo espírito da regra de armazenamento).
- Microinterações (ripple, hover, tap) ficam encapsuladas dentro do próprio
  componente reutilizável (`Button`, `IconButton`, `GlassCard`).

## 5. Estrutura de pastas existente (não reorganizar sem necessidade)

```
docs/                 # Documentação viva
archive/               # Reservado para versões antigas (vazio)
public/
  images/
    welcome-bg.jpg     # Background da tela Welcome
    lumia-icon.png      # Ícone do app — favicon/apple-touch-icon
src/
  components/
    layout/
      AppShell.tsx
      BottomNav.tsx
      ScreenTransition.tsx
    ui/
      Button.tsx            # variantes: primary | glass | ghost | danger
      Chip.tsx               # seleção em pílula (categoria/sentimento/mídia)
      ConfirmDialog.tsx       # confirmação de ações destrutivas
      EmptyState.tsx
      GlassCard.tsx
      IconButton.tsx
      ImagePicker.tsx          # seleção de imagem de capa da galeria
      Logo.tsx
      ScreenHeader.tsx          # com slot `leading` opcional
    memories/
      MemoryBadges.tsx           # CategoryBadge, FeelingBadge
      MemoryCard.tsx               # + MediaTypeIndicator — Etapa 4
    media/                          # NOVO — Etapa 4
      MediaPicker.tsx                # atalhos para anexar foto/vídeo/áudio
      MediaGallery.tsx                # grade/lista de mídias anexadas
      MediaTypeIndicator.tsx           # ícones discretos no MemoryCard
  context/
    NavigationContext.tsx      # useNavigation() -> screen, previousScreen, params, navigate, goBack
    MemoriesContext.tsx          # useMemories() -> memories, createMemory, updateMemory, deleteMemory, getMemory
    ToastContext.tsx              # useToast() -> showToast(message, kind)
  services/
    storage/
      memoryStorage.ts            # MemoryRepository + LocalStorageMemoryRepository (persiste `media` também)
    media/                          # NOVO — Etapa 4
      mediaService.ts                # createMediaItem, isMediaFileTooLarge, formatFileSize, countMediaByType
  screens/
    WelcomeScreen.tsx
    HomeScreen.tsx                # memórias reais + estado vazio
    CreateMemoryScreen.tsx         # formulário real (criar E editar) + seção de mídia — Etapa 4
    TimelineScreen.tsx              # linha do tempo real, agrupada por mês
    MemoryDetailScreen.tsx           # visualizar/editar/excluir + galeria de mídia — Etapa 4
    SettingsScreen.tsx
  types/
    navigation.ts                  # AppScreen, TabScreen, TAB_SCREENS, NavigationParams
    memory.ts                       # Memory, MemoryCategory, MemoryFeeling, MemoryInput, MediaItem, MediaType (Etapa 4)
  utils/
    cn.ts
    date.ts                         # formatMemoryDate, groupMemoriesByMonth, todayIso
    memoryMeta.ts                    # CATEGORY_OPTIONS, FEELING_OPTIONS
  App.tsx                           # Providers: Navigation > Memories > Toast
  main.tsx
  index.css
```

Documentos em `docs/`: `PROJECT_RULES.md`, `PRODUCT_VISION.md`,
`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md`,
`AI_MEMORY.md` (este arquivo).

## 6. Funcionalidades prontas

- Navegação completa entre telas com transições animadas e suporte a
  parâmetros (ex.: abrir uma memória específica).
- Design System visual completo e consistente — **sem nenhuma alteração
  nesta etapa**.
- Layout responsivo (vitrine em telas grandes, tela cheia em mobile),
  testado de 320px a 1024px.
- **Sistema de memórias completo**: criar, editar, visualizar em detalhe,
  excluir (com confirmação), imagem de capa da galeria, categorias,
  sentimentos, datas.
- **Sistema de mídia completo (Etapa 4)**: anexar múltiplas fotos, vídeos e
  áudios a uma memória; visualizar fotos e vídeos em grade; reproduzir
  vídeos e áudios; remover itens de mídia durante a edição; indicador visual
  discreto de mídia nos cartões de Home/Timeline.
- Home com estado vazio elegante e, quando há dados, contagem + últimas
  memórias + atalho rápido para criar.
- Timeline real, agrupada por mês, com marcador visual de linha do tempo.
- Feedback visual (toast) ao salvar e ao excluir.

## 7. Funcionalidades futuras (não implementar antes da hora)

Ver `docs/ROADMAP.md`. Resumo rápido:

- Etapa 5: busca, filtros (inclusive por tipo de mídia) e organização
  avançada.
- Etapa 6: conta, autenticação, backend, sincronização (incluindo mídia).
- Etapa 7: polimento final, acessibilidade, performance, lançamento.

## 8. O que NÃO pode ser alterado sem autorização explícita

- A stack tecnológica definida na seção 3.
- A identidade de produto: não virar rede social, não virar app de notas.
- O tema visual "Twilight & Candlelight" definido em `docs/DESIGN_SYSTEM.md`.
- A navegação por estado interno (`NavigationContext`) em vez de router de URL.
- A estrutura de pastas descrita na seção 5 / `docs/ARCHITECTURE.md`.
- O contrato `MemoryRepository` — qualquer nova forma de persistência deve
  implementá-lo, não substituí-lo por acesso direto a dados dentro das telas.
- O contrato de `mediaService.ts` — qualquer nova forma de leitura/upload de
  arquivos (Etapa 4+) deve passar por essa camada, nunca por acesso direto a
  `FileReader`/inputs dentro das telas.

## 9. Erros/armadilhas já identificados (evitar repetir)

- O projeto usa **Tailwind v4 com configuração CSS-first** (`@theme` em
  `src/index.css`). **Não criar** `tailwind.config.js`.
- Os arquivos de mídia (data URL base64) podem ficar grandes; por isso a
  Etapa 4 aplicou um limite de 15 MB por arquivo em `mediaService.ts`. Se
  uma etapa futura permitir arquivos maiores, considerar seriamente migrar
  a persistência para `IndexedDB` em vez de `localStorage` (que tem limite
  de alguns MB por origem).
- Ao adicionar um novo tipo de mídia ou metadado, sempre estender
  `MediaItem` em `types/memory.ts` em vez de criar um tipo paralelo.
