import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  strong?: boolean;
  interactive?: boolean;
}

/**
 * Cartão de vidro (glassmorphism leve) — bloco visual reutilizável
 * para listas, seções e placeholders em todo o app.
 */
export function GlassCard({
  children,
  strong,
  interactive,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        strong ? "glass-panel-strong" : "glass-panel",
        "rounded-3xl",
        interactive && "cursor-pointer",
        className
      )}
      whileHover={interactive ? { scale: 1.01 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
