import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";

interface IconButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  active?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Botão circular apenas com ícone — usado em cabeçalhos e barras de ação.
 * Inclui um ripple discreto para reforçar o feedback de toque.
 */
export function IconButton({ children, active, className, onPointerDown, ...props }: IconButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown: HTMLMotionProps<"button">["onPointerDown"] = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const ripple: Ripple = {
      id: Date.now(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 600);
    onPointerDown?.(event);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={handlePointerDown}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full transition-colors duration-300",
        active
          ? "bg-lumia-gold/15 text-lumia-gold"
          : "text-lumia-ink-muted hover:bg-white/5 hover:text-lumia-ink",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center">{children}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.22, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute rounded-full bg-white"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
