import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { screenTransition } from "../animations/variants";

interface ScreenContainerProps {
  children: ReactNode;
  scroll?: boolean;
  className?: string;
}

/**
 * Wrapper padrão de tela — aplica transição de entrada/saída
 * consistente e área segura de topo/rodapé (simulando notch e
 * home-indicator de um dispositivo real).
 */
export function ScreenContainer({
  children,
  scroll = true,
  className = "",
}: ScreenContainerProps) {
  return (
    <motion.div
      variants={screenTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex h-full w-full flex-col px-5 ${
        scroll ? "overflow-y-auto" : "overflow-hidden"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
