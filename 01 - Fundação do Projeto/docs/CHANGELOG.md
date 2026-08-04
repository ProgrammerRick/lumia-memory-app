# CHANGELOG — Lumia

Todas as mudanças relevantes do projeto são registradas aqui, por etapa.

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
