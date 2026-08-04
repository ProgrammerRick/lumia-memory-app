import { motion } from "framer-motion";
import { Home, Clock, Plus, Settings } from "lucide-react";
import { useNavigation } from "../../context/NavigationContext";
import type { TabScreen } from "../../types/navigation";
import { cn } from "../../utils/cn";

const NAV_ITEMS: { screen: TabScreen; label: string; icon: typeof Home }[] = [
  { screen: "home", label: "Início", icon: Home },
  { screen: "timeline", label: "Linha do tempo", icon: Clock },
  { screen: "create", label: "Criar", icon: Plus },
  { screen: "settings", label: "Ajustes", icon: Settings },
];

/**
 * Navegação inferior fixa — presente em todas as telas principais
 * (não aparece na tela Welcome). O botão "Criar" recebe destaque visual
 * pois representa a ação central do app: registrar uma memória.
 *
 * Refinamento visual: friso de luz superior sutil, brilho mais rico no
 * botão de destaque e indicador ativo com glow suave.
 */
export function BottomNav() {
  const { screen, navigate } = useNavigation();

  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 px-5 pb-[calc(env(safe-area-inset-bottom)+18px)] pt-3">
      <div className="glass-panel-strong relative flex items-center justify-between rounded-[28px] px-3 py-2.5 shadow-lumia-soft">
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {NAV_ITEMS.map(({ screen: itemScreen, label, icon: Icon }) => {
          const isActive = screen === itemScreen;
          const isCreate = itemScreen === "create";

          if (isCreate) {
            return (
              <motion.button
                key={itemScreen}
                onClick={() => navigate(itemScreen)}
                aria-label={label}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#f3d9a8] to-[#c98f4a] text-[#241505] shadow-[0_10px_32px_-8px_rgba(232,181,115,0.75)] ring-1 ring-inset ring-white/50"
              >
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-lumia-gold/40 blur-lg" />
                <Icon size={24} strokeWidth={2.25} />
              </motion.button>
            );
          }

          return (
            <button
              key={itemScreen}
              onClick={() => navigate(itemScreen)}
              aria-label={label}
              className="relative flex h-12 w-14 flex-col items-center justify-center gap-1 rounded-2xl"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl bg-white/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={2}
                className={cn(
                  "relative transition-colors duration-300",
                  isActive ? "text-lumia-gold drop-shadow-[0_0_6px_rgba(232,181,115,0.55)]" : "text-lumia-ink-faint"
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
