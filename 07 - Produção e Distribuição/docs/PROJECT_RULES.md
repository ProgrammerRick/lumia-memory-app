# PROJECT_RULES — Lumia

> Este documento contém as regras **permanentes** do projeto Lumia.
> Elas são definitivas e valem para todas as etapas futuras, mesmo em
> novos chats/sessões. Nenhuma regra aqui deve ser quebrada sem
> autorização explícita do responsável pelo produto.

## 1. Natureza do projeto

- O Lumia é um projeto **contínuo e de longo prazo**, desenvolvido em etapas.
- Cada etapa parte da versão anterior. **Nunca recriar o projeto do zero.**
- Todas as decisões tomadas em uma etapa são consideradas **definitivas**,
  salvo indicação explícita em contrário.

## 2. Stack tecnológica (contrato do projeto)

Tecnologias **obrigatórias e definitivas**:

- React
- Vite
- TypeScript
- Tailwind CSS (v4, configuração via `@theme` em CSS)
- Framer Motion
- Lucide React

**Proibido migrar para:** Next.js, React Native, Expo, Angular, Vue, Svelte, Electron,
ou qualquer outra arquitetura/framework diferente do contrato acima.

**Proibido adicionar bibliotecas de roteamento externas** (ex.: react-router) sem
autorização — a navegação do Lumia é feita por um sistema de estado interno
(`NavigationContext`), pois o produto se comporta como um app, não como um site
com URLs públicas.

## 3. Regras absolutas de evolução

- Nunca recriar o projeto.
- Nunca apagar funcionalidades existentes.
- Nunca remover componentes existentes.
- Nunca trocar bibliotecas já adotadas.
- Nunca alterar a arquitetura de pastas sem necessidade real.
- Sempre evoluir a partir da versão existente.
- Sempre preservar o design, o Design System e as animações já criadas.
- Sempre preservar a organização de pastas descrita em `ARCHITECTURE.md`.
- Ao alterar um arquivo, modificar **apenas o necessário** — nunca reescrever
  arquivos inteiros sem motivo.

## 4. Identidade de produto (não pode ser descaracterizada)

- O Lumia **não é uma rede social** (sem feed público, curtidas, seguidores,
  comentários públicos, compartilhamento social nativo).
- O Lumia **não é um app de notas** (não deve parecer um bloco de notas
  genérico, checklist ou produtividade).
- O Lumia é um **santuário pessoal de memórias**: fotos, textos, vídeos e
  áudios guardados com cuidado, elegância e emoção.
- O tom visual é sempre: nostálgico, elegante, minimalista, tranquilo,
  premium — nível de acabamento inspirado na Apple.

## 5. Processo obrigatório ao final de cada etapa

Ao final de **cada** etapa, é obrigatório:

1. Atualizar `docs/CHANGELOG.md` com as mudanças da etapa.
2. Atualizar `docs/ROADMAP.md`, marcando a etapa concluída.
3. Atualizar `docs/AI_MEMORY.md` com o novo estado do projeto.
4. Rodar o build e confirmar que o projeto compila sem erros.

## 6. Escopo por etapa

Cada etapa deve implementar **apenas** o que foi solicitado para aquela fase.
Não antecipar funcionalidades de etapas futuras.

## 7. Sobre dados e privacidade

- O Lumia continua sendo, nesta fase, um aplicativo **100% local**: todos os
  dados de memórias vivem no dispositivo do usuário (`localStorage`).
- **Proibido**, sem autorização explícita: login, cadastro, e-mail, senha,
  Firebase, Supabase, banco de dados online, backend, API externa, servidor
  ou qualquer forma de pagamento.
- Qualquer acesso a dados de memórias deve passar pela camada de serviço em
  `src/services/storage/`, nunca diretamente de dentro de uma tela.

## 8. Sobre mídia

- Imagens, vídeos e áudios continuam sendo guardados **100% localmente**
  (data URL em `localStorage`), sem upload para qualquer servidor ou nuvem.
- Toda lógica de leitura/conversão de arquivos de mídia deve viver em
  `src/services/media/`, nunca diretamente dentro de uma tela.

## 9. Sobre experiência e interações

- Melhorias de experiência (onboarding, microinterações, estados de app,
  transições, acessibilidade) devem ser feitas **por comportamento**, nunca
  redesenhando telas, cores, tipografia ou espaçamentos já aprovados.
- Todo novo estado de app (carregando, vazio, sucesso, erro) deve reaproveitar
  os componentes visuais já existentes (`EmptyState`, `Button`, `GlassCard`,
  `ConfirmDialog`, toasts) — nunca criar um novo sistema visual paralelo.
- O onboarding é local e opcional: guardado como uma simples flag em
  `localStorage` (`lumia:onboarding-completed`), sem qualquer conta, servidor
  ou telemetria.

## 10. Sobre refinamento e qualidade (reforçado na Etapa 6)

- Etapas de refinamento (bugs, performance, responsividade, organização de
  código) **nunca** alteram cores, fontes, layout, espaçamentos, componentes
  visuais ou animações já aprovados.
- Correções devem ser mínimas e cirúrgicas: preferir ajustar a causa raiz de
  um problema a reescrever um arquivo inteiro.
- Nenhuma funcionalidade nova deve ser introduzida durante uma etapa de
  qualidade — apenas o que já existe pode ser corrigido/otimizado.
