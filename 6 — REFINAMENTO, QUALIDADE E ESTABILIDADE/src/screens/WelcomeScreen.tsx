import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { useNavigation } from "../context/NavigationContext";
import { hasCompletedOnboarding } from "../utils/onboarding";

/**
 * Tela de entrada do Lumia.
 * Primeira impressão do app — precisa transmitir calma, elegância e emoção
 * em segundos. A partir da Etapa 5, o botão "Começar" leva ao onboarding
 * (para quem ainda não o viu) em vez de ir direto para a Home.
 */
export function WelcomeScreen() {
  const { navigate } = useNavigation();

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <motion.img
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        src="/images/welcome-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-lumia-void/40 via-lumia-void/70 to-lumia-void" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_15%,rgba(0,0,0,0)_0%,rgba(5,5,6,0.55)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 pb-12 pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 pt-6"
        >
          <Logo size={88} />
          <div className="text-center">
            <h1 className="font-serif text-[15px] uppercase tracking-[0.45em] text-lumia-ink-muted">
              Lumia
            </h1>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[300px] text-center"
          >
            <h2 className="font-serif text-[30px] leading-[1.25] text-lumia-ink">
              Onde suas memórias{" "}
              <span className="text-gradient-gold">ganham luz</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-lumia-ink-muted">
              Um lugar quieto e bonito para guardar os momentos que você nunca
              quer esquecer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="relative w-full max-w-[280px]">
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full bg-lumia-gold/30 blur-xl"
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Button
                variant="primary"
                fullWidth
                icon={<ArrowRight size={18} />}
                className="relative flex-row-reverse"
                onClick={() => navigate(hasCompletedOnboarding() ? "home" : "onboarding")}
              >
                Começar
              </Button>
            </div>
            <p className="text-[12px] tracking-wide text-lumia-ink-faint">
              Suas memórias. Só suas.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
