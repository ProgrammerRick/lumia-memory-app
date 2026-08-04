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

Na Etapa 5, nenhuma camada de dados mudou — a evolução foi inteiramente de
**comportamento e experiência**: uma nova tela de onboarding, um pequeno
utilitário de estado local (`utils/onboarding.ts`), estados de carregamento
(`isReady` em `MemoriesContext`) e reforços de acessibilidade em componentes
já existentes.

A navegação entre telas continua feita por um **estado de navegação interno**
(`NavigationContext`), não por rotas de URL.

## 2. Estrutura de pastas

```
lumia/
├── docs/                       # Documentação viva do projeto
├── public/
│   └── images/                 # Imagens estáticas (backgrounds, ícone do app)
├── src/
│   ├── components/
│   │   ├── layout/              # Estrutura/casca do app
│   │   │   ├── AppShell.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── ScreenTransition.tsx
│   │   ├── ui/                  # Design System — componentes reutilizáveis
│   │   │   ├── Button.tsx        # ganhou prop `loading` — Etapa 5
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
│   │   │   ├── MemoryCard.tsx
│   │   │   └── MemoryCardSkeleton.tsx  # novo — Etapa 5
│   │   └── media/                 # componentes visuais de mídia (Etapa 4)
│   │       ├── MediaPicker.tsx
│   │       ├── MediaGallery.tsx
│   │       └── MediaTypeIndicator.tsx
│   ├── context/
│   │   ├── NavigationContext.tsx
│   │   ├── MemoriesContext.tsx      # ganhou `isReady` — Etapa 5
│   │   └── ToastContext.tsx          # ganhou tipos `media`/`error` — Etapa 5
│   ├── services/
│   │   ├── storage/
│   │   │   └── memoryStorage.ts    # persistência local (localStorage)
│   │   └── media/
│   │       └── mediaService.ts     # leitura/validação de arquivos de mídia
│   ├── screens/
│   │   ├── WelcomeScreen.tsx        # decide onboarding vs. home — Etapa 5
│   │   ├── OnboardingScreen.tsx      # nova — Etapa 5
│   │   ├── HomeScreen.tsx             # estado de carregamento — Etapa 5
│   │   ├── CreateMemoryScreen.tsx      # botão com loading — Etapa 5
│   │   ├── TimelineScreen.tsx           # estado de carregamento — Etapa 5
│   │   ├── MemoryDetailScreen.tsx        # exclusão com loading — Etapa 5
│   │   └── SettingsScreen.tsx             # opção de rever onboarding — Etapa 5
│   ├── types/
│   │   ├── navigation.ts              # ganhou a tela "onboarding" — Etapa 5
│   │   └── memory.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── date.ts
│   │   ├── memoryMeta.ts
│   │   └── onboarding.ts               # novo — Etapa 5
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                        # + regra global `:focus-visible`
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
4. Na primeira visita, `WelcomeScreen` encaminha para `OnboardingScreen`
   (verificando `utils/onboarding.ts`); nas visitas seguintes, vai direto
   para `HomeScreen`.
5. `BottomNav` é exibido em todas as telas principais, exceto `welcome`,
   `onboarding` e `memory-detail`.
6. Cada tela consome os dados de memórias através do hook `useMemories()`
   (exportado por `MemoriesContext`), nunca acessando `localStorage`
   diretamente.

## 4. Modelo de dados e persistência

- `src/types/memory.ts` define `Memory` e `MemoryInput`, incluindo
  `media?: MediaItem[]` desde a Etapa 4.
- `src/services/storage/memoryStorage.ts` define a interface
  `MemoryRepository` e a implementação local `LocalStorageMemoryRepository`.
- `src/services/media/mediaService.ts` isola toda a lógica de leitura de
  arquivos do dispositivo.
- `src/context/MemoriesContext.tsx` expõe `useMemories()`, incluindo, desde a
  Etapa 5, a flag `isReady` (puramente de UI, não afeta a fonte de dados).
- `src/utils/onboarding.ts` (Etapa 5) guarda uma única flag booleana em
  `localStorage` (`lumia:onboarding-completed`) — nenhum dado pessoal, só um
  sinalizador de experiência já vista.

## 5. Navegação com parâmetros

- `NavigationContext` aceita um segundo argumento opcional em
  `navigate(screen, params)` e expõe `params` e `goBack()`.
- Desde a Etapa 5, `AppScreen` inclui a tela `"onboarding"`, tratada como uma
  tela de entrada única (sem navegação inferior), no mesmo espírito de
  `"welcome"`.

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

- `MemoryRepository` e `mediaService.ts` continuam isolando toda a
  persistência e leitura de arquivos, prontos para uma futura troca de
  armazenamento sem alterar telas.
- `NavigationParams` é genérico o suficiente para ganhar novos campos sem
  novas quebras de contrato.
- `utils/onboarding.ts` foi desenhado como um pequeno módulo independente,
  fácil de estender (ex.: onboarding reexibido após grandes atualizações)
  sem acoplar essa lógica a telas específicas.

## 8. Build e ferramentas

- Build tool: **Vite** (`@vitejs/plugin-react`, `vite-plugin-singlefile`).
- Estilo: **Tailwind CSS v4**, configurado via `@theme` em `src/index.css`.
- O build gera um `dist/index.html` com JS/CSS inline (single file), mais os
  assets de `public/` copiados normalmente.
