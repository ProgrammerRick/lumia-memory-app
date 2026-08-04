import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Logo } from "../components/ui/Logo";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { useNavigation } from "../context/NavigationContext";
import { markOnboardingCompleted } from "../utils/onboarding";
import { cn } from "../utils/cn";

interface Step {
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    title: "Bem-vindo ao Lumia",
    description:
      "Um santuário pessoal para guardar os momentos que você não quer esquecer — com calma e elegância.",
  },
  {
    title: "Cada memória é uma luz",
    description:
      "Fotos, textos, vídeos e áudios guardados juntos, exatamente como aconteceram, sempre com você.",
  },
  {
    title: "Comece pela primeira",
    description: "Toque em \"Criar\" a qualquer momento para guardar sua primeira memória.",
  },
];

/** Apresentação inicial de três passos, exibida apenas na primeira visita. */
export function OnboardingScreen() {
  const { navigate } = useNavigation();
  const [stepIndex, setStepIndex] = useState(0);
  const isLast = stepIndex === STEPS.length - 1;

  function handleNext() {
    if (isLast) {
      markOnboardingCompleted();
      navigate("home");
      return;
    }
    setStepIndex((current) => current + 1);
  }

  function handleSkip() {
    markOnboardingCompleted();
    navigate("home");
  }

  const step = STEPS[stepIndex];

  return (
    <div className="flex h-full flex-1 flex-col justify-between px-6 pb-10 pt-16">
      <div className="flex flex-col items-center gap-8 text-center">
        <Logo size="md" />
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <GlassCard className="w-full">
              <h2 className="font-serif text-xl text-lumia-ink">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-lumia-ink-muted">{step.description}</p>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {STEPS.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === stepIndex ? "w-6 bg-lumia-gold" : "w-1.5 bg-white/[0.15]",
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={handleNext}>{isLast ? "Começar a guardar memórias" : "Continuar"}</Button>
        {!isLast && (
          <Button variant="ghost" onClick={handleSkip}>
            Pular apresentação
          </Button>
        )}
      </div>
    </div>
  );
}
