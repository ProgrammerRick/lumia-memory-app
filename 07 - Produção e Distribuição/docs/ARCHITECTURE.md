# ARCHITECTURE — Lumia

## 1. Visão geral

O Lumia é uma SPA (Single Page Application) construída com React + Vite +
TypeScript, estilizada com Tailwind CSS v4, animada com Framer Motion e
iconografada com Lucide React. Não há backend, autenticação ou API — tudo é
front-end puro, com persistência 100% local (`localStorage`).

O app possui um sistema de memórias com persistência local, organizado atrás
de uma camada de serviço para poder ser substituída no futuro (ex.: SQLite ou
nuvem) sem alterar nenhuma tela. O modelo de memória também carrega **mídia**
(imagens, vídeos e áudios), mantendo o mesmo princípio: a lógica de leitura e
conversão de arquivos vive em uma camada de serviço isolada
(`src/services/media/`), nunca dentro das telas.

A navegação entre telas é feita por um **estado de navegação interno**
(`NavigationContext`), não por rotas de URL.

A Etapa 6 não alterou nenhuma camada de dados nem a estrutura de pastas — foi
uma etapa de revisão de qualidade (tratamento de erros, responsividade,
organização de código) sobre a arquitetura já existente.

## 2. Estrutura de pastas

```
lumia/
├── docs/                        # Documentação viva do projeto
├── public/
│   └── images/                  # Imagens estáticas (background, ícone)
├── src/
│   ├── components/
│   │   ├── layout/               # Estrutura/casca do app
│   │   │   ├── AppShell.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── ScreenTransition.tsx
│   │   ├── ui/                   # Design System — componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── ImagePicker.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── ScreenHeader.tsx
│   │   ├── memories/              # Componentes visuais do domínio de memórias
│   │   │   ├── MemoryBadges.tsx
│   │   │   ├── MemoryCard.tsx
│   │   │   └── MemoryCardSkeleton.tsx
│   │   └── media/                 # Componentes visuais de mídia
│   │       ├── MediaPicker.tsx
│   │       ├── MediaGallery.tsx
│   │       └── MediaTypeIndicator.tsx
│   ├── context/
│   │   ├── NavigationContext.tsx
│   │   ├── MemoriesContext.tsx
│   │   └── ToastContext.tsx
│   ├── services/
│   │   ├── storage/
│   │   │   └── memoryStorage.ts   # persistência local (localStorage)
│   │   └── media/
│   │       └── mediaService.ts    # leitura/validação de arquivos de mídia
│   ├── screens/
│   │   ├── WelcomeScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CreateMemoryScreen.tsx
│   │   ├── TimelineScreen.tsx
│   │   ├── MemoryDetailScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── types/
│   │   ├── navigation.ts
│   │   └── memory.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── date.ts
│   │   ├── memoryMeta.ts
│   │   └── onboarding.ts
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
  `media?: MediaItem[]`.
- `src/services/storage/memoryStorage.ts` define a interface
  `MemoryRepository` e a implementação local `LocalStorageMemoryRepository`,
  com leitura defensiva (valida a forma dos dados) e escrita protegida por
  `try/catch`, reforçadas na Etapa 6.
- `src/services/media/mediaService.ts` isola toda a lógica de leitura de
  arquivos do dispositivo.
- `src/context/MemoriesContext.tsx` expõe `useMemories()`, incluindo a flag
  `isReady` (puramente de UI, não afeta a fonte de dados).
- `src/utils/onboarding.ts` guarda uma única flag booleana em `localStorage`
  (`lumia:onboarding-completed`) — nenhum dado pessoal, só um sinalizador de
  experiência já vista.

## 5. Navegação com parâmetros

- `NavigationContext` aceita um segundo argumento opcional em
  `navigate(screen, params)` e expõe `params` e `goBack()`.
- `AppScreen` inclui a tela `"onboarding"`, tratada como uma tela de entrada
  única (sem navegação inferior), no mesmo espírito de `"welcome"`.

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

## 8. Build e ferramentas

- Build tool: **Vite** (`@vitejs/plugin-react`, `vite-plugin-singlefile`).
- Estilo: **Tailwind CSS v4**, configurado via `@theme` em `src/index.css`.
- O build gera um `dist/index.html` com JS/CSS inline (single file), mais os
  assets de `public/` copiados normalmente.
