import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import type { Memory } from "../../types/memory";
import { formatMemoryDateShort } from "../../utils/date";
import { CategoryBadge } from "./MemoryBadges";
import { MediaTypeIndicator } from "../media/MediaTypeIndicator";

interface MemoryCardProps {
  memory: Memory;
  index?: number;
  onClick: () => void;
}

/** Cartão resumido de uma memória, reutilizado em Home e Timeline. */
export function MemoryCard({ memory, index = 0, onClick }: MemoryCardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(index, 8) * 0.05 }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="glass-panel flex cursor-pointer gap-4 rounded-3xl p-4 transition-colors hover:bg-white/[0.05]"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/[0.06]">
        {memory.coverImage ? (
          <img
            src={memory.coverImage}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg text-lumia-ink-faint">
            ✦
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 overflow-hidden">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
          <span>{formatMemoryDateShort(memory.date)}</span>
          <MediaTypeIndicator media={memory.media} />
        </div>
        <h3 className="truncate font-serif text-base text-lumia-ink">{memory.title}</h3>
        <div>
          <CategoryBadge category={memory.category} />
        </div>
      </div>
    </motion.div>
  );
}
