# CHANGELOG — Lumia

Todas as mudanças relevantes do projeto são registradas aqui, por etapa.

## [Etapa 1.1] — Refinamento visual premium (esta etapa)

> Etapa **exclusivamente visual**. Nenhuma funcionalidade nova, nenhum
> sistema novo, nenhuma persistência, nenhuma captura de mídia real e
> nenhum CRUD foram introduzidos. O objetivo foi elevar o acabamento visual
> de tudo o que já existia na Etapa 1, mantendo intactas a arquitetura, a
> stack e a navegação.

### Melhorado

- **Logo**: halo cônico com rotação muito lenta (chama viva), núcleo com
  gradiente e sombras internas mais ricas.
- **Button**: ripple discreto no toque, anel interno sutil no variant
  `primary`, hierarquia visual mais refinada.
- **IconButton**: ripple discreto no toque, mantendo o mesmo contrato de props.
- **GlassCard**: elevação e brilho de borda suave no hover quando `interactive`.
- **ScreenHeader**: marcador visual (ponto dourado) ao lado do eyebrow para
  reforçar a hierarquia tipográfica.
- **EmptyState**: glow suave atrás do ícone flutuante.
- **AppShell**: friso de luz superior na "vitrine" desktop e textura de grão
  discreta (nostalgia/filme) sobre toda a moldura do app.
- **BottomNav**: friso de luz superior, glow mais rico no botão "Criar" e
  brilho (`drop-shadow`) no ícone da aba ativa.
- **ScreenTransition**: leve escala somada ao fade + slide já existentes,
  para uma sensação de profundidade mais premium entre as telas.
- **WelcomeScreen**: vinheta mais cinematográfica, glow pulsante atrás do
  botão principal, entrada da imagem de fundo com fade + zoom sutil.
- **CreateMemoryScreen**: cards de formato agora são `interactive` (resposta
  de hover/tap) e o ícone de cada card ganhou um glow sutil.
- **SettingsScreen**: linhas de configuração com destaque de hover (fundo,
  cor do ícone e deslocamento discreto do chevron).
- Nova tela de **carregamento elegante** (`AppLoader`, em `App.tsx`) exibida
  por ~0,9s ao abrir o app — puramente visual, sem lógica de dados.
- Novas imagens de identidade visual geradas para `public/images/`
  (`lumia-icon.png` e `welcome-bg.jpg`), seguindo a paleta "Twilight &
  Candlelight".
- `src/index.css`: regra de acessibilidade `prefers-reduced-motion` para
  não prejudicar usuários sensíveis a movimento nem a performance.

### Não incluído nesta etapa (propositalmente)

- Nenhum formulário funcional.
- Nenhuma persistência de dados (LocalStorage, banco de dados).
- Nenhuma integração com câmera, galeria ou microfone reais.
- Nenhuma IA ou API externa.
- Nenhum sistema de login/autenticação.
- Nenhuma mudança de arquitetura, de stack ou de estrutura de pastas.

### Decisões técnicas importantes

- Todas as melhorias foram feitas **dentro** dos componentes/telas já
  existentes — nenhum arquivo foi renomeado, movido ou removido.
- O ripple de toque foi implementado localmente em `Button` e `IconButton`
  (estado local `ripples`), sem novas dependências e sem novo "sistema"
  global de feedback.
- A tela de carregamento inicial é um efeito puramente visual (estado local
  `isLoading` com `setTimeout` em `App.tsx`), sem qualquer lógica de dados
  ou navegação associada.

## [Etapa 1] — Fundação do projeto

### Adicionado

- Estrutura profissional de pastas (`docs/`, `archive/`, `src/components`,
  `src/context`, `src/screens`, `src/types`, `src/utils`).
- Documentação completa em `docs/`: `PROJECT_RULES.md`, `PRODUCT_VISION.md`,
  `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md`,
  `AI_MEMORY.md`.
- `archive/README.md` explicando o propósito futuro da pasta.
- Design System "Twilight & Candlelight": paleta de cores, tipografia
  (sistema + serif), espaçamentos, sombras, bordas, glassmorphism e
  animações, implementado via Tailwind v4 (`@theme` em `src/index.css`).
- Instalação das bibliotecas definitivas do contrato: `framer-motion` e
  `lucide-react`.
- Sistema de navegação interno sem router externo:
  `src/context/NavigationContext.tsx` + `src/types/navigation.ts`.
- Componentes base do Design System (`src/components/ui/`): `Logo`, `Button`,
  `GlassCard`, `IconButton`, `ScreenHeader`, `EmptyState`.
- Componentes de layout (`src/components/layout/`): `AppShell` (moldura do
  app com vitrine em formato de telefone em telas grandes), `BottomNav`
  (navegação inferior com indicador animado e botão de destaque "Criar"),
  `ScreenTransition` (transições de entrada/saída de tela).
- Telas iniciais (`src/screens/`):
  - `WelcomeScreen` — tela de entrada com imagem gerada, logo animado e CTA.
  - `HomeScreen` — estado vazio elegante, saudação dinâmica por horário.
  - `CreateMemoryScreen` — prévia visual dos formatos futuros (foto, vídeo,
    áudio, texto), sem funcionalidade real.
  - `TimelineScreen` — estado vazio da linha do tempo.
  - `SettingsScreen` — estrutura de grupos de configurações (Conta,
    Preferências, Segurança, Sobre), sem funcionalidade real.
- Imagens geradas para a identidade visual inicial:
  `public/images/welcome-bg.jpg` (fundo nostálgico da tela Welcome) e
  `public/images/lumia-icon.png` (ícone do app / favicon).
- `index.html` atualizado com título, meta description, tema de cor escuro,
  favicon e metatags para comportamento de app (viewport-fit, apple-mobile-
  web-app).

### Não incluído nesta etapa (propositalmente)

- Nenhum formulário funcional.
- Nenhuma persistência de dados (LocalStorage, banco de dados).
- Nenhuma integração com câmera, galeria ou microfone reais.
- Nenhuma IA ou API externa.
- Nenhum sistema de login/autenticação.

### Decisões técnicas importantes

- Navegação por estado interno (Context API), não por rotas de URL — reforça
  a identidade de "aplicativo" do Lumia.
- Tema dark-first, sem modo claro nesta fase.
- Tailwind v4 configurado 100% via CSS (`@theme`), sem arquivo
  `tailwind.config.js`.
- `AppShell` apresenta o app dentro de uma "vitrine" em formato de telefone em
  telas largas (desktop/tablet), preservando a identidade de app pessoal
  mesmo quando acessado via navegador desktop.
