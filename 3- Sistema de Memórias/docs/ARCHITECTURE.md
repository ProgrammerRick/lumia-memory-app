# ARCHITECTURE — Lumia

## 1. Visão geral

O Lumia é uma SPA (Single Page Application) construída com React + Vite +
TypeScript, estilizada com Tailwind CSS v4, animada com Framer Motion e
iconografada com Lucide React. Não há backend, autenticação, banco de dados
ou API nesta fase — tudo é front-end puro, preparado para receber persistência
e integrações em etapas futuras.

A navegação entre telas é feita por um **estado de navegação interno**
(`NavigationContext`), não por rotas de URL. Isso é intencional: o Lumia se
comporta como um aplicativo (semelhante a um app nativo), não como um site
com páginas indexáveis.

## 2. Estrutura de pastas

```
lumia/
├── docs/                      # Documentação viva do projeto (ver README de cada arquivo)
├── archive/                   # Reservado para versões antigas do projeto (futuro)
├── public/
│   └── images/                # Imagens estáticas (backgrounds, ícone do app)
├── src/
│   ├── components/
│   │   ├── layout/            # Estrutura/casca do app (shell, navegação, transições)
│   │   │   ├── AppShell.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── ScreenTransition.tsx
│   │   └── ui/                 # Design System — componentes reutilizáveis e "burros"
│   │       ├── Button.tsx
│   │       ├── EmptyState.tsx
│   │       ├── GlassCard.tsx
│   │       ├── IconButton.tsx
│   │       ├── Logo.tsx
│   │       └── ScreenHeader.tsx
│   ├── context/
│   │   └── NavigationContext.tsx   # Estado global de navegação (tela ativa)
│   ├── screens/                # Uma pasta plana por tela principal do app
│   │   ├── WelcomeScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CreateMemoryScreen.tsx
│   │   ├── TimelineScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── types/
│   │   └── navigation.ts       # Tipos compartilhados de navegação
│   ├── utils/
│   │   └── cn.ts                # Helper de composição de classes (clsx + tailwind-merge)
│   ├── App.tsx                  # Composição raiz: providers + shell + AnimatePresence + loader de entrada
│   ├── main.tsx                 # Bootstrap do React
│   └── index.css                # Design System: tokens Tailwind v4 (@theme) + utilitários globais
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## 3. Fluxo da aplicação

1. `main.tsx` monta `<App />` no elemento `#root`.
2. `App.tsx` envolve tudo em `NavigationProvider` e renderiza `LumiaApp`.
3. `LumiaApp` exibe brevemente um véu de carregamento (`AppLoader`, puramente
   visual) e então:
   - Renderiza a tela correspondente dentro de `AppShell`, usando
     `AnimatePresence` + `ScreenTransition` para transições suaves.
   - Renderiza `BottomNav` em todas as telas exceto `welcome`.
4. Cada tela é um componente independente em `src/screens/`, sem
   conhecimento direto das outras — a navegação entre elas acontece apenas
   via `useNavigation().navigate(screen)`.

## 4. Padrões de código

- **Componentes funcionais + hooks**, sempre tipados com TypeScript.
- **Um componente por arquivo**, nome do arquivo igual ao nome do componente.
- **Props tipadas via `interface`** no topo do arquivo do componente.
- **Comentários JSDoc curtos** no topo de cada componente/tela explicando seu
  propósito e eventuais decisões não óbvias — manter esse padrão em todo
  código novo.
- **Nada de estilos inline arbitrários** fora de casos pontuais de gradientes
  dinâmicos (ex.: `Logo.tsx`, glows do `AppShell`) — preferir classes Tailwind
  e os tokens do Design System.
- **`cn()` (utils/cn.ts)** deve ser usado sempre que uma classe precisar ser
  condicional ou mesclada com uma prop `className` externa.
- **Sem gerenciador de estado global externo** (Redux, Zustand, etc.) nesta
  fase — o estado é local por componente ou via Context API nativa do React.
  Isso pode ser revisto em etapas futuras caso a complexidade exija.

## 5. Preparado para o futuro (decisões que sustentam o crescimento)

- `types/navigation.ts` já modela `AppScreen`/`TabScreen` de forma que novas
  telas (ex.: detalhe de memória, edição, onboarding avançado) possam ser
  adicionadas ao enum sem quebrar a navegação existente.
- `screens/` é uma pasta plana propositalmente simples; se uma tela crescer
  muito (ex.: `CreateMemoryScreen`), ela pode evoluir para uma subpasta
  própria (`screens/create-memory/`) com seus subcomponentes, sem afetar as
  demais.
- `components/ui/` é o único lugar que deve concentrar estilo visual
  reutilizável — qualquer funcionalidade futura (formulários, upload de
  mídia, player de áudio, etc.) deve consumir esses componentes base em vez
  de recriar estilos.
- Não há ainda camada de dados (`services/`, `hooks/data`, `store/`), pois
  nenhuma persistência existe nesta fase. Quando a Fase de armazenamento
  (LocalStorage, depois backend) for iniciada, recomenda-se criar:
  - `src/services/` — acesso a dados (LocalStorage hoje, API no futuro).
  - `src/hooks/` — hooks customizados de domínio (ex.: `useMemories`).
  - `src/types/memory.ts` — modelo de dados de uma "Memória".
- O `NavigationContext` foi escrito de forma simples e extensível de
  propósito — pode ganhar histórico de navegação (pilha) ou parâmetros por
  tela (ex.: abrir uma memória específica) sem precisar ser reescrito.

## 6. Build e ferramentas

- Build tool: **Vite** (`@vitejs/plugin-react`, `vite-plugin-singlefile`).
- Estilo: **Tailwind CSS v4**, configurado via `@theme` diretamente em
  `src/index.css` (abordagem "CSS-first" do Tailwind v4, sem
  `tailwind.config.js`).
- O build gera um `dist/index.html` com JS/CSS inline (single file), mais os
  assets de `public/` copiados normalmente (ex.: `dist/images/`).
