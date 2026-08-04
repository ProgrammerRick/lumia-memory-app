import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  strong?: boolean;
}

/** Superfície de vidro leve reutilizada em cards, formulários e diálogos. */
export function GlassCard({ strong = false, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-5",
        strong ? "glass-panel-strong" : "glass-panel",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
