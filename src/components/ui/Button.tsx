import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "glass" | "ghost" | "danger";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  /** Exibe um spinner e desabilita o botão, sem alterar seu tamanho/layout. */
  loading?: boolean;
  children?: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#f3d9a8] to-[#c98f4a] text-lumia-void shadow-[var(--shadow-lumia-glow)]",
  glass: "glass-panel text-lumia-ink",
  ghost: "bg-transparent text-lumia-ink-muted hover:text-lumia-ink",
  danger: "bg-lumia-rose/15 text-lumia-rose border border-lumia-rose/30",
};

/**
 * Botão padrão do Design System. Ganhou a prop `loading` na Etapa 5 para
 * feedback visual de ações assíncronas, sem introduzir um novo componente.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", loading = false, disabled, className, children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide transition-opacity disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </motion.button>
  );
});
