import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de transição padrão para as telas internas do app.
 * Deve envolver o conteúdo de cada tela renderizada dentro do <AnimatePresence>.
 *
 * Refinamento visual: além do fade + slide vertical, um leve scale de
 * entrada/saída para dar profundidade sem quebrar a suavidade do movimento.
 */
export function ScreenTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
