import { motion } from "framer-motion";
import {
  User,
  Palette,
  Bell,
  Lock,
  ShieldCheck,
  Info,
  HelpCircle,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { useMemories } from "../context/MemoriesContext";

interface SettingsItem {
  icon: LucideIcon;
  label: string;
  hint?: string;
}

interface SettingsGroup {
  title: string;
  items: SettingsItem[];
}

/**
 * Tela de Ajustes — estrutura de grupos de configurações.
 * Nesta etapa, os itens ainda não possuem funcionalidade real (fora de
 * escopo do Sistema de Memórias), exceto pelo contador dinâmico de
 * memórias guardadas em "Sobre".
 */
export function SettingsScreen() {
  const { memories } = useMemories();

  const groups: SettingsGroup[] = [
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
      items: [
        { icon: Lock, label: "Privacidade" },
        { icon: ShieldCheck, label: "Backup local" },
      ],
    },
    {
      title: "Sobre",
      items: [
        { icon: Info, label: "Memórias guardadas", hint: String(memories.length) },
        { icon: HelpCircle, label: "Ajuda e suporte" },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-10">
      <ScreenHeader eyebrow="Preferências" title="Ajustes" subtitle="Cuide do seu espaço pessoal." />

      <div className="flex flex-col gap-7 px-6">
        {groups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 * groupIndex, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-2.5 px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
              {group.title}
            </p>
            <GlassCard className="overflow-hidden !p-0">
              {group.items.map(({ icon: Icon, label, hint }, index) => (
                <motion.div
                  key={label}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.035)" }}
                  transition={{ duration: 0.2 }}
                  className={`group flex cursor-pointer items-center gap-3.5 px-4 py-3.5 ${
                    index !== group.items.length - 1 ? "border-b border-white/[0.06]" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-lumia-ink-muted transition-colors group-hover:text-lumia-gold">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <span className="flex-1 text-[14.5px] text-lumia-ink">{label}</span>
                  {hint && <span className="text-[13px] text-lumia-ink-faint">{hint}</span>}
                  <ChevronRight
                    size={16}
                    className="text-lumia-ink-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-lumia-ink-muted"
                  />
                </motion.div>
              ))}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
