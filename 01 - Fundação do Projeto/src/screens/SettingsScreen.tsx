import { motion } from "framer-motion";
import { User, Palette, Bell, Lock, Info, ChevronRight } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";

const SETTINGS_GROUPS = [
  {
    title: "Conta",
    items: [{ icon: User, label: "Perfil" }],
  },
  {
    title: "Preferências",
    items: [
      { icon: Palette, label: "Aparência" },
      { icon: Bell, label: "Notificações" },
    ],
  },
  {
    title: "Segurança",
    items: [{ icon: Lock, label: "Privacidade" }],
  },
  {
    title: "Sobre",
    items: [{ icon: Info, label: "Sobre o Lumia" }],
  },
];

/**
 * Tela Configurações — estrutura visual pronta para futuras opções reais.
 * Nenhum item é funcional nesta fase.
 */
export function SettingsScreen() {
  return (
    <div className="flex h-full flex-col overflow-y-auto pb-8">
      <ScreenHeader title="Ajustes" subtitle="Personalize sua experiência no Lumia." />

      <div className="flex flex-col gap-7 px-6">
        {SETTINGS_GROUPS.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 * groupIndex, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-2.5 px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
              {group.title}
            </p>
            <GlassCard className="overflow-hidden">
              {group.items.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-3.5 px-4 py-3.5 ${
                    index !== group.items.length - 1 ? "border-b border-white/[0.06]" : ""
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-lumia-ink-muted">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <span className="flex-1 text-[14.5px] text-lumia-ink">{label}</span>
                  <ChevronRight size={16} className="text-lumia-ink-faint" />
                </div>
              ))}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <p className="mt-auto pt-8 text-center text-[12px] text-lumia-ink-faint">
        Lumia — versão 0.1.0
      </p>
    </div>
  );
}
