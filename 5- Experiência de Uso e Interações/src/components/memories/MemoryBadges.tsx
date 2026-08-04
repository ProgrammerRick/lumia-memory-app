import { getCategoryMeta, getFeelingMeta } from "../../utils/memoryMeta";
import type { MemoryCategory, MemoryFeeling } from "../../types/memory";

/** Selo compacto exibindo a categoria de uma memória (ícone + rótulo). */
export function CategoryBadge({ category }: { category: MemoryCategory }) {
  const meta = getCategoryMeta(category);
  const Icon = meta.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[11.5px] font-medium text-lumia-ink-muted">
      <Icon size={13} strokeWidth={2} />
      {meta.label}
    </span>
  );
}

/** Selo compacto exibindo o sentimento de uma memória (emoji + rótulo). */
export function FeelingBadge({ feeling }: { feeling: MemoryFeeling }) {
  const meta = getFeelingMeta(feeling);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-lumia-gold/10 px-3 py-1.5 text-[11.5px] font-medium text-lumia-gold">
      <span aria-hidden>{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
