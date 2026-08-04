import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ChipProps {
  label: string;
  emoji?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Chip selecionável em formato pílula, usado em categorias, sentimentos e mídia. */
export function Chip({ label, emoji, selected = false, onClick, className }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-pressed={onClick ? selected : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors",
        selected
          ? "border-transparent bg-gradient-to-r from-[#f3d9a8] to-[#c98f4a] text-lumia-void"
          : "border-lumia-border bg-white/[0.03] text-lumia-ink-muted hover:text-lumia-ink",
        className,
      )}
    >
      {emoji && <span aria-hidden="true">{emoji}</span>}
      {label}
    </motion.button>
  );
}
