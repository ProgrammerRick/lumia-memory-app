import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: ReactNode;
  onPress: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}

/**
 * Botão principal do Design System — usa `onPress` (e não `onClick`)
 * de propósito, para manter a API consistente com o que será usado
 * futuramente em React Native (`Pressable`/`TouchableOpacity`).
 */
export function PrimaryButton({
  children,
  onPress,
  icon,
  disabled,
  variant = "primary",
  fullWidth = true,
}: PrimaryButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold tracking-wide transition-opacity disabled:opacity-40 ${
        fullWidth ? "w-full" : ""
      } ${
        isPrimary
          ? "text-[#1D1633] shadow-[0_10px_30px_rgba(242,166,90,0.35)]"
          : "border border-white/15 text-[#F8F4EE] bg-white/5"
      }`}
      style={
        isPrimary
          ? {
              background:
                "linear-gradient(135deg, #F7D9A3 0%, #F2A65A 60%, #E8879A 100%)",
            }
          : undefined
      }
    >
      {icon}
      <span className="font-manrope text-[15px]">{children}</span>
    </motion.button>
  );
}
