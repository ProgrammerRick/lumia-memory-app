import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

/** Estado vazio elegante, reutilizado em Home, Timeline e outras listas. */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel flex flex-col items-center gap-4 rounded-3xl px-6 py-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.06]">
        <Icon className="h-6 w-6 text-lumia-gold" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-serif text-lg text-lumia-ink">{title}</h3>
        <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-lumia-ink-muted">
          {description}
        </p>
      </div>
      {action}
    </motion.div>
  );
}
