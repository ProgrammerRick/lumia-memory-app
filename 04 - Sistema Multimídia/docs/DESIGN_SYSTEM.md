# DESIGN_SYSTEM — Lumia

> Fonte de verdade visual do produto. Toda nova tela ou componente deve seguir
> estritamente este documento. Os tokens reais estão implementados em
> `src/index.css` (bloco `@theme`, Tailwind v4 CSS-first config).

## 1. Conceito visual

"Twilight & Candlelight" — um crepúsculo profundo (fundo) iluminado por uma
luz de vela quente (acento). O contraste entre o escuro elegante e a luz
dourada é a base de toda a identidade visual do Lumia.

## 2. Paleta de cores

| Token | Valor | Uso |
|---|---|---|
| `--color-lumia-void` | `#050506` | Fundo mais profundo (moldura externa do app) |
| `--color-lumia-bg` | `#0b0b10` | Fundo principal das telas |
| `--color-lumia-bg-soft` | `#121218` | Fundo secundário / seções |
| `--color-lumia-surface` | `#16161d` | Superfícies (cards sólidos) |
| `--color-lumia-surface-high` | `#1c1c25` | Superfícies elevadas |
| `--color-lumia-border` | `#2a2a35` | Bordas sutis |
| `--color-lumia-gold` | `#e8b573` | Cor de destaque primária (ações, ícones ativos) |
| `--color-lumia-gold-soft` | `#f3d9a8` | Gradientes, brilhos |
| `--color-lumia-gold-deep` | `#c98f4a` | Gradientes, sombras de destaque |
| `--color-lumia-lavender` | `#9b9ce6` | Acento secundário (glow ambiente) |
| `--color-lumia-lavender-soft` | `#c3c4f2` | Variações claras do acento secundário |
| `--color-lumia-rose` | `#e29aa4` | Ações destrutivas (excluir memória) |
| `--color-lumia-sage` | `#9bc2a6` | Reservado para estados positivos futuros |
| `--color-lumia-ink` | `#f5f1ea` | Texto principal (branco quente) |
| `--color-lumia-ink-muted` | `#b3b0bd` | Texto secundário |
| `--color-lumia-ink-faint` | `#75727f` | Texto terciário / legendas |

Todas as cores geram utilitários Tailwind automaticamente
(ex.: `bg-lumia-gold`, `text-lumia-ink-muted`, `border-lumia-border`).

**Regra:** o Lumia é um app **dark-first**. Não introduzir modo claro sem uma
decisão de produto explícita.

## 3. Tipografia

- **Fonte principal:** stack de sistema (`-apple-system`, `SF Pro Display/Text`,
  fallback `Inter`).
- **Fonte de destaque (serif):** stack `New York` / `Iowan Old Style` /
  `Georgia` — usada em títulos de tela e no nome "Lumia".
- Uso:
  - Títulos de tela (`ScreenHeader`, `WelcomeScreen`, `MemoryDetailScreen`):
    `font-serif`, tamanhos entre 20–32px, `leading-tight`.
  - Corpo de texto: fonte padrão (`font-sans`), 13–15px, `leading-relaxed`.
  - Rótulos (`eyebrow`, labels de grupo): uppercase, `tracking-[0.15em]` a
    `tracking-[0.45em]`, tamanho 11–12px, cor `lumia-ink-faint` ou
    `lumia-gold/80`.

## 4. Espaçamento e respiração visual

- Padding horizontal padrão de tela: `px-6` (24px).
- Espaço generoso entre seções: mínimo `gap-6` / `mb-7`.
- Evitar mais de 2 níveis de hierarquia visual por tela.
- Cards e áreas de toque nunca "grudadas" nas bordas — sempre com margem de
  respiro.

## 5. Glassmorphism (vidro leve)

- `.glass-panel` — vidro leve, usado em cards padrão e nos campos do
  formulário de memória.
- `.glass-panel-strong` — vidro mais opaco/saturado, usado em elementos de
  destaque como a barra de navegação inferior, os toasts de feedback e o
  diálogo de confirmação de exclusão.

## 6. Sombras

- `--shadow-lumia-soft`: sombra suave e profunda para elementos flutuantes.
- `--shadow-lumia-glow`: brilho dourado suave atrás de elementos de destaque.

## 7. Bordas e raios

- Raio padrão de cards: `rounded-3xl` (24px).
- Raio de campos de formulário e imagens: `rounded-2xl`.
- Raio de botões e chips: sempre `rounded-full` (pill).

## 8. Animações e microinterações

Biblioteca: **Framer Motion**, exclusivamente. Easing padrão:
`cubic-bezier(0.22, 1, 0.36, 1)`.

Padrões já existentes (mantidos):

- Entrada de tela: fade + leve translação vertical + leve escala.
- Transição entre telas (`ScreenTransition`): fade + slide + scale sutil.
- Botões: ripple discreto no toque, `whileHover`/`whileTap`.
- Indicador ativo da navegação: `layoutId`.

Padrões adicionados na Etapa 3 (Sistema de Memórias):

- **Entrada de cartões de memória** (`MemoryCard`): fade + slide vertical com
  atraso escalonado por índice (`delay: 0.06 * index`), para uma sensação de
  "revelação" suave ao abrir Home/Timeline.
- **Feedback de salvar**: o botão de salvar assume um estado breve de
  "Guardando..." e, ao concluir, um toast discreto (`ToastContext`) confirma
  a ação sem bloquear a navegação.
- **Feedback de excluir**: `ConfirmDialog` (fade + slide + scale) exige
  confirmação explícita antes de qualquer exclusão; ao concluir, um toast
  discreto confirma a remoção.
- **Seletor de imagem** (`ImagePicker`): troca suave entre o estado vazio e a
  pré-visualização da imagem escolhida (`AnimatePresence mode="wait"`).

## 9. Ícones

Biblioteca: **Lucide React**, exclusivamente.

## 10. Gradientes

- Gradiente de destaque (botão primário, logo, botão "Criar"):
  `from-[#f3d9a8] to-[#c98f4a]` (dourado).
- Glow ambiente de fundo (`AppShell`): gradientes radiais sutis.

## 11. Textura (grão sutil)

- O `AppShell` aplica uma textura de ruído/grão muito discreta sobre toda a
  "vitrine" do app.

## 12. Componentes do Design System

Local: `src/components/ui/`

- `Logo`, `Button` (variantes `primary`, `glass`, `ghost` e, desde a Etapa 3,
  `danger`, usada em ações destrutivas), `GlassCard`, `IconButton`,
  `ScreenHeader` (agora com slot `leading` opcional para botão de voltar),
  `EmptyState`.
- **Novos nesta etapa:**
  - `Chip` — selo selecionável em pílula, usado para categoria e sentimento.
  - `ConfirmDialog` — diálogo de confirmação genérico para ações destrutivas.
  - `ImagePicker` — seletor de imagem de capa (galeria do dispositivo).

Local: `src/components/layout/`

- `AppShell`, `BottomNav`, `ScreenTransition` — inalterados nesta etapa.

Local: `src/components/memories/` *(novo na Etapa 3)*

- `MemoryCard` — cartão de memória reutilizado em Home, Timeline.
- `MemoryBadges` (`CategoryBadge`, `FeelingBadge`) — selos de categoria e
  sentimento, usados no cartão e na tela de detalhe.

## 13. Regras de consistência

- Nenhuma tela deve introduzir uma cor, fonte, raio ou sombra fora dos tokens
  acima sem atualizar este documento primeiro.
- Qualquer novo componente visual genérico deve ser criado em
  `src/components/ui/`; componentes visuais específicos do domínio de
  memórias vivem em `src/components/memories/` — nunca duplicar estilo
  diretamente em uma tela específica.
