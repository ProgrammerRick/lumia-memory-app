import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  animated?: boolean;
}

/**
 * Marca do Lumia: um pequeno "sol/vela" — símbolo de luz e memória.
 * Feito em SVG para nitidez em qualquer densidade de tela.
 */
export function Logo({ size = 64, animated = true }: LogoProps) {
  return (
    <motion.div
      animate={
        animated
          ? { scale: [1, 1.05, 1], opacity: [0.92, 1, 0.92] }
          : undefined
      }
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(245,193,119,0.55) 0%, rgba(245,193,119,0) 70%)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className="relative"
      >
        <defs>
          <linearGradient id="lumia-grad" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#F7D9A3" />
            <stop offset="55%" stopColor="#F2A65A" />
            <stop offset="100%" stopColor="#B9A6E0" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="14" fill="url(#lumia-grad)" />
        <g stroke="url(#lumia-grad)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="32" y1="4" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="60" />
          <line x1="4" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="60" y2="32" />
          <line x1="12.7" y1="12.7" x2="18.3" y2="18.3" />
          <line x1="45.7" y1="45.7" x2="51.3" y2="51.3" />
          <line x1="51.3" y1="12.7" x2="45.7" y2="18.3" />
          <line x1="18.3" y1="45.7" x2="12.7" y2="51.3" />
        </g>
      </svg>
    </motion.div>
  );
}
