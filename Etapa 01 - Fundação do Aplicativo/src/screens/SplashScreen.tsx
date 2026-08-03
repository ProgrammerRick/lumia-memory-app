import { useEffect } from "react";
import { motion } from "framer-motion";
import { Logo } from "../components/Logo";
import { useNavigation } from "../navigation/NavigationContext";
import { useOnboarding } from "../hooks/useOnboarding";

/**
 * Tela de abertura do Lumia — breve, apenas para criar a sensação
 * ritualística de "acender uma luz" antes de entrar no app.
 */
export function SplashScreen() {
  const { goToRoot } = useNavigation();
  const { hasOnboarded } = useOnboarding();

  useEffect(() => {
    if (hasOnboarded === null) return;
    const timer = setTimeout(() => {
      goToRoot(hasOnboarded ? "Main" : "Welcome");
    }, 1800);
    return () => clearTimeout(timer);
  }, [hasOnboarded, goToRoot]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#0E0A1A]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(91,58,122,0.55) 0%, rgba(14,10,26,0.95) 65%)",
        }}
      />
      <Logo size={88} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative mt-6 text-[26px] font-semibold tracking-wide text-[#F8F4EE]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Lumia
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative mt-1 text-[13px] tracking-[0.2em] text-[#8A83A0]"
      >
        SUAS MEMÓRIAS, PARA SEMPRE
      </motion.p>
    </div>
  );
}
