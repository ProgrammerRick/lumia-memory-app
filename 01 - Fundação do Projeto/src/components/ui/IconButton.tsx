import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface IconButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  active?: boolean;
}

/**
 * Botão circular apenas com ícone — usado em cabeçalhos e barras de ação.
 */
export function IconButton({ children, active, className, ...props }: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300",
        active
          ? "bg-lumia-gold/15 text-lumia-gold"
          : "text-lumia-ink-muted hover:bg-white/5 hover:text-lumia-ink",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
