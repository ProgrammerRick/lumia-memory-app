import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Cloud,
  Download,
  Heart,
  Lock,
  Moon,
  Palette,
  Shield,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useMemories } from "../context/MemoriesContext";
import { useToast } from "../context/ToastContext";
import { useState } from "react";
import { LUMIA_ONBOARDING_KEY } from "../utils/onboarding";

interface SettingsItem {
  icon: typeof Bell;
  label: string;
  hint?: string;
  onClick?: () => void;
}

interface SettingsGroup {
  title: string;
  items: SettingsItem[];
}

/**
 * Tela de configurações — nesta fase, exibe grupos de preferências
 * visuais/estéticas (sem lógica real de conta, nuvem ou notificações,
 * conforme o escopo do produto). Serve como vitrine de preferências
 * futuras.
 *
 * Na Etapa 5, ganhou a opção "Rever apresentação inicial", que apenas
 * limpa a marca local de onboarding concluído — uma pequena melhoria de
 * experiência, sem nenhuma lógica de conta ou nuvem.
 */
export function SettingsScreen() {
  const { memories } = useMemories();
  const { showToast } = useToast();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleReplayOnboarding = () => {
    try {
      window.localStorage.removeItem(LUMIA_ONBOARDING_KEY);
      showToast("Apresentação inicial será exibida novamente.", "success");
    } catch {
      showToast("Não foi possível concluir essa ação.", "error");
    }
    setConfirmResetOpen(false);
  };

  const groups: SettingsGroup[] = [
    {
      title: "Espaço pessoal",
      items: [
        { icon: Sparkles, label: "Memórias guardadas", hint: `${memories.length}` },
        { icon: Palette, label: "Aparência", hint: "Crepúsculo" },
        { icon: Moon, label: "Tema escuro", hint: "Sempre ativo" },
      ],
    },
    {
      title: "Privacidade",
      items: [
        { icon: Lock, label: "Bloqueio do app" },
        { icon: Shield, label: "Privacidade dos dados" },
        { icon: Cloud, label: "Backup em nuvem", hint: "Em breve" },
      ],
    },
    {
      title: "Sobre",
      items: [
        { icon: Bell, label: "Notificações" },
        { icon: Download, label: "Exportar memórias" },
        {
          icon: RotateCcw,
          label: "Rever apresentação inicial",
          onClick: () => setConfirmResetOpen(true),
        },
        { icon: Heart, label: "Sobre o Lumia" },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow="Preferências"
        title="Ajustes"
        subtitle="Cuide do seu espaço pessoal."
      />

      <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-6 pb-8">
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
              {group.items.map(({ icon: Icon, label, hint, onClick }, index) => (
                <motion.div
                  key={label}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.035)" }}
                  transition={{ duration: 0.2 }}
                  role={onClick ? "button" : undefined}
                  tabIndex={onClick ? 0 : undefined}
                  onClick={onClick}
                  onKeyDown={
                    onClick
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onClick();
                          }
                        }
                      : undefined
                  }
                  className={`flex cursor-pointer items-center gap-3.5 px-4 py-3.5 ${
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

      <ConfirmDialog
        open={confirmResetOpen}
        title="Rever a apresentação inicial?"
        description="Na próxima vez que você abrir o Lumia a partir da tela de entrada, a apresentação será exibida novamente."
        confirmLabel="Rever"
        cancelLabel="Agora não"
        onConfirm={handleReplayOnboarding}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
}
