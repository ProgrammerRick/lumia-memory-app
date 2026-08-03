import type { Variants } from "framer-motion";

/**
 * Sistema de animações do Lumia.
 * Curvas suaves e discretas — nada abrupto, para reforçar a
 * sensação premium/emocional pedida no Design System.
 */

export const easeLumia = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeLumia } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: easeLumia } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: easeLumia } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const screenTransition: Variants = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeLumia } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2, ease: easeLumia } },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeLumia } },
};

export const pressable = {
  whileTap: { scale: 0.96 },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.06, 1],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};
