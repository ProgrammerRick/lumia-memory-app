import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Transição padrão entre telas: fade + leve translação + escala sutil. */
export function ScreenTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full flex-1 flex-col overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
