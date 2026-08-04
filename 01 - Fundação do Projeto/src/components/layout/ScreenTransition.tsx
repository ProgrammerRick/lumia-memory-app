import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de transição padrão para as telas internas do app.
 * Deve envolver o conteúdo de cada tela renderizada dentro do <AnimatePresence>.
 */
export function ScreenTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
