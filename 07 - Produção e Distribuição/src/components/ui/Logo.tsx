import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const SIZE_MAP: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-10 w-10 text-base",
  md: "h-16 w-16 text-2xl",
  lg: "h-24 w-24 text-4xl",
};

/**
 * Marca visual do Lumia: um selo circular com brilho dourado ambiente e a
 * letra "L", remetendo a uma pequena chama/luz guardada.
 */
export function Logo({ size = "md", animated = true, className }: LogoProps) {
  const Wrapper = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        animate: { boxShadow: ["var(--shadow-lumia-glow)", "0 0 80px -8px rgba(232,181,115,0.5)", "var(--shadow-lumia-glow)"] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <Wrapper
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#f3d9a8] via-lumia-gold to-[#c98f4a] font-serif font-semibold text-lumia-void shadow-[var(--shadow-lumia-glow)]",
        SIZE_MAP[size],
        className,
      )}
      {...animationProps}
    >
      <span aria-hidden="true">L</span>
      <span className="sr-only">Lumia</span>
    </Wrapper>
  );
}
