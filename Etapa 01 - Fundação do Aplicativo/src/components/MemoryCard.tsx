import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { Memory, MemoryAccent } from "../types/memory";
import { formatMemoryDate, timeAgoInWords } from "../utils/date";
import { staggerItem } from "../animations/variants";

const ACCENT_GRADIENTS: Record<MemoryAccent, string> = {
  gold: "linear-gradient(135deg, #F7D9A3 0%, #F2A65A 100%)",
  coral: "linear-gradient(135deg, #F2A65A 0%, #E8879A 100%)",
  lavender: "linear-gradient(135deg, #B9A6E0 0%, #7C6BA8 100%)",
  rose: "linear-gradient(135deg, #E8A0BF 0%, #B9749A 100%)",
};

interface MemoryCardProps {
  memory: Memory;
  onDelete?: (id: string) => void;
}

export function MemoryCard({ memory, onDelete }: MemoryCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="group relative mb-4 overflow-hidden rounded-3xl border border-white/10 bg-[#1D1633]"
    >
      {memory.photoUri ? (
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={memory.photoUri}
            alt={memory.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1633] via-transparent to-transparent" />
        </div>
      ) : (
        <div
          className="h-3 w-full"
          style={{ background: ACCENT_GRADIENTS[memory.accentColor] }}
        />
      )}

      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F5C177]">
            {timeAgoInWords(memory.occurredAt)}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(memory.id)}
              className="rounded-full p-1.5 text-[#8A83A0] opacity-0 transition hover:text-[#E8879A] group-hover:opacity-100"
              aria-label="Excluir memória"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
        <h3
          className="mb-1 text-[17px] font-semibold text-[#F8F4EE]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {memory.title}
        </h3>
        {memory.description && (
          <p className="mb-2 line-clamp-2 text-[13.5px] leading-relaxed text-[#C9C2DA]">
            {memory.description}
          </p>
        )}
        <p className="text-[12px] text-[#8A83A0]">
          {formatMemoryDate(memory.occurredAt)}
        </p>
      </div>
    </motion.div>
  );
}
