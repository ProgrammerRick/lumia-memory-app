// ================================
// LUMIA DESIGN SYSTEM — Constants
// ================================

export const LUMIA_COLORS = {
  primary: {
    amber: '#FFAA3E',
    gold: '#F59222',
    deep: '#D97618',
  },
  accent: {
    violet: '#8B5CF6',
    lavender: '#A87FFF',
    purple: '#7C3AED',
  },
  background: {
    dark: '#1A1025',
    surface: '#1E1430',
    elevated: '#2F2148',
    card: 'rgba(46, 33, 72, 0.6)',
  },
  text: {
    primary: '#F8F6FC',
    secondary: '#C4B8DB',
    muted: '#8972AF',
    accent: '#FFAA3E',
  },
} as const;

export const LUMIA_SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
} as const;

export const LUMIA_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

export const LUMIA_TRANSITIONS = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '400ms ease-out',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
