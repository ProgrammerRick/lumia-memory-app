# ROADMAP — Lumia

Este roadmap descreve as 7 etapas planejadas do desenvolvimento do Lumia.
Cada etapa é desenvolvida em um novo chat, sempre evoluindo a partir da
versão anterior — nunca recriando o projeto.

- [x] **Etapa 1 — Fundação** ✅
  Estrutura profissional do projeto, Design System completo, tema global,
  componentes base (UI e layout), navegação entre telas, animações base, e
  as 5 telas iniciais sem funcionalidade real: Welcome, Home (vazia), Criar
  Memória (vazia), Timeline (vazia) e Configurações (vazia).

  - [x] **Etapa 1.1 — Refinamento visual premium** ✅ *(concluída nesta sessão)*
    Etapa exclusivamente visual: microinterações (ripple discreto, hover,
    tap), tela de carregamento elegante na entrada, texturas e brilhos mais
    ricos em `AppShell`/`BottomNav`/`Logo`, transições de tela com leve
    profundidade (scale), e novas imagens de identidade visual. Nenhuma
    funcionalidade, sistema ou dado novo foi introduzido.

- [ ] **Etapa 2 — Modelo de dados e persistência local**
  Definição do modelo de dados de "Memória" (`types/memory.ts`), camada de
  serviço local (`src/services/`), persistência via `localStorage`, hooks de
  domínio (`useMemories`), e Home/Timeline passam a exibir memórias reais
  (ainda que criadas via dados de teste/seed).

- [ ] **Etapa 3 — Criação de memórias (texto e foto)**
  Formulário real de criação de memória com texto e upload/seleção de foto
  (galeria do dispositivo), com validação, estados de carregamento e
  feedback visual, seguindo o Design System já estabelecido.

- [ ] **Etapa 4 — Vídeo e áudio**
  Suporte à criação de memórias em vídeo e áudio (gravação e/ou upload),
  incluindo players customizados com a identidade visual do Lumia.

- [ ] **Etapa 5 — Timeline e visualização de memórias**
  Timeline cronológica completa e interativa, tela de detalhe de memória,
  edição e exclusão de memórias, buscas e filtros simples.

- [ ] **Etapa 6 — Conta, sincronização e backend**
  Introdução de autenticação, backend/API e sincronização entre
  dispositivos, respeitando a filosofia de privacidade do produto.

- [ ] **Etapa 7 — Polimento final e lançamento**
  Revisão geral de UX/UI, acessibilidade, performance, animações finais,
  onboarding completo, preparação para publicação/distribuição.

> Observação: o escopo detalhado de cada etapa futura pode ser refinado no
> início do respectivo chat, mas a ordem geral e os princípios acima são
> definitivos.
