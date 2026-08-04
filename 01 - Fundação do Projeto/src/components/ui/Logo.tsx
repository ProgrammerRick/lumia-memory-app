import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * Marca do Lumia: um orbe de luz quente, símbolo de memória acesa.
 * Construído em SVG/CSS para permanecer nítido em qualquer resolução.
 */
export function Logo({ size = 64, animated = true, className }: LogoProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,181,115,0.55) 0%, rgba(232,181,115,0) 70%)",
        }}
        animate={animated ? { opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="relative rounded-full"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          background:
            "radial-gradient(circle at 35% 30%, #f8e3bb 0%, #e8b573 45%, #c98f4a 100%)",
          boxShadow:
            "0 0 24px rgba(232,181,115,0.6), inset 0 2px 6px rgba(255,255,255,0.4)",
        }}
      />
    </div>
  );
}
