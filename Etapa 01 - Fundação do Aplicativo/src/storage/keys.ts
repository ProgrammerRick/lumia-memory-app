/**
 * Chaves de armazenamento centralizadas — evita strings mágicas
 * espalhadas pelo app e facilita migrações futuras.
 */
export const STORAGE_KEYS = {
  memories: "memories",
  hasOnboarded: "has_onboarded",
  settings: "settings",
} as const;
