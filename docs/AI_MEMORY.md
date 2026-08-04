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
versão existente, nunca recriado do zero. Ver detalhes completos em
`docs/PRODUCT_VISION.md`.

## 2. Estado atual do projeto

**Etapa concluída: 6 — Refinamento, Qualidade e Estabilidade.**

Esta etapa **não** adicionou funcionalidades, telas ou componentes visuais
novos. Foi uma etapa de engenharia sobre a base já existente (Etapas 1 a 5):

- Revisão de **tratamento de erros** na camada de dados:
  `LocalStorageMemoryRepository` agora valida a forma dos dados lidos do
  `localStorage` (protegendo o app contra registros corrompidos) e envolve
  toda leitura/escrita em `try/catch`, nunca deixando uma exceção de
  armazenamento quebrar a interface.
- `services/media/mediaService.ts` mantém validação de tamanho máximo de
  arquivo (15 MB) e mensagens de erro claras, exibidas via `ToastContext`.
- `utils/onboarding.ts` protegido contra ambientes sem `localStorage`
  disponível (ex.: modo privado), com fallback seguro.
- Revisão de **responsividade**: `AppShell` funciona em largura de tela
  cheia no mobile (320px–430px) e como cartão centralizado com bordas
  arredondadas em telas maiores (tablet/desktop), sem nenhuma mudança de
  cor, tipografia ou espaçamento.
- Revisão de **organização de código**: imports consistentes, um componente
  por arquivo, tipos centralizados em `src/types/`, sem componentes
  duplicados ou código morto.
- Build validado (`vite build`) sem erros de TypeScript ou avisos de
  compilação.

Estado funcional herdado das etapas anteriores (inalterado):

- Estrutura de pastas profissional (ver seção 5).
- Design System "Twilight & Candlelight" completo (cores, tipografia, glass,
  sombras, animações) — **visualmente inalterado desde a Etapa 1**.
- Sistema de navegação interno entre telas (sem router externo), com
  parâmetros (`navigate(screen, { memoryId })`), `goBack()`, e a tela
  `"onboarding"`.
- **Sistema de memórias funcional e completo**: CRUD completo com
  confirmação segura, feedback via `ToastContext`, Home e Timeline com dados
  reais.
- **Suporte a multimídia**: array `media: MediaItem[]` por memória, serviço
  `services/media/mediaService.ts`, componentes
  `MediaPicker`/`MediaGallery`/`MediaTypeIndicator`.
- **Experiência e interações**: `OnboardingScreen` na primeira visita,
  microinterações de feedback, estados de carregamento (`isReady` +
  `MemoryCardSkeleton`), reforços de acessibilidade.
- Nenhuma persistência em nuvem, nenhuma API, nenhuma autenticação ainda
  existe — isso é esperado e intencional nesta fase.

## 3. Tecnologias e bibliotecas (contrato — NÃO ALTERAR)

- React 19 + Vite 7 + TypeScript.
- Tailwind CSS v4 (configuração 100% em CSS via `@theme`, em
  `src/index.css`; **não existe** `tailwind.config.js` e não deve ser
  criado).
- Framer Motion — todas as animações do projeto.
- Lucide React — todos os ícones do projeto.
- `clsx` + `tailwind-merge` (via helper `src/utils/cn.ts`).
- **Nenhuma biblioteca nova foi adicionada na Etapa 6.**

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
  de uma tela ou componente (exceção deliberada e mínima: a flag simples de
  onboarding em `src/utils/onboarding.ts`, que não é dado de memória).
- Acesso a arquivos de mídia **sempre** via `src/services/media/`.
- Microinterações (hover, tap, loading) ficam encapsuladas dentro do próprio
  componente reutilizável (`Button`, `IconButton`, `GlassCard`).

## 5. Estrutura de pastas existente (não reorganizar sem necessidade)

```
docs/                              # Documentação viva
public/
  images/
    welcome-bg.jpg                 # Background da tela Welcome
src/
  components/
    layout/
      AppShell.tsx
      BottomNav.tsx
      ScreenTransition.tsx
    ui/
      Button.tsx                   # variantes: primary | glass | ghost | danger; + prop `loading`
      Chip.tsx
      ConfirmDialog.tsx
      EmptyState.tsx
      GlassCard.tsx
      IconButton.tsx
      ImagePicker.tsx
      Logo.tsx
      ScreenHeader.tsx
    memories/
      MemoryBadges.tsx              # CategoryBadge, FeelingBadge
      MemoryCard.tsx
      MemoryCardSkeleton.tsx
    media/
      MediaPicker.tsx
      MediaGallery.tsx
      MediaTypeIndicator.tsx
  context/
    NavigationContext.tsx           # useNavigation() -> screen, previousScreen, params, navigate, goBack
    MemoriesContext.tsx              # useMemories() -> memories, isReady, createMemory, updateMemory, deleteMemory, getMemory
    ToastContext.tsx                 # useToast() -> showToast(message, kind); kind: success | delete | media | error
  services/
    storage/
      memoryStorage.ts               # MemoryRepository + LocalStorageMemoryRepository (com validação defensiva — Etapa 6)
    media/
      mediaService.ts                # createMediaItem, isMediaFileTooLarge, formatFileSize, countMediaByType
  screens/
    WelcomeScreen.tsx
    OnboardingScreen.tsx
    HomeScreen.tsx
    CreateMemoryScreen.tsx
    TimelineScreen.tsx
    MemoryDetailScreen.tsx
    SettingsScreen.tsx
  types/
    navigation.ts                    # AppScreen, TabScreen, TAB_SCREENS, NavigationParams
    memory.ts                        # Memory, MemoryCategory, MemoryFeeling, MemoryInput, MediaItem, MediaType
  utils/
    cn.ts
    date.ts                          # formatMemoryDate, formatMemoryDateShort, groupMemoriesByMonth, todayIso
    memoryMeta.ts                    # CATEGORY_OPTIONS, FEELING_OPTIONS
    onboarding.ts                    # hasCompletedOnboarding, markOnboardingCompleted, resetOnboarding
  App.tsx                            # Providers: Navigation > Memories > Toast
  main.tsx
  index.css                          # tokens do Design System + :focus-visible global
```

Documentos em `docs/`: `PROJECT_RULES.md`, `PRODUCT_VISION.md`,
`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md`,
`AI_MEMORY.md` (este arquivo).

## 6. Funcionalidades prontas

- Navegação completa entre telas com transições animadas e suporte a
  parâmetros.
- Onboarding de primeira visita, com opção de rever em Ajustes.
- Design System visual completo e consistente — sem nenhuma alteração
  visual na Etapa 6.
- Layout responsivo (vitrine em telas grandes, tela cheia em mobile),
  validado de 320px a 1024px de largura.
- Sistema de memórias completo: criar, editar, visualizar, excluir (com
  confirmação e feedback de carregamento), imagem de capa e mídia
  (fotos/vídeos/áudios).
- Estados de carregamento, vazio, sucesso e erro tratados de forma
  consistente em toda a navegação principal.
- Reforços de acessibilidade (teclado, foco visível, leitura de tela para
  toasts e diálogos).
- Armazenamento local mais resiliente a dados corrompidos ou indisponíveis.

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

**Etapa 7 — Busca, filtros e organização avançada**, conforme
`docs/ROADMAP.md`: busca textual, filtros por categoria/sentimento/período/
tipo de mídia, favoritos e reordenação da timeline — sempre reaproveitando
os componentes e o Design System já existentes.
