import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ChipProps {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Selo selecionável em formato de pílula — usado para escolher categoria e
 * sentimento no formulário de memória. Reutilizável em qualquer seleção
 * curta de opções futura.
 */
export function Chip({ label, icon, selected, onClick }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-colors duration-300",
        selected
          ? "border-lumia-gold/50 bg-lumia-gold/15 text-lumia-gold"
          : "border-white/10 bg-white/[0.03] text-lumia-ink-muted hover:border-white/20 hover:text-lumia-ink"
      )}
    >
      {icon}
      {label}
    </motion.button>
  );
}
