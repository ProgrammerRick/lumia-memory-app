# ARCHITECTURE — Lumia

## 1. Visão geral

O Lumia é uma SPA (Single Page Application) construída com React + Vite +
TypeScript, estilizada com Tailwind CSS v4, animada com Framer Motion e
iconografada com Lucide React.

Não há backend, autenticação ou API nesta fase — tudo é front-end puro. A
partir da Etapa 3, o app ganhou sua primeira camada real de dados: um
**sistema de memórias com persistência local** (`localStorage`), organizado
por trás de uma camada de serviço para poder ser substituída no futuro (por
exemplo, SQLite ou um backend/nuvem) sem alterar nenhuma tela.

A navegação entre telas continua feita por um **estado de navegação interno**
(`NavigationContext`), não por rotas de URL — o Lumia se comporta como um
aplicativo, não como um site com páginas indexáveis.

## 2. Estrutura de pastas

```
lumia/
├── docs/                       # Documentação viva do projeto
├── archive/                    # Reservado para versões antigas do projeto
├── public/
│   └── images/                 # Imagens estáticas (backgrounds, ícone do app)
├── src/
│   ├── components/
│   │   ├── layout/              # Estrutura/casca do app (shell, navegação, transições)
│   │   │   ├── AppShell.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── ScreenTransition.tsx
│   │   ├── ui/                  # Design System — componentes reutilizáveis e "burros"
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx              # novo — Etapa 3
│   │   │   ├── ConfirmDialog.tsx      # novo — Etapa 3
│   │   │   ├── EmptyState.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── ImagePicker.tsx        # novo — Etapa 3
│   │   │   ├── Logo.tsx
│   │   │   └── ScreenHeader.tsx
│   │   └── memories/             # novo — Etapa 3: componentes visuais do domínio de memórias
│   │       ├── MemoryBadges.tsx
│   │       └── MemoryCard.tsx
│   ├── context/
│   │   ├── NavigationContext.tsx  # Estado global de navegação (tela ativa + parâmetros)
│   │   ├── MemoriesContext.tsx     # novo — Etapa 3: estado de domínio das memórias (CRUD)
│   │   └── ToastContext.tsx         # novo — Etapa 3: feedback visual (salvar/excluir)
│   ├── services/
│   │   └── storage/
│   │       └── memoryStorage.ts      # novo — Etapa 3: camada de persistência (localStorage hoje)
│   ├── screens/                   # Uma pasta plana por tela principal do app
│   │   ├── WelcomeScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CreateMemoryScreen.tsx     # reescrita — Etapa 3: formulário real (criar/editar)
│   │   ├── TimelineScreen.tsx          # reescrita — Etapa 3: linha do tempo real
│   │   ├── MemoryDetailScreen.tsx       # novo — Etapa 3: visualização/edição/exclusão
│   │   └── SettingsScreen.tsx
│   ├── types/
│   │   ├── navigation.ts           # Tipos de navegação (AppScreen, params)
│   │   └── memory.ts                # novo — Etapa 3: modelo de dados de Memória
│   ├── utils/
│   │   ├── cn.ts                    # Helper de composição de classes
│   │   ├── date.ts                   # novo — Etapa 3: formatação e agrupamento por data
│   │   └── memoryMeta.ts              # novo — Etapa 3: opções de categoria/sentimento
│   ├── App.tsx                    # Composição raiz: providers + shell + AnimatePresence
│   ├── main.tsx                   # Bootstrap do React
│   └── index.css                  # Design System: tokens Tailwind v4 (@theme) + utilitários
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## 3. Fluxo da aplicação

1. `main.tsx` monta `<App />` no elemento `#root`.
2. `App.tsx` envolve tudo em `NavigationProvider` → `MemoriesProvider` →
   `ToastProvider` e renderiza `LumiaApp`.
3. `LumiaApp` exibe brevemente um véu de carregamento (`AppLoader`,
   puramente visual) e então renderiza a tela correspondente dentro de
   `AppShell`, usando `AnimatePresence` + `ScreenTransition`.
4. `BottomNav` é exibido em todas as telas, exceto `welcome` e
   `memory-detail` (tela de destino contextual, sem aba própria).
5. Cada tela consome os dados de memórias através do hook `useMemories()`
   (exportado por `MemoriesContext`), nunca acessando `localStorage`
   diretamente.

## 4. Modelo de dados e persistência (Etapa 3)

- `src/types/memory.ts` define `Memory` e `MemoryInput`. O tipo `Memory` já
  reserva campos opcionais (`videoUrl`, `audioUrl`, `location`,
  `syncStatus`) para as etapas futuras de vídeo/áudio, localização e
  sincronização — **não implementados ainda**, apenas modelados.
- `src/services/storage/memoryStorage.ts` define a interface
  `MemoryRepository` (`list`, `getById`, `create`, `update`, `remove`) e uma
  implementação local `LocalStorageMemoryRepository`. Qualquer substituição
  futura de armazenamento (SQLite, backend, nuvem) deve apenas implementar
  essa mesma interface — nenhuma tela ou componente depende diretamente do
  `localStorage`.
- `src/context/MemoriesContext.tsx` expõe `useMemories()`, o único ponto de
  acesso das telas ao estado de memórias (lista reativa + `createMemory`,
  `updateMemory`, `deleteMemory`, `getMemory`).
- Imagens de capa são guardadas como *data URL* (base64) diretamente no
  registro da memória. É uma solução simples e adequada ao armazenamento
  local desta fase; deverá ser revista ao introduzir armazenamento em
  arquivo/nuvem nas etapas futuras.

## 5. Navegação com parâmetros (Etapa 3)

- `NavigationContext` passou a aceitar um segundo argumento opcional em
  `navigate(screen, params)` e expõe `params` e `goBack()`.
- Isso permite abrir `"memory-detail"` com `{ memoryId }`, e reutilizar a
  tela `"create"` também como tela de edição quando recebe `{ memoryId }` de
  uma memória existente — sem precisar duplicar telas ou reescrever o
  contrato de navegação existente.

## 6. Padrões de código

- Componentes funcionais + hooks, sempre tipados com TypeScript.
- Um componente por arquivo, nome do arquivo igual ao nome do componente.
- Props tipadas via `interface` no topo do arquivo do componente.
- Comentários JSDoc curtos no topo de cada componente/tela.
- `cn()` (`utils/cn.ts`) usado sempre que uma classe precisar ser condicional
  ou mesclada com uma prop `className` externa.
- Sem gerenciador de estado global externo (Redux, Zustand, etc.) — o estado
  de domínio (memórias, navegação, toasts) vive em Context API nativa do
  React.

## 7. Preparado para o futuro

- `types/memory.ts` já modela campos de vídeo, áudio, localização e
  sincronização, prontos para serem preenchidos em etapas futuras sem
  quebrar o tipo existente.
- `MemoryRepository` foi desenhado como uma interface justamente para poder
  trocar `localStorage` por SQLite ou uma API remota sem alterar telas.
- `NavigationParams` é genérico o suficiente para ganhar novos campos
  (ex.: filtro inicial da Timeline) sem novas quebras de contrato.
- `ImagePicker` isola a escolha de mídia em um único componente, pronto para
  ganhar captura de câmera e seleção de vídeo nas próximas etapas.

## 8. Build e ferramentas

- Build tool: **Vite** (`@vitejs/plugin-react`, `vite-plugin-singlefile`).
- Estilo: **Tailwind CSS v4**, configurado via `@theme` em `src/index.css`.
- O build gera um `dist/index.html` com JS/CSS inline (single file), mais os
  assets de `public/` copiados normalmente.
