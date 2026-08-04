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
| `--color-lumia-ink` | `#f5f1ea` | Texto principal (branco quente) |
| `--color-lumia-ink-muted` | `#b3b0bd` | Texto secundário |
| `--color-lumia-ink-faint` | `#75727f` | Texto terciário / legendas |

Todas as cores geram utilitários Tailwind automaticamente
(ex.: `bg-lumia-gold`, `text-lumia-ink-muted`, `border-lumia-border`).

**Regra:** o Lumia é um app **dark-first**. Não introduzir modo claro sem uma
decisão de produto explícita — isso será avaliado em etapa futura própria
para "Aparência" nas Configurações.

## 3. Tipografia

- **Fonte principal:** stack de sistema (`-apple-system`, `SF Pro Display/Text`,
  fallback `Inter`) — herda a fonte San Francisco nativamente em dispositivos
  Apple, sem custo de carregamento e com máxima fidelidade premium.
- **Fonte de destaque (serif):** stack `New York` / `Iowan Old Style` /
  `Georgia` — usada em títulos de tela e no nome "Lumia" para trazer um toque
  editorial e nostálgico, como em um álbum de memórias.
- Uso:
  - Títulos de tela (`ScreenHeader`, `WelcomeScreen`): `font-serif`, tamanhos
    entre 28–32px, `leading-tight`.
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

Duas classes utilitárias globais (definidas em `src/index.css`):

- `.glass-panel` — vidro leve, usado em cards padrão.
- `.glass-panel-strong` — vidro mais opaco/saturado, usado em elementos de
  destaque como a barra de navegação inferior.

Características: `backdrop-filter: blur + saturate`, fundo em gradiente
translúcido branco muito sutil, borda de 1px em `rgba(255,255,255,0.08–0.1)`.
**Nunca usar vidro pesado/colorido** — o efeito deve ser discreto.

## 6. Sombras

- `--shadow-lumia-soft`: sombra suave e profunda para elementos flutuantes
  (ex.: barra de navegação).
- `--shadow-lumia-glow`: brilho dourado suave atrás de elementos de destaque
  (ex.: logo, botão primário).
- Preferir sombras difusas e escuras (`rgba(0,0,0,0.4–0.5)`) a sombras duras.

## 7. Bordas e raios

- Raio padrão de cards: `rounded-3xl` (24px).
- Raio da moldura do app (desktop): `rounded-[2.75rem]`.
- Raio de botões: sempre `rounded-full` (pill).
- Bordas sutis: `border border-white/10` ou `border-white/[0.06]` para
  divisórias internas discretas.

## 8. Animações e microinterações

Biblioteca: **Framer Motion**, exclusivamente. Easing padrão do produto:

```
--ease-lumia: cubic-bezier(0.22, 1, 0.36, 1)
```

Padrões:

- Entrada de tela: fade + leve translação vertical (8–16px), 0.35–0.6s.
- Transição entre telas (`ScreenTransition`): fade + slide sutil, `mode="wait"`
  no `AnimatePresence`, sem transições bruscas ou cortes secos.
- Botões: `whileHover={{ scale: 1.02–1.06 }}`, `whileTap={{ scale: 0.92–0.98 }}`.
- Indicador ativo da navegação: `layoutId` do Framer Motion para deslizar
  suavemente entre abas (ver `BottomNav`).
- Elementos "vivos" (logo, ícones de estado vazio): animação flutuante lenta
  (`--animate-float`, 6–7s, `ease-in-out`, `infinite`) e pulsação suave
  (`--animate-pulse-slow`).
- **Nunca** usar animações abruptas, bounces exagerados, ou efeitos "gamificados".

## 9. Ícones

Biblioteca: **Lucide React**, exclusivamente.

- Peso de traço padrão: `strokeWidth={1.75–2.25}`.
- Tamanhos comuns: 16px (itens de lista), 18–20px (navegação), 22–26px
  (estados vazios e destaques).
- Ícones ativos usam `text-lumia-gold`; inativos usam `text-lumia-ink-faint`
  ou `text-lumia-ink-muted`.

## 10. Gradientes

- Gradiente de destaque (botão primário, logo, botão "Criar"):
  `from-[#f3d9a8] to-[#c98f4a]` (dourado).
- Glow ambiente de fundo (`AppShell`): gradientes radiais muito sutis em
  lavanda (topo) e dourado (base), opacidade baixa (~0.12–0.14).
- Texto em destaque: classe utilitária `.text-gradient-gold`.

## 11. Componentes do Design System (já implementados)

Local: `src/components/ui/`

- `Logo` — marca do app (orbe de luz animado).
- `Button` — botão base com 3 variantes: `primary`, `glass`, `ghost`.
- `GlassCard` — cartão de vidro reutilizável, com variante `strong` e modo
  `interactive`.
- `IconButton` — botão circular apenas com ícone.
- `ScreenHeader` — cabeçalho padrão de tela (eyebrow + título serif + subtítulo).
- `EmptyState` — estado vazio ilustrado (ícone flutuante + título + descrição).

Local: `src/components/layout/`

- `AppShell` — moldura raiz do app (glow ambiente + vitrine em formato de
  telefone em telas grandes).
- `BottomNav` — navegação inferior fixa com indicador animado e botão de
  destaque central ("Criar").
- `ScreenTransition` — wrapper de transição de entrada/saída de tela.

## 12. Regras de consistência

- Nenhuma tela deve introduzir uma cor, fonte, raio ou sombra fora dos tokens
  acima sem atualizar este documento primeiro.
- Qualquer novo componente visual deve ser criado em `src/components/ui/` e
  reutilizado — nunca duplicar estilo diretamente em uma tela específica.
