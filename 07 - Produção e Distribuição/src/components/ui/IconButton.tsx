import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "../../utils/cn";

interface IconButtonProps extends HTMLMotionProps<"button"> {
  variant?: "glass" | "solid" | "ghost";
  "aria-label": string;
}

const VARIANT_CLASSES: Record<NonNullable<IconButtonProps["variant"]>, string> = {
  glass: "glass-panel text-lumia-ink",
  solid: "bg-gradient-to-br from-[#f3d9a8] to-[#c98f4a] text-lumia-void",
  ghost: "bg-white/[0.04] text-lumia-ink-muted hover:text-lumia-ink",
};

/** Botão circular apenas com ícone, usado em cabeçalhos e ações rápidas. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = "glass", className, children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});
