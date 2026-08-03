import { motion } from "framer-motion";
import { Home, Clock, Plus, Settings } from "lucide-react";
import { useNavigation } from "./NavigationContext";
import type { AppRoute } from "../types/navigation";

const TABS: { route: AppRoute; label: string; icon: typeof Home }[] = [
  { route: "Home", label: "Início", icon: Home },
  { route: "Timeline", label: "Linha do tempo", icon: Clock },
  { route: "CreateMemory", label: "Criar", icon: Plus },
  { route: "Settings", label: "Ajustes", icon: Settings },
];

export function BottomTabBar() {
  const { activeTab, navigate } = useNavigation();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/8 bg-[#120C22]/95 px-4 pb-6 pt-2 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {TABS.map(({ route, label, icon: Icon }) => {
          const isActive = activeTab === route;
          const isCreate = route === "CreateMemory";

          if (isCreate) {
            return (
              <motion.button
                key={route}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate(route)}
                aria-label={label}
                className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_25px_rgba(242,166,90,0.45)]"
                style={{
                  background:
                    "linear-gradient(135deg, #F7D9A3 0%, #F2A65A 60%, #E8879A 100%)",
                }}
              >
                <Icon size={24} className="text-[#1D1633]" strokeWidth={2.5} />
              </motion.button>
            );
          }

          return (
            <button
              key={route}
              onClick={() => navigate(route)}
              className="flex flex-col items-center gap-1 px-3 py-1"
              aria-label={label}
            >
              <Icon
                size={20}
                strokeWidth={2}
                className={isActive ? "text-[#F5C177]" : "text-[#726C8A]"}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-[#F5C177]" : "text-[#726C8A]"
                }`}
              >
                {label === "Criar" ? "" : label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-dot"
                  className="h-1 w-1 rounded-full bg-[#F5C177]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
