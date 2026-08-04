import type { MemoryCategory, MemoryFeeling } from "../../types/memory";
import { getCategoryOption, getFeelingOption } from "../../utils/memoryMeta";

export function CategoryBadge({ category }: { category: MemoryCategory }) {
  const option = getCategoryOption(category);
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-lumia-ink-muted">
      <span aria-hidden="true">{option.emoji}</span>
      {option.label}
    </span>
  );
}

export function FeelingBadge({ feeling }: { feeling: MemoryFeeling }) {
  const option = getFeelingOption(feeling);
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-lumia-gold/10 px-2.5 py-1 text-[11px] font-medium text-lumia-gold">
      <span aria-hidden="true">{option.emoji}</span>
      {option.label}
    </span>
  );
}
