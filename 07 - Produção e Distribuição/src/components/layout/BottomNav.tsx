import { motion } from "framer-motion";
import { Home, PlusCircle, Clock, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigation } from "../../context/NavigationContext";
import { TAB_SCREENS, type TabScreen } from "../../types/navigation";
import { cn } from "../../utils/cn";

const TAB_META: Record<TabScreen, { label: string; icon: LucideIcon }> = {
  home: { label: "Início", icon: Home },
  create: { label: "Criar", icon: PlusCircle },
  timeline: { label: "Linha do tempo", icon: Clock },
  settings: { label: "Ajustes", icon: Settings },
};

/** Navegação inferior fixa, presente nas telas principais do app. */
export function BottomNav() {
  const { screen, navigate } = useNavigation();

  return (
    <nav
      aria-label="Navegação principal"
      className="glass-panel-strong relative z-10 mx-4 mb-4 flex items-center justify-around rounded-full px-2 py-2 shadow-[var(--shadow-lumia-soft)]"
    >
      {TAB_SCREENS.map((tab) => {
        const { label, icon: Icon } = TAB_META[tab];
        const isActive = screen === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => navigate(tab)}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-1 flex-col items-center gap-1 rounded-full px-2 py-2"
          >
            {isActive && (
              <motion.div
                layoutId="bottom-nav-active"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 rounded-full bg-white/[0.08]"
              />
            )}
            <Icon
              className={cn(
                "relative h-5 w-5 transition-colors",
                isActive ? "text-lumia-gold" : "text-lumia-ink-faint",
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "relative text-[10px] font-medium transition-colors",
                isActive ? "text-lumia-gold" : "text-lumia-ink-faint",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
