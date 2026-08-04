import type { MemoryCategory, MemoryFeeling } from "../types/memory";

export interface CategoryOption {
  value: MemoryCategory;
  label: string;
  emoji: string;
}

export interface FeelingOption {
  value: MemoryFeeling;
  label: string;
  emoji: string;
}

/** Opções de categoria disponíveis no formulário e nos selos de memória. */
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "viagem", label: "Viagem", emoji: "✈️" },
  { value: "familia", label: "Família", emoji: "🏡" },
  { value: "amor", label: "Amor", emoji: "💛" },
  { value: "amizade", label: "Amizade", emoji: "🤝" },
  { value: "conquista", label: "Conquista", emoji: "🏆" },
  { value: "cotidiano", label: "Cotidiano", emoji: "🌤️" },
];

/** Opções de sentimento disponíveis no formulário e nos selos de memória. */
export const FEELING_OPTIONS: FeelingOption[] = [
  { value: "feliz", label: "Feliz", emoji: "😊" },
  { value: "grato", label: "Grato", emoji: "🙏" },
  { value: "nostalgico", label: "Nostálgico", emoji: "🌙" },
  { value: "emocionado", label: "Emocionado", emoji: "🥹" },
  { value: "tranquilo", label: "Tranquilo", emoji: "🍃" },
  { value: "saudade", label: "Saudade", emoji: "🕯️" },
];

export function getCategoryOption(value: MemoryCategory): CategoryOption {
  return CATEGORY_OPTIONS.find((option) => option.value === value) ?? CATEGORY_OPTIONS[0];
}

export function getFeelingOption(value: MemoryFeeling): FeelingOption {
  return FEELING_OPTIONS.find((option) => option.value === value) ?? FEELING_OPTIONS[0];
}
