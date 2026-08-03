import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "../components/Logo";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenContainer } from "../components/ScreenContainer";
import { useNavigation } from "../navigation/NavigationContext";
import { useOnboarding } from "../hooks/useOnboarding";
import { fadeUp, staggerContainer, staggerItem } from "../animations/variants";

/**
 * Primeira tela funcional do Lumia: nome/logo, frase emocional e
 * botão para começar — exatamente como pedido na fundação do app.
 */
export function WelcomeScreen() {
  const { goToRoot } = useNavigation();
  const { complete } = useOnboarding();

  const handleStart = async () => {
    await complete();
    goToRoot("Main");
  };

  return (
    <ScreenContainer scroll={false} className="relative justify-between py-14">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(185,166,224,0.25) 0%, rgba(14,10,26,0) 45%), radial-gradient(circle at 90% 90%, rgba(242,166,90,0.2) 0%, rgba(14,10,26,0) 45%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <motion.div variants={staggerItem}>
          <Logo size={72} />
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="mt-8 text-[34px] font-semibold leading-tight text-[#F8F4EE]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Lumia
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mx-auto mt-4 max-w-[270px] text-[15px] leading-relaxed text-[#C9C2DA]"
        >
          Cada memória é uma pequena luz. O Lumia existe para guardar as suas
          — e deixar você revivê-las sempre que precisar.
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="mt-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#726C8A]"
        >
          <span className="h-px w-6 bg-[#726C8A]/50" />
          100% offline · sem cadastro
          <span className="h-px w-6 bg-[#726C8A]/50" />
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} initial="initial" animate="animate">
        <PrimaryButton onPress={handleStart} icon={<ArrowRight size={18} />}>
          Começar minha história
        </PrimaryButton>
        <p className="mt-4 text-center text-[12px] text-[#726C8A]">
          Suas memórias ficam guardadas apenas neste dispositivo.
        </p>
      </motion.div>
    </ScreenContainer>
  );
}
