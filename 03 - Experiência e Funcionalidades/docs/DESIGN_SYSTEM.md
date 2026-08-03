# Lumia Design System


## Estilo

Premium
Minimalista
Emocional


## Direção visual

O aplicativo deve parecer:

- elegante
- moderno
- tranquilo


## Regras

Nenhuma mudança visual grande sem aprovação.


## Componentes

Todos os componentes devem seguir o mesmo padrão.


---

## Paleta de Cores (v0.2)

### Primária — Âmbar/Gold
Transmite calor, nostalgia, luz de memórias.

- `lumia-50` → `#FFF8F0`
- `lumia-100` → `#FFEFD6`
- `lumia-200` → `#FFDCA8`
- `lumia-300` → `#FFC573`
- `lumia-400` → `#FFAA3E` ← Principal
- `lumia-500` → `#F59222`
- `lumia-600` → `#D97618`
- `lumia-700` → `#B45A14`
- `lumia-800` → `#8E4512`
- `lumia-900` → `#6B3410`

### Acento — Violet
Transmite profundidade, elegância, mistério.

- `violet-400` → `#A87FFF`
- `violet-500` → `#8B5CF6`
- `violet-600` → `#7C3AED`
- `violet-900` → `#4C1D95`

### Background — Night
Fundo escuro que valoriza o conteúdo.

- `night-950` → `#1A1025` ← Background principal
- `night-900` → `#2D2341`
- `surface-primary` → `#1E1430`
- `surface-elevated` → `#2F2148`
- `surface-card` → `rgba(46, 33, 72, 0.6)`
- `surface-glass` → `rgba(255, 255, 255, 0.05)`

### Texto
- `text-primary` → `#F8F6FC`
- `text-secondary` → `#C4B8DB`
- `text-muted` → `#8972AF`
- `text-accent` → `#FFAA3E`


## Tipografia

### Sans — Inter
Usado para: UI, corpo de texto, botões, labels, navegação.
Pesos: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Display — Playfair Display
Usado para: títulos emocionais, marca, headings de impacto.
Pesos: 400, 500, 600, 700


## Espaçamentos

- `xs` → 4px
- `sm` → 8px
- `md` → 16px
- `lg` → 24px
- `xl` → 32px
- `2xl` → 48px
- `3xl` → 64px


## Bordas

- `radius-sm` → 8px
- `radius-md` → 12px
- `radius-lg` → 16px
- `radius-xl` → 24px
- `radius-2xl` → 32px
- `radius-full` → 9999px


## Sombras

- `shadow-glow-sm` → glow sutil com lumia amber
- `shadow-glow-md` → glow médio
- `shadow-glow-lg` → glow intenso
- `shadow-glow-violet` → glow violet para acento
- `shadow-card` → sombra padrão para cards
- `shadow-elevated` → sombra para elementos elevados


## Efeitos

### Glassmorphism
- `.glass` → blur 12px, fundo 5% branco, borda 8% branco
- `.glass-strong` → blur 20px, fundo 8% branco, borda 12% branco

### Gradientes de Texto
- `.text-gradient-lumia` → amber dourado
- `.text-gradient-violet` → roxo elegante
- `.text-gradient-warm` → degradê quente


## Componentes Disponíveis

### UI
- `Button` — primary, secondary, ghost, outline, glow
- `Card` — default, glass, elevated, gradient
- `EmptyState` — para estados sem conteúdo
- `MemoryCard` — card de memória com imagem/mood

### Layout
- `Header` — fixo, glassmorphism, ações laterais
- `BottomNav` — navegação inferior com 4 tabs
- `Container` — wrapper responsivo

### Animated
- `FadeIn` — fade com slide direcional
- `StaggerChildren` / `StaggerItem` — animação escalonada

### Brand
- `LumiaLogo` — ícone com gradiente amber
- `LumiaWordmark` — texto "Lumia" com gradiente
