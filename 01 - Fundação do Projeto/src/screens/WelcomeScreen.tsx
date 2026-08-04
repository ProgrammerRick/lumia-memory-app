import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { useNavigation } from "../context/NavigationContext";

/**
 * Tela de entrada do Lumia.
 * Primeira impressão do app — precisa transmitir calma, elegância e emoção
 * em segundos. Nenhuma ação além de avançar para a Home.
 */
export function WelcomeScreen() {
  const { navigate } = useNavigation();

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <img
        src="/images/welcome-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-lumia-void/40 via-lumia-void/70 to-lumia-void" />

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
            <Button
              variant="primary"
              fullWidth
              icon={<ArrowRight size={18} />}
              className="max-w-[280px] flex-row-reverse"
              onClick={() => navigate("home")}
            >
              Começar
            </Button>
            <p className="text-[12px] tracking-wide text-lumia-ink-faint">
              Suas memórias. Só suas.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
