/**
 * Lumia Design System — Spacing & Radius
 * Escala consistente para preservar ritmo visual em todo o app.
 */

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const shadow = {
  soft: "0 8px 30px rgba(0, 0, 0, 0.35)",
  glow: "0 0 40px rgba(245, 193, 119, 0.25)",
  card: "0 12px 24px rgba(0, 0, 0, 0.3)",
} as const;
