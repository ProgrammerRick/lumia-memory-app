import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "glass" | "ghost" | "danger";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-[#f3d9a8] to-[#c98f4a] text-[#241505] shadow-[0_10px_30px_-10px_rgba(232,181,115,0.6)] ring-1 ring-inset ring-white/40",
  glass: "glass-panel text-lumia-ink hover:border-white/20",
  ghost: "text-lumia-ink-muted hover:text-lumia-ink",
  danger:
    "bg-lumia-rose/15 text-lumia-rose ring-1 ring-inset ring-lumia-rose/30 hover:bg-lumia-rose/20",
};

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Botão base do Design System Lumia.
 * Sempre com microinteração de escala no toque/hover e um ripple discreto
 * (expansão suave e translúcida a partir do ponto de toque).
 *
 * A variante `danger` foi adicionada na Etapa 3 para ações destrutivas
 * (ex.: confirmar exclusão de uma memória), mantendo o mesmo contrato.
 */
export function Button({
  variant = "primary",
  children,
  icon,
  fullWidth,
  className,
  onPointerDown,
  disabled,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown: HTMLMotionProps<"button">["onPointerDown"] = (event) => {
    if (disabled) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const ripple: Ripple = {
      id: Date.now() + Math.random(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 650);
    onPointerDown?.(event);
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={handlePointerDown}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-medium tracking-wide transition-colors duration-300",
        variantClasses[variant],
        fullWidth && "w-full",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.28, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute rounded-full bg-white"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
