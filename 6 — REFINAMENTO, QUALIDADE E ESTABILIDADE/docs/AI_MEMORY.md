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

**Etapa concluída: 5 — Experiência de Uso e Interações.**

O projeto contém, até agora:

- Estrutura de pastas profissional (ver seção 6).
- Design System "Twilight & Candlelight" completo (cores, tipografia,
  glass, sombras, animações) — **visualmente inalterado desde a Etapa 1**.
- Sistema de navegação interno entre telas (sem router externo), com
  parâmetros (`navigate(screen, { memoryId })`), `goBack()`, e a nova tela
  `"onboarding"` (Etapa 5).
- **Sistema de memórias funcional e completo** (Etapa 3): CRUD completo com
  confirmação segura, feedback via `ToastContext`, Home e Timeline com dados
  reais.
- **Suporte a multimídia** (Etapa 4): array `media: MediaItem[]` por
  memória, serviço `services/media/mediaService.ts`, componentes
  `MediaPicker`/`MediaGallery`/`MediaTypeIndicator`.
- **Experiência e interações** (Etapa 5, nova nesta sessão):
  - `OnboardingScreen`: apresentação inicial de 3 passos, exibida apenas na
    primeira visita (flag `lumia:onboarding-completed` em `localStorage`,
    gerida por `src/utils/onboarding.ts`). `WelcomeScreen` decide entre
    onboarding e Home. `SettingsScreen` permite "Rever apresentação
    inicial".
  - Microinterações: `Button` ganhou prop `loading` (usada ao salvar
    memória); `MediaPicker` mostra toast ao adicionar/rejeitar mídia;
    `MemoryDetailScreen` mostra "Excluindo..." antes de concluir a exclusão.
  - Novos tipos de toast: `media`, `error` (além de `success`, `delete` já
    existentes).
  - Estado de carregamento: `MemoriesContext.isReady` + novo componente
    `MemoryCardSkeleton`, usados por `HomeScreen`/`TimelineScreen` antes de
    exibir dados ou o estado vazio.
  - Acessibilidade: `role="button"`/teclado em `MemoryCard` e itens de
    `SettingsScreen`; `:focus-visible` global; `aria-live` nos toasts;
    `role="alertdialog"` no `ConfirmDialog`; `aria-invalid`/`role="alert"`
    na validação do formulário de memória; `<label htmlFor>` nos campos.
  - **Nenhuma cor, fonte, layout, espaçamento ou componente visual foi
    alterado** — todas as mudanças são estritamente comportamentais.
- Nenhuma persistência em nuvem, nenhuma API, nenhuma autenticação ainda
  existe — isso é esperado e intencional nesta fase.

## 3. Tecnologias e bibliotecas (contrato — NÃO ALTERAR)

- React 19 + Vite 7 + TypeScript.
- Tailwind CSS v4 (configuração 100% em CSS via `@theme`, em
  `src/index.css`; **não existe** `tailwind.config.js` e não deve ser criado).
- Framer Motion — todas as animações do projeto.
- Lucide React — todos os ícones do projeto.
- `clsx` + `tailwind-merge` (via helper `src/utils/cn.ts`).
- **Nenhuma biblioteca nova foi adicionada na Etapa 5** — nenhum roteador,
  nenhuma lib de tour/onboarding de terceiros, nenhum gerenciador de estado
  externo. O onboarding e as microinterações usam apenas React state,
  Framer Motion e `localStorage`.

**Proibido:** Next.js, React Native, Expo, Angular, Vue, Svelte, Electron,
react-router (ou qualquer router de URL), Redux/Zustand ou qualquer
gerenciador de estado global externo, Firebase, Supabase, backend, API
externa, login/autenticação, pagamentos.

## 4. Padrões de código adotados

- Componentes funcionais + hooks, sempre tipados em TypeScript.
- Um componente por arquivo, nome do arquivo = nome do componente.
- Interfaces de props declaradas no topo de cada arquivo de componente.
- Comentário JSDoc curto no topo de cada componente/tela/serviço explicando
  seu propósito (e, desde a Etapa 5, o que mudou/por quê).
- Estilização via classes Tailwind + tokens do Design System; `cn()` para
  classes condicionais/mescladas.
- Acesso a dados **sempre** via `src/services/storage/` e
  `src/context/MemoriesContext.tsx` — nunca `localStorage` direto de dentro
  de uma tela ou componente (exceção deliberada e mínima: a flag simples de
  onboarding em `src/utils/onboarding.ts`, que não é dado de memória).
- Acesso a arquivos de mídia **sempre** via `src/services/media/`.
- Microinterações (ripple, hover, tap, loading) ficam encapsuladas dentro do
  próprio componente reutilizável (`Button`, `IconButton`, `GlassCard`).

## 5. Estrutura de pastas existente (não reorganizar sem necessidade)

```
docs/                 # Documentação viva
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
      Button.tsx            # variantes: primary | glass | ghost | danger; + prop `loading` (Etapa 5)
      Chip.tsx
      ConfirmDialog.tsx        # + acessibilidade (Etapa 5)
      EmptyState.tsx
      GlassCard.tsx
      IconButton.tsx
      ImagePicker.tsx
      Logo.tsx
      ScreenHeader.tsx
    memories/
      MemoryBadges.tsx           # CategoryBadge, FeelingBadge
      MemoryCard.tsx               # + acessibilidade de teclado (Etapa 5)
      MemoryCardSkeleton.tsx        # NOVO — Etapa 5
    media/
      MediaPicker.tsx                # + toasts de feedback (Etapa 5)
      MediaGallery.tsx
      MediaTypeIndicator.tsx
  context/
    NavigationContext.tsx      # useNavigation() -> screen, previousScreen, params, navigate, goBack
    MemoriesContext.tsx          # useMemories() -> memories, isReady (Etapa 5), createMemory, updateMemory, deleteMemory, getMemory
    ToastContext.tsx              # useToast() -> showToast(message, kind); kind: success | delete | media | error (Etapa 5)
  services/
    storage/
      memoryStorage.ts            # MemoryRepository + LocalStorageMemoryRepository
    media/
      mediaService.ts                # createMediaItem, isMediaFileTooLarge, formatFileSize, countMediaByType
  screens/
    WelcomeScreen.tsx              # decide onboarding vs. home (Etapa 5)
    OnboardingScreen.tsx             # NOVO — Etapa 5
    HomeScreen.tsx                    # + skeleton de carregamento (Etapa 5)
    CreateMemoryScreen.tsx             # + Button loading (Etapa 5)
    TimelineScreen.tsx                  # + skeleton de carregamento (Etapa 5)
    MemoryDetailScreen.tsx               # + feedback de exclusão (Etapa 5)
    SettingsScreen.tsx                    # + "Rever apresentação inicial" (Etapa 5)
  types/
    navigation.ts                  # AppScreen (+ "onboarding" — Etapa 5), TabScreen, TAB_SCREENS, NavigationParams
    memory.ts                       # Memory, MemoryCategory, MemoryFeeling, MemoryInput, MediaItem, MediaType
  utils/
    cn.ts
    date.ts                         # formatMemoryDate, groupMemoriesByMonth, todayIso
    memoryMeta.ts                    # CATEGORY_OPTIONS, FEELING_OPTIONS
    onboarding.ts                     # NOVO — Etapa 5: hasCompletedOnboarding, markOnboardingCompleted
  App.tsx                           # Providers: Navigation > Memories > Toast
  main.tsx
  index.css                          # + :focus-visible global (Etapa 5)
```

Documentos em `docs/`: `PROJECT_RULES.md`, `PRODUCT_VISION.md`,
`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md`,
`AI_MEMORY.md` (este arquivo).

## 6. Funcionalidades prontas

- Navegação completa entre telas com transições animadas e suporte a
  parâmetros.
- Onboarding de primeira visita, com opção de rever em Ajustes.
- Design System visual completo e consistente — sem nenhuma alteração
  visual na Etapa 5.
- Layout responsivo (vitrine em telas grandes, tela cheia em mobile).
- Sistema de memórias completo: criar, editar, visualizar, excluir (com
  confirmação e feedback de carregamento), imagem de capa e mídia
  (fotos/vídeos/áudios).
- Estados de carregamento, vazio, sucesso e erro tratados de forma
  consistente em toda a navegação principal.
- Reforços de acessibilidade (teclado, foco visível, leitura de tela para
  toasts e diálogos).

## 7. O que NÃO fazer em próximas etapas sem autorização explícita

- Não redesenhar nenhuma tela ou componente existente.
- Não criar um novo Design System ou trocar tokens de cor/tipografia.
- Não introduzir bibliotecas de roteamento, gerenciamento de estado global,
  backend, banco de dados online ou autenticação.
- Não duplicar componentes já existentes (`Button`, `Card`, `Layout`,
  navegação, sistema de animação) — sempre estender os existentes.
- Não implementar escopo de etapas futuras (busca/filtros, conta,
  sincronização) antes da hora.

## 8. Próxima etapa sugerida

**Etapa 6 — Busca, filtros e organização avançada**, conforme
`docs/ROADMAP.md`: busca textual, filtros por categoria/sentimento/período/
tipo de mídia, favoritos e reordenação da timeline — sempre reaproveitando
os componentes e o Design System já existentes.
