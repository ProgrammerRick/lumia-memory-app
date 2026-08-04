import {
  Plane,
  Users,
  Heart,
  Sparkles,
  Trophy,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import type { MemoryCategory, MemoryFeeling } from "../types/memory";

interface CategoryMeta {
  value: MemoryCategory;
  label: string;
  icon: LucideIcon;
}

interface FeelingMeta {
  value: MemoryFeeling;
  label: string;
  emoji: string;
}

/** Opções de categoria disponíveis no formulário de memória e nos selos. */
export const CATEGORY_OPTIONS: CategoryMeta[] = [
  { value: "viagem", label: "Viagem", icon: Plane },
  { value: "familia", label: "Família", icon: Users },
  { value: "amor", label: "Amor", icon: Heart },
  { value: "amizade", label: "Amizade", icon: Sparkles },
  { value: "conquista", label: "Conquista", icon: Trophy },
  { value: "cotidiano", label: "Cotidiano", icon: Coffee },
];

/** Opções de sentimento disponíveis no formulário de memória e nos selos. */
export const FEELING_OPTIONS: FeelingMeta[] = [
  { value: "feliz", label: "Feliz", emoji: "😊" },
  { value: "grato", label: "Grato(a)", emoji: "🙏" },
  { value: "nostalgico", label: "Nostálgico(a)", emoji: "🕰️" },
  { value: "emocionado", label: "Emocionado(a)", emoji: "🥹" },
  { value: "tranquilo", label: "Tranquilo(a)", emoji: "🌙" },
  { value: "saudade", label: "Saudade", emoji: "🤎" },
];

export function getCategoryMeta(category: MemoryCategory): CategoryMeta {
  return CATEGORY_OPTIONS.find((option) => option.value === category) ?? CATEGORY_OPTIONS[5];
}

export function getFeelingMeta(feeling: MemoryFeeling): FeelingMeta {
  return FEELING_OPTIONS.find((option) => option.value === feeling) ?? FEELING_OPTIONS[0];
}
