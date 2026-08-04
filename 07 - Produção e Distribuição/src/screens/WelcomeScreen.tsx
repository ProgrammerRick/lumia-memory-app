import { motion } from "framer-motion";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { useNavigation } from "../context/NavigationContext";
import { hasCompletedOnboarding } from "../utils/onboarding";

/**
 * Tela de entrada do app. Decide, ao tocar em "Começar", entre ir para o
 * onboarding (primeira vez) ou direto para a Home (visitas seguintes).
 */
export function WelcomeScreen() {
  const { navigate } = useNavigation();

  function handleStart() {
    navigate(hasCompletedOnboarding() ? "home" : "onboarding");
  }

  return (
    <div className="relative flex h-full flex-1 flex-col justify-end overflow-hidden">
      <img
        src="/images/welcome-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lumia-bg via-lumia-bg/70 to-lumia-bg/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 px-8 pb-14 text-center"
      >
        <Logo size="lg" />
        <div>
          <h1 className="text-gradient-gold font-serif text-3xl leading-tight">Lumia</h1>
          <p className="mx-auto mt-3 max-w-[260px] text-sm leading-relaxed text-lumia-ink-muted">
            Um lugar quieto e precioso para guardar suas memórias mais importantes.
          </p>
        </div>
        <Button className="w-full max-w-xs" onClick={handleStart}>
          Começar
        </Button>
      </motion.div>
    </div>
  );
}
