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
 *
 * Refinamento visual: halo externo com rotação muito lenta + pulsação de
 * brilho, para reforçar a sensação de "chama viva" sem chamar atenção
 * demais (movimento sutil, nunca abrupto).
 */
export function Logo({ size = 64, animated = true, className }: LogoProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Halo rotativo sutil */}
      {animated && (
        <motion.div
          className="absolute inset-[-18%] rounded-full opacity-60"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(232,181,115,0) 0%, rgba(232,181,115,0.35) 20%, rgba(232,181,115,0) 40%, rgba(155,156,230,0.22) 60%, rgba(232,181,115,0) 80%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Glow ambiente */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,181,115,0.55) 0%, rgba(232,181,115,0) 70%)",
        }}
        animate={animated ? { opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Núcleo */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          background:
            "radial-gradient(circle at 35% 30%, #fdf0d6 0%, #f3d9a8 28%, #e8b573 55%, #c98f4a 100%)",
          boxShadow:
            "0 0 28px rgba(232,181,115,0.65), 0 0 4px rgba(255,255,255,0.5), inset 0 2px 6px rgba(255,255,255,0.45), inset 0 -6px 10px rgba(120,66,15,0.35)",
        }}
        animate={animated ? { scale: [1, 1.03, 1] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
