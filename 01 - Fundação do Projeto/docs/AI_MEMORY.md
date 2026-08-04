# AI_MEMORY — Lumia

> **Este é o documento mais importante do projeto.**
> Ele deve ser lido integralmente por qualquer IA (Claude ou outra) antes de
> iniciar trabalho em uma nova etapa/chat do Lumia. Ele deve ser **atualizado
> ao final de cada etapa**, sem exceção.

---

## 1. Resumo do projeto

Lumia é um aplicativo premium para guardar memórias pessoais (fotos, textos,
vídeos, áudios), com identidade visual nostálgica, elegante, minimalista e
tranquila — inspirado no acabamento de produtos Apple. Não é rede social nem
app de notas. É desenvolvido em 7 etapas, sempre evoluindo a partir da
versão existente, nunca recriado do zero.

Ver detalhes completos em `docs/PRODUCT_VISION.md`.

## 2. Estado atual do projeto

**Etapa concluída: 1 de 7 — Fundação.**

O projeto contém, até agora:

- Estrutura de pastas profissional e definitiva (ver seção 6).
- Design System completo e implementado (tema "Twilight & Candlelight").
- Sistema de navegação interno entre 5 telas (sem router externo).
- 5 telas criadas, **todas sem funcionalidade real** (apenas estrutura visual
  e navegação): Welcome, Home, Criar Memória, Timeline, Configurações.
- Nenhuma persistência de dados, nenhuma API, nenhuma autenticação, nenhuma
  captura de mídia real ainda existe — **isso é esperado e intencional**
  nesta fase.

## 3. Tecnologias e bibliotecas (contrato — NÃO ALTERAR)

- React 19 + Vite 7 + TypeScript.
- Tailwind CSS v4 (configuração 100% em CSS via `@theme`, em
  `src/index.css`; **não existe** `tailwind.config.js` neste projeto e não
  deve ser criado).
- Framer Motion — todas as animações do projeto.
- Lucide React — todos os ícones do projeto.
- `clsx` + `tailwind-merge` (via helper `src/utils/cn.ts`) — já existiam no
  boilerplate original, mantidos e usados normalmente.
- `vite-plugin-singlefile` — já existia no boilerplate, gera `dist/index.html`
  único com JS/CSS inline. Não remover.

**Proibido:** Next.js, React Native, Expo, Angular, Vue, Svelte, Electron,
react-router (ou qualquer router de URL), Redux/Zustand ou qualquer
gerenciador de estado global externo (o projeto usa Context API nativa).

## 4. Padrões de código adotados

- Componentes funcionais + hooks, sempre tipados em TypeScript.
- Um componente por arquivo, nome do arquivo = nome do componente.
- Interfaces de props declaradas no topo de cada arquivo de componente.
- Comentário JSDoc curto no topo de cada componente/tela explicando seu
  propósito.
- Estilização via classes Tailwind + tokens do Design System; `cn()` para
  classes condicionais/mescladas. Evitar estilo inline, exceto gradientes
  dinâmicos pontuais (já usados em `Logo.tsx` e `AppShell.tsx`).
- Toda cor/fonte/sombra/raio novo deve primeiro ser adicionado ao
  `docs/DESIGN_SYSTEM.md` e ao `@theme` de `src/index.css`, nunca "hardcoded"
  direto numa tela.

## 5. Estrutura de pastas existente (não reorganizar sem necessidade)

```
docs/                # Documentação viva (7 arquivos, listados abaixo)
archive/              # Reservado para versões antigas (vazio nesta etapa)
public/
  images/
    welcome-bg.jpg    # Background gerado por IA — tela Welcome
    lumia-icon.png    # Ícone do app — usado como favicon/apple-touch-icon
src/
  components/
    layout/
      AppShell.tsx        # Moldura raiz (glow ambiente + vitrine em telas grandes)
      BottomNav.tsx        # Navegação inferior fixa (Home, Timeline, Criar, Ajustes)
      ScreenTransition.tsx # Wrapper de transição de tela (fade + slide)
    ui/
      Button.tsx           # variantes: primary | glass | ghost
      EmptyState.tsx        # ícone flutuante + título + descrição
      GlassCard.tsx          # card de vidro, variante `strong`, modo `interactive`
      IconButton.tsx          # botão circular só ícone
      Logo.tsx                 # marca do app (orbe de luz animado)
      ScreenHeader.tsx          # eyebrow + título serif + subtítulo + action opcional
  context/
    NavigationContext.tsx   # useNavigation() -> { screen, previousScreen, navigate }
  screens/
    WelcomeScreen.tsx       # tela de entrada
    HomeScreen.tsx           # estado vazio, saudação por horário
    CreateMemoryScreen.tsx    # prévia visual dos 4 formatos de memória (sem função)
    TimelineScreen.tsx         # estado vazio
    SettingsScreen.tsx          # grupos de configurações (sem função)
  types/
    navigation.ts             # AppScreen, TabScreen, TAB_SCREENS
  utils/
    cn.ts                      # helper de classes (já existia)
  App.tsx                       # composição raiz (Provider + AppShell + AnimatePresence)
  main.tsx                       # bootstrap (já existia, não alterado)
  index.css                      # Design System: tokens @theme + utilitários globais
```

Documentos em `docs/`: `PROJECT_RULES.md`, `PRODUCT_VISION.md`,
`DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CHANGELOG.md`,
`AI_MEMORY.md` (este arquivo).

## 6. Funcionalidades prontas

- Navegação completa entre 5 telas com transições animadas.
- Design System visual completo e consistente (cores, tipografia, sombras,
  glass, animações, componentes reutilizáveis).
- Layout responsivo: em desktop/tablet o app aparece dentro de uma "vitrine"
  em formato de telefone; em mobile real, ocupa a tela inteira.
- Barra de navegação inferior com indicador ativo animado (`layoutId`) e
  botão de destaque central ("Criar").

## 7. Funcionalidades futuras (não implementar antes da hora)

Ver `docs/ROADMAP.md` para o plano completo das 7 etapas. Resumo rápido:

- Etapa 2: modelo de dados de "Memória" + persistência local (`localStorage`).
- Etapa 3: criação real de memórias em texto e foto.
- Etapa 4: criação real de memórias em vídeo e áudio.
- Etapa 5: timeline interativa completa, detalhe/edição/exclusão de memórias.
- Etapa 6: conta, autenticação, backend, sincronização.
- Etapa 7: polimento final, acessibilidade, performance, lançamento.

## 8. O que NÃO pode ser alterado sem autorização explícita

- A stack tecnológica definida na seção 3.
- A identidade de produto: não virar rede social, não virar app de notas.
- O tema visual "Twilight & Candlelight" (paleta, tipografia, glass,
  animações) definido em `docs/DESIGN_SYSTEM.md`.
- A navegação por estado interno (`NavigationContext`) em vez de router de URL.
- A estrutura de pastas descrita na seção 5 / `docs/ARCHITECTURE.md`.

## 9. Erros/armadilhas já identificados (evitar repetir)

- O projeto usa **Tailwind v4 com configuração CSS-first** (`@theme` em
  `src/index.css`). **Não criar** `tailwind.config.js` — isso não é o padrão
  deste projeto e pode causar confusão com os tokens já definidos.
- O `vite-plugin-singlefile` inlina JS/CSS no `dist/index.html`, mas os
  arquivos de `public/` (como as imagens) continuam sendo copiados como
  arquivos separados em `dist/`. Isso é esperado — não tentar "forçar" as
  imagens a virarem base64 manualmente.
- `package.json` e `vite.config.ts` **nunca devem ser editados diretamente**;
  para novas dependências, sempre usar a ferramenta de instalação de pacotes
  disponível no ambiente.

## 10. Decisões importantes já tomadas (definitivas)

- Nome do produto: **Lumia**.
- Paleta/tema: dark-first, "Twilight & Candlelight" (fundo crepúsculo escuro
  + acento dourado de vela + acento lavanda sutil no glow ambiente).
- Tipografia: stack de sistema (sans) + stack serif (New York/Georgia) para
  títulos e nome da marca.
- Navegação: 4 abas principais (Home, Timeline, Criar, Ajustes) + tela
  Welcome isolada antes delas.
- O botão "Criar" na navegação inferior é sempre visualmente destacado
  (círculo dourado elevado), pois representa a ação central do produto.
- Apresentação do app em formato de telefone (vitrine) quando acessado em
  telas largas, para preservar a sensação de "app pessoal" mesmo na web.

## 11. Próximo objetivo (para a próxima etapa/chat)

Iniciar a **Etapa 2 — Modelo de dados e persistência local**:

1. Criar `src/types/memory.ts` com o modelo de dados de uma "Memória"
   (id, tipo, título/legenda, conteúdo, data, etc. — a definir com cuidado
   pensando nas Etapas 3 e 4 já).
2. Criar `src/services/` para abstrair acesso a dados (implementação inicial
   via `localStorage`, pensada para ser substituível por uma API no futuro
   sem quebrar os componentes que a consomem).
3. Criar hook `useMemories` (ou equivalente) para expor os dados às telas.
4. Atualizar `HomeScreen` e `TimelineScreen` para exibir memórias reais
   (inicialmente pode usar dados de seed/teste), preservando o estado vazio
   já criado como fallback quando não houver memórias.
5. Seguir rigorosamente o Design System já estabelecido — nenhum elemento
   visual novo sem necessidade real.
6. Ao final, atualizar `CHANGELOG.md`, `ROADMAP.md` (marcar Etapa 2) e este
   `AI_MEMORY.md`.
