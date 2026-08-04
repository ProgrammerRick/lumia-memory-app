# ARCHITECTURE — Lumia

## 1. Visão geral

O Lumia é uma SPA (Single Page Application) construída com React + Vite +
TypeScript, estilizada com Tailwind CSS v4, animada com Framer Motion e
iconografada com Lucide React. Não há backend, autenticação ou API — tudo é
front-end puro, com persistência 100% local (`localStorage`).

A partir da Etapa 3, o app ganhou sua primeira camada real de dados: um
sistema de memórias com persistência local, organizado atrás de uma camada
de serviço para poder ser substituída no futuro (ex.: SQLite ou nuvem) sem
alterar nenhuma tela.

Na Etapa 4, o modelo de memória evoluiu para carregar também **mídia**
(imagens, vídeos e áudios), mantendo o mesmo princípio: a lógica de leitura e
conversão de arquivos vive em uma camada de serviço isolada
(`src/services/media/`), nunca dentro das telas.

A navegação entre telas continua feita por um **estado de navegação interno**
(`NavigationContext`), não por rotas de URL.

## 2. Estrutura de pastas

```
lumia/
├── docs/                       # Documentação viva do projeto
├── archive/                    # Reservado para versões antigas do projeto
├── public/
│   └── images/                 # Imagens estáticas (backgrounds, ícone do app)
├── src/
│   ├── components/
│   │   ├── layout/              # Estrutura/casca do app
│   │   │   ├── AppShell.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── ScreenTransition.tsx
│   │   ├── ui/                  # Design System — componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── ImagePicker.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── ScreenHeader.tsx
│   │   ├── memories/             # Componentes visuais do domínio de memórias
│   │   │   ├── MemoryBadges.tsx
│   │   │   └── MemoryCard.tsx     # ganhou indicador de mídia — Etapa 4
│   │   └── media/                 # novo — Etapa 4: componentes visuais de mídia
│   │       ├── MediaPicker.tsx
│   │       ├── MediaGallery.tsx
│   │       └── MediaTypeIndicator.tsx
│   ├── context/
│   │   ├── NavigationContext.tsx
│   │   ├── MemoriesContext.tsx
│   │   └── ToastContext.tsx
│   ├── services/
│   │   ├── storage/
│   │   │   └── memoryStorage.ts    # persistência local (localStorage)
│   │   └── media/                  # novo — Etapa 4
│   │       └── mediaService.ts     # leitura/validação de arquivos de mídia
│   ├── screens/
│   │   ├── WelcomeScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CreateMemoryScreen.tsx   # ganhou seção de mídia — Etapa 4
│   │   ├── TimelineScreen.tsx
│   │   ├── MemoryDetailScreen.tsx    # ganhou galeria de mídia — Etapa 4
│   │   └── SettingsScreen.tsx
│   ├── types/
│   │   ├── navigation.ts
│   │   └── memory.ts                  # ganhou MediaItem/MediaType — Etapa 4
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── date.ts
│   │   └── memoryMeta.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## 3. Fluxo da aplicação

1. `main.tsx` monta `<App />` no elemento `#root`.
2. `App.tsx` envolve tudo em `NavigationProvider` → `MemoriesProvider` →
   `ToastProvider` e renderiza `LumiaApp`.
3. `LumiaApp` exibe brevemente um véu de carregamento (`AppLoader`) e então
   renderiza a tela correspondente dentro de `AppShell`, usando
   `AnimatePresence` + `ScreenTransition`.
4. `BottomNav` é exibido em todas as telas, exceto `welcome` e
   `memory-detail`.
5. Cada tela consome os dados de memórias através do hook `useMemories()`
   (exportado por `MemoriesContext`), nunca acessando `localStorage`
   diretamente.

## 4. Modelo de dados e persistência

- `src/types/memory.ts` define `Memory` e `MemoryInput`. Desde a Etapa 4, o
  tipo `Memory` inclui `media?: MediaItem[]`, onde `MediaItem` modela
  `{ id, type, url, name, size, createdAt }` — `type` é `"image" | "video" |
  "audio"` e `url` é uma data URL (base64), no mesmo espírito da
  `coverImage` já existente desde a Etapa 3.
- `src/services/storage/memoryStorage.ts` define a interface
  `MemoryRepository` (`list`, `getById`, `create`, `update`, `remove`) e uma
  implementação local `LocalStorageMemoryRepository`. O array `media` é
  persistido como parte do próprio registro da memória, sem exigir uma
  tabela/coleção separada nesta fase.
- `src/services/media/mediaService.ts` (novo — Etapa 4) isola toda a lógica
  de leitura de arquivos do dispositivo: conversão para data URL
  (`FileReader`), geração de identificadores, e checagem simples de tamanho.
  Nenhuma tela lê arquivos diretamente — todas passam por este serviço.
- `src/context/MemoriesContext.tsx` expõe `useMemories()`, o único ponto de
  acesso das telas ao estado de memórias.
- Imagens de capa e itens de mídia são guardados como *data URL* (base64)
  diretamente no registro da memória — solução simples e adequada ao
  armazenamento local desta fase; deverá ser revista ao introduzir
  armazenamento em arquivo/nuvem nas etapas futuras.

## 5. Navegação com parâmetros

- `NavigationContext` aceita um segundo argumento opcional em
  `navigate(screen, params)` e expõe `params` e `goBack()`.
- Isso permite abrir `"memory-detail"` com `{ memoryId }`, e reutilizar a
  tela `"create"` também como tela de edição quando recebe `{ memoryId }` de
  uma memória existente.

## 6. Padrões de código

- Componentes funcionais + hooks, sempre tipados com TypeScript.
- Um componente por arquivo, nome do arquivo igual ao nome do componente.
- Props tipadas via `interface` no topo do arquivo do componente.
- Comentários JSDoc curtos no topo de cada componente/tela.
- `cn()` (`utils/cn.ts`) usado sempre que uma classe precisar ser condicional
  ou mesclada com uma prop `className` externa.
- Sem gerenciador de estado global externo — o estado de domínio vive em
  Context API nativa do React.

## 7. Preparado para o futuro

- `MemoryRepository` foi desenhado como uma interface justamente para poder
  trocar `localStorage` por SQLite ou uma API remota sem alterar telas.
- `mediaService.ts` isola a leitura de arquivos para que, no futuro, upload
  para nuvem/backend possa substituir a conversão em data URL sem alterar
  telas ou componentes de mídia.
- `NavigationParams` é genérico o suficiente para ganhar novos campos sem
  novas quebras de contrato.

## 8. Build e ferramentas

- Build tool: **Vite** (`@vitejs/plugin-react`, `vite-plugin-singlefile`).
- Estilo: **Tailwind CSS v4**, configurado via `@theme` em `src/index.css`.
- O build gera um `dist/index.html` com JS/CSS inline (single file), mais os
  assets de `public/` copiados normalmente.
