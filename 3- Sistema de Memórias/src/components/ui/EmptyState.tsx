import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

/**
 * Estado vazio elegante — usado nas telas que ainda não têm conteúdo
 * (Home, Timeline) nesta fase inicial do produto.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center"
    >
      <motion.div
        className="relative flex h-16 w-16 items-center justify-center rounded-full glass-panel text-lumia-gold"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-lumia-gold/10 blur-xl animate-pulse-slow" />
        {icon}
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-[19px] font-medium text-lumia-ink">{title}</h2>
        <p className="mx-auto max-w-[260px] text-[14px] leading-relaxed text-lumia-ink-faint">
          {description}
        </p>
      </div>
      {action}
    </motion.div>
  );
}
