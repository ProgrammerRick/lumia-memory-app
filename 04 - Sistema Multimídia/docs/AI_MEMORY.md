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

**Etapa concluída: 3 — Sistema de Memórias.**

O projeto contém, até agora:

- Estrutura de pastas profissional (ver seção 6).
- Design System "Twilight & Candlelight" completo (cores, tipografia,
  glass, sombras, animações), com pequenas adições nesta etapa (cor
  `lumia-rose` para ações destrutivas, variante `danger` do `Button`).
- Sistema de navegação interno entre telas (sem router externo), agora
  capaz de carregar **parâmetros** (`navigate(screen, { memoryId })`) e de
  **voltar** (`goBack()`).
- **Sistema de memórias funcional e completo**:
  - Modelo de dados (`Memory`) com título, descrição, data, categoria,
    sentimento, imagem de capa, datas de criação/atualização.
  - Armazenamento local via `localStorage`, isolado atrás de uma interface
    de repositório (`MemoryRepository`), pronta para ser trocada no futuro.
  - Estado de domínio compartilhado (`MemoriesContext` / `useMemories()`).
  - CRUD completo: criar, editar, visualizar em detalhe e excluir (com
    confirmação segura via `ConfirmDialog`).
  - Seleção de imagem de capa a partir da galeria/dispositivo
    (`ImagePicker`, input de arquivo nativo + `FileReader`).
  - Feedback visual de salvar/excluir via `ToastContext`.
  - Home e Timeline exibindo memórias reais, com estados vazios elegantes
    quando não há nenhuma.
- Nenhuma persistência em nuvem, nenhuma API, nenhuma autenticação, nenhuma
  captura de vídeo/áudio/câmera real ainda existe — **isso é esperado e
  intencional** nesta fase.

## 3. Tecnologias e bibliotecas (contrato — NÃO ALTERAR)

- React 19 + Vite 7 + TypeScript.
- Tailwind CSS v4 (configuração 100% em CSS via `@theme`, em
  `src/index.css`; **não existe** `tailwind.config.js` e não deve ser criado).
- Framer Motion — todas as animações do projeto.
- Lucide React — todos os ícones do projeto.
- `clsx` + `tailwind-merge` (via helper `src/utils/cn.ts`).
- Nenhuma biblioteca nova foi adicionada na Etapa 3 além das já previstas no
  contrato (`framer-motion`, `lucide-react` já existiam desde a Etapa 1).

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
      Chip.tsx               # NOVO — seleção em pílula (categoria/sentimento)
      ConfirmDialog.tsx       # NOVO — confirmação de ações destrutivas
      EmptyState.tsx
      GlassCard.tsx
      IconButton.tsx
      ImagePicker.tsx          # NOVO — seleção de imagem da galeria
      Logo.tsx
      ScreenHeader.tsx          # agora com slot `leading` opcional
    memories/                   # NOVO — componentes visuais do domínio
      MemoryBadges.tsx           # CategoryBadge, FeelingBadge
      MemoryCard.tsx
  context/
    NavigationContext.tsx      # useNavigation() -> screen, previousScreen, params, navigate, goBack
    MemoriesContext.tsx          # NOVO — useMemories() -> memories, createMemory, updateMemory, deleteMemory, getMemory
    ToastContext.tsx              # NOVO — useToast() -> showToast(message, kind)
  services/
    storage/
      memoryStorage.ts            # NOVO — MemoryRepository + LocalStorageMemoryRepository
  screens/
    WelcomeScreen.tsx
    HomeScreen.tsx                # memórias reais + estado vazio
    CreateMemoryScreen.tsx         # formulário real (criar E editar)
    TimelineScreen.tsx              # linha do tempo real, agrupada por mês
    MemoryDetailScreen.tsx           # NOVO — visualizar/editar/excluir
    SettingsScreen.tsx
  types/
    navigation.ts                  # AppScreen, TabScreen, TAB_SCREENS, NavigationParams
    memory.ts                       # NOVO — Memory, MemoryCategory, MemoryFeeling, MemoryInput
  utils/
    cn.ts
    date.ts                         # NOVO — formatMemoryDate, groupMemoriesByMonth, todayIso
    memoryMeta.ts                    # NOVO — CATEGORY_OPTIONS, FEELING_OPTIONS
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
- Design System visual completo e consistente.
- Layout responsivo (vitrine em telas grandes, tela cheia em mobile),
  testado mentalmente de 320px a 1024px (grid/flex fluido, sem larguras
  fixas fora da vitrine desktop).
- **Sistema de memórias completo**: criar, editar, visualizar em detalhe,
  excluir (com confirmação), imagem de capa da galeria, categorias,
  sentimentos, datas.
- Home com estado vazio elegante e, quando há dados, contagem + últimas
  memórias + atalho rápido para criar.
- Timeline real, agrupada por mês, com marcador visual de linha do tempo.
- Feedback visual (toast) ao salvar e ao excluir.

## 7. Funcionalidades futuras (não implementar antes da hora)

Ver `docs/ROADMAP.md`. Resumo rápido:

- Etapa 4: criação real de memórias em vídeo e áudio.
- Etapa 5: busca, filtros e organização avançada.
- Etapa 6: conta, autenticação, backend, sincronização.
- Etapa 7: polimento final, acessibilidade, performance, lançamento.

## 8. O que NÃO pode ser alterado sem autorização explícita

- A stack tecnológica definida na seção 3.
- A identidade de produto: não virar rede social, não virar app de notas.
- O tema visual "Twilight & Candlelight" definido em `docs/DESIGN_SYSTEM.md`.
- A navegação por estado interno (`NavigationContext`) em vez de router de URL.
- A estrutura de pastas descrita na seção 5 / `docs/ARCHITECTURE.md`.
- O contrato `MemoryRepository` — qualquer nova forma de persistência deve
  implementá-lo, não substituí-lo por acesso direto a dados dentro das telas.

## 9. Erros/armadilhas já identificados (evitar repetir)

- O projeto usa **Tailwind v4 com configuração CSS-first** (`@theme` em
  `src/index.css`). **Não criar** `tailwind.config.js`.
- Os arquivos de `public/` são copiados como arquivos separados em `dist/`
  pelo build — não tentar forçá-los a base64 manualmente.
- `package.json` e `vite.config.ts` **nunca devem ser editados diretamente**;
  para novas dependências, sempre usar a ferramenta de instalação de pacotes.
- Imagens de memória são guardadas como *data URL* no próprio registro —
  atenção ao limite de tamanho do `localStorage` (~5MB) ao evoluir para
  muitas memórias com fotos grandes; isso deverá ser resolvido ao introduzir
  armazenamento em arquivo/nuvem em etapa futura, não antes.
- A tela `"create"` é reaproveitada para edição via `params.memoryId` — ao
  adicionar novos campos ao formulário, lembrar de atualizar tanto o estado
  inicial (`EMPTY_FORM`) quanto o `useEffect` que pré-carrega os dados da
  memória em edição.

## 10. Próximo passo sugerido

Iniciar a **Etapa 4 — Vídeo e áudio**: adicionar gravação/upload de vídeo e
áudio às memórias, com players customizados, reaproveitando o modelo de
dados já preparado (`videoUrl`, `audioUrl` em `types/memory.ts`) e a mesma
tela `CreateMemoryScreen`/`MemoryDetailScreen` sempre que possível, em vez
de recriar fluxos novos.
