import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "glass" | "ghost";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-b from-[#f3d9a8] to-[#c98f4a] text-[#241505] shadow-[0_10px_30px_-10px_rgba(232,181,115,0.6)]",
  glass: "glass-panel text-lumia-ink hover:border-white/20",
  ghost: "text-lumia-ink-muted hover:text-lumia-ink",
};

/**
 * Botão base do Design System Lumia.
 * Sempre com microinteração de escala no toque/hover.
 */
export function Button({
  variant = "primary",
  children,
  icon,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium tracking-wide transition-colors duration-300",
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
