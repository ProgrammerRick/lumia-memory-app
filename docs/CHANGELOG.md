# CHANGELOG — Lumia

Todas as mudanças relevantes do projeto são registradas aqui, por etapa.

## [Etapa 6] — Refinamento, Qualidade e Estabilidade (esta etapa)

> Etapa de engenharia pura: nenhuma cor, fonte, espaçamento, raio, sombra,
> layout, componente visual, animação ou funcionalidade nova foi introduzida.
> O objetivo foi tornar o Lumia mais estável, mais rápido e mais organizado,
> preservando exatamente a mesma experiência já aprovada nas Etapas 1 a 5.

### Corrigido / Reforçado

- **Armazenamento local mais resiliente**
  (`src/services/storage/memoryStorage.ts`): leitura de `localStorage`
  agora valida a forma de cada registro antes de disponibilizá-lo ao app
  (`isValidMemoryShape`), evitando que um dado corrompido quebre a Home ou
  a Timeline. Toda leitura e escrita está protegida por `try/catch`, com
  mensagens de erro claras propagadas para a interface via `ToastContext`
  em vez de exceções silenciosas ou tela em branco.
- **Validação de mídia reforçada**
  (`src/services/media/mediaService.ts`): checagem de tamanho máximo de
  arquivo (15 MB) centralizada em `isMediaFileTooLarge`, com mensagens de
  erro específicas por arquivo rejeitado, exibidas via toast (`error`).
- **Utilitário de onboarding protegido**
  (`src/utils/onboarding.ts`): leitura/escrita da flag de onboarding
  protegidas contra ambientes sem `localStorage` disponível (ex.: modo de
  navegação privada), com fallback seguro em vez de erro no console.
- **Revisão de responsividade**: `AppShell` e todas as telas confirmadas em
  larguras de 320px, 360px, 390px, 414px, 768px e 1024px — nenhuma mudança
  de layout foi necessária além de confirmar o comportamento já responsivo
  (tela cheia no mobile, vitrine centralizada em telas maiores).
- **Organização de código**: revisão de imports, remoção de qualquer
  duplicidade potencial de componentes, consolidação de tipos em
  `src/types/`, padronização de nomes de arquivos e componentes.
- **Build**: `npm run build` validado sem erros de TypeScript e sem
  warnings de compilação.

### Não incluído nesta etapa (propositalmente)

- Nenhuma tela nova, campo de memória novo ou funcionalidade de dados nova.
- Nenhuma busca, filtro, favorito ou reordenação (reservado à Etapa 7).
- Nenhuma cor, fonte, ícone-set, raio, sombra, layout ou animação nova fora
  do Design System já documentado.
- Nenhum backend, conta, login ou sincronização.

### Decisões técnicas importantes

- Todas as correções desta etapa foram feitas por extensão dos arquivos já
  existentes (`memoryStorage.ts`, `mediaService.ts`, `onboarding.ts`),
  nunca por substituição ou redesenho de arquivos inteiros.
- A camada de serviço (`services/storage`, `services/media`) continua sendo
  o único ponto de acesso a dados/arquivos locais, reforçando o princípio já
  estabelecido nas Etapas 3 e 4.

## [Etapa 5] — Experiência de Uso e Interações

Evolução puramente comportamental sobre a interface já aprovada: nova tela
de **onboarding** (`OnboardingScreen`) exibida apenas na primeira visita,
guardando sua conclusão em `localStorage` através do utilitário
`src/utils/onboarding.ts` (`lumia:onboarding-completed`). `WelcomeScreen`
decide, ao tocar em "Começar", entre ir para o onboarding (primeira vez) ou
direto para a Home (visitas seguintes). Em `SettingsScreen`, uma opção
"Rever apresentação inicial" permite limpar essa flag manualmente.

Microinterações de feedback: `MediaPicker` confirma visualmente quando uma
mídia é adicionada ou rejeitada; `CreateMemoryScreen` ganhou um botão de
salvar com estado de carregamento (`Button loading`); `MemoryDetailScreen`
mostra "Excluindo..." antes de concluir a exclusão.

Novos tipos de toast (`ToastContext`): `media` e `error`, além dos já
existentes `success` e `delete`.

Estados de carregamento elegantes: `MemoryCardSkeleton` (placeholder com a
mesma silhueta do `MemoryCard`) usado por `HomeScreen` e `TimelineScreen`
enquanto `MemoriesContext.isReady` é `false`.

Melhorias de acessibilidade: `role="button"`/teclado em `MemoryCard` e itens
de `SettingsScreen`; `:focus-visible` global; `aria-live` nos toasts;
`role="alertdialog"` no `ConfirmDialog`; `aria-invalid`/`role="alert"` na
validação do formulário de memória; `<label>` associados aos campos.

Nenhuma cor, fonte, layout, espaçamento ou componente visual foi alterado.

## [Etapa 4] — Memórias Multimídia

Suporte a mídia dentro do sistema de memórias já existente: uma memória
agora pode guardar múltiplas fotos, vídeos e áudios, além da imagem de
capa. Nova camada `services/media/mediaService.ts` isola a leitura de
arquivos; novos componentes `MediaPicker`, `MediaGallery` e
`MediaTypeIndicator` (em `components/media/`) trazem a experiência de
anexar, visualizar, reproduzir e remover mídia, integrados ao formulário de
criação/edição, à tela de detalhe e aos cartões de Home/Timeline. Modelo de
dados evoluído com `MediaType` e `MediaItem` em `src/types/memory.ts`.
Nenhuma cor, fonte, espaçamento, sombra ou animação existente foi alterada.

## [Etapa 3] — Sistema de Memórias

Primeira etapa de funcionalidade real do produto. Modelo de dados
(`src/types/memory.ts`), camada de armazenamento local
(`src/services/storage/memoryStorage.ts`), estado de domínio compartilhado
(`MemoriesContext`), feedback visual (`ToastContext`), navegação com
parâmetros, e as operações completas de criar, editar, visualizar e excluir
memórias, incluindo seleção de imagem de capa. Novos componentes `Chip`,
`ConfirmDialog`, `ImagePicker`, `MemoryCard`, `MemoryBadges`.

## [Etapa 2] — Interface Premium

Refinamento visual completo sobre a fundação da Etapa 1: microinterações,
tela de carregamento na entrada, texturas e brilhos mais ricos, transições
de tela com leve profundidade. Nenhuma funcionalidade nova.

## [Etapa 1] — Fundação

Estrutura profissional do projeto, Design System "Twilight & Candlelight"
completo, componentes base (UI e layout), navegação interna entre telas e
as 5 telas iniciais sem funcionalidade real.
