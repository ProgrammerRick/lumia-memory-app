import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { MediaTypeIndicator } from "../media/MediaTypeIndicator";
import { formatMemoryDateShort } from "../../utils/date";
import { getCategoryMeta, getFeelingMeta } from "../../utils/memoryMeta";
import type { Memory } from "../../types/memory";

interface MemoryCardProps {
  memory: Memory;
  index?: number;
  onClick?: () => void;
}

/**
 * Cartão de memória reutilizável — usado na Home (últimas memórias) e na
 * Timeline (linha do tempo completa). Mostra a capa (se houver), título,
 * data curta, categoria e sentimento.
 *
 * Desde a Etapa 4, exibe também pequenos ícones discretos (`MediaTypeIndicator`)
 * indicando se a memória possui fotos, vídeos e/ou áudios anexados — sem
 * alterar a estrutura, o tamanho ou o estilo original do cartão.
 */
export function MemoryCard({ memory, index = 0, onClick }: MemoryCardProps) {
  const category = getCategoryMeta(memory.category);
  const feeling = getFeelingMeta(memory.feeling);
  const CategoryIcon = category.icon;

  return (
    <GlassCard
      interactive
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3.5 overflow-hidden p-3"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/5">
        {memory.coverImage ? (
          <img src={memory.coverImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lumia-ink-faint">
            <ImageOff size={20} strokeWidth={1.75} />
          </div>
        )}
        <span className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            {formatMemoryDateShort(memory.date)}
          </span>
          <span aria-hidden className="text-[13px]">
            {feeling.emoji}
          </span>
        </div>
        <h3 className="truncate text-[15px] font-medium text-lumia-ink">{memory.title}</h3>
        <div className="flex items-center gap-2.5">
          <span className="inline-flex w-fit items-center gap-1.5 text-[12px] text-lumia-ink-muted">
            <CategoryIcon size={12} strokeWidth={2} />
            {category.label}
          </span>
          <MediaTypeIndicator media={memory.media} />
        </div>
      </div>

      <motion.span
        aria-hidden
        className="self-center text-lumia-ink-faint"
        initial={false}
      >
        ›
      </motion.span>
    </GlassCard>
  );
}
