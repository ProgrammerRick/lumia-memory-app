import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, BookHeart, Camera, Sparkles } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { useNavigation } from "../context/NavigationContext";
import { markOnboardingCompleted } from "../utils/onboarding";

interface OnboardingStep {
  icon: typeof Sparkles;
  eyebrow: string;
  title: string;
  description: string;
}

const STEPS: OnboardingStep[] = [
  {
    icon: Sparkles,
    eyebrow: "Bem-vindo(a)",
    title: "Este é o Lumia",
    description:
      "Um lugar quieto e bonito, só seu, para guardar os momentos que você nunca quer esquecer.",
  },
  {
    icon: BookHeart,
    eyebrow: "O conceito",
    title: "Cada memória é uma luz",
    description:
      "Uma memória guarda um título, uma data, uma categoria, um sentimento — e, se quiser, fotos, vídeos e áudios daquele instante.",
  },
  {
    icon: Camera,
    eyebrow: "Como começar",
    title: "Toque em Criar para guardar a primeira",
    description:
      "No botão dourado da navegação, toque em Criar, escreva o que aconteceu e guarde. Tudo fica salvo apenas no seu dispositivo.",
  },
];

/**
 * Apresentação inicial do Lumia (Etapa 5 — Experiência de Uso).
 *
 * Exibida apenas uma vez, na primeira visita — reaproveita integralmente os
 * componentes visuais já existentes (`Logo`, `Button`, `GlassCard`) e o
 * mesmo padrão de transição/easing do restante do app, sem introduzir
 * nenhum estilo novo. Ao concluir (ou pular), marca a conclusão em
 * `localStorage` e segue para a Home.
 */
export function OnboardingScreen() {
  const { navigate } = useNavigation();
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const Icon = current.icon;

  const finish = () => {
    markOnboardingCompleted();
    navigate("home");
  };

  return (
    <div className="flex h-full w-full flex-col justify-between px-7 pb-10 pt-[calc(env(safe-area-inset-top)+28px)]">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full items-center justify-between">
          <Logo size={40} animated={false} />
          <button
            type="button"
            onClick={finish}
            className="text-[13px] font-medium text-lumia-ink-faint transition-colors hover:text-lumia-ink-muted"
          >
            Pular
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center gap-6 pt-6 text-center"
          >
            <GlassCard className="flex h-16 w-16 items-center justify-center !rounded-full text-lumia-gold">
              <Icon size={26} strokeWidth={1.75} />
            </GlassCard>

            <div className="flex flex-col items-center gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-lumia-gold/80">
                {current.eyebrow}
              </p>
              <h1 className="max-w-[280px] font-serif text-[26px] leading-tight text-lumia-ink">
                {current.title}
              </h1>
              <p className="max-w-[280px] text-[14.5px] leading-relaxed text-lumia-ink-muted">
                {current.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Progresso da apresentação">
          {STEPS.map((_, index) => (
            <motion.span
              key={index}
              role="tab"
              aria-selected={index === step}
              className="h-1.5 rounded-full bg-lumia-gold"
              animate={{
                width: index === step ? 22 : 6,
                opacity: index === step ? 1 : 0.28,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        <Button
          variant="primary"
          fullWidth
          icon={<ArrowRight size={18} />}
          className="flex-row-reverse"
          onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
        >
          {isLast ? "Guardar minha primeira memória" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
