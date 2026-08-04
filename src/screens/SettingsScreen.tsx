import { ChevronRight, RefreshCcw, ShieldCheck, Heart, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KeyboardEvent } from "react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { useNavigation } from "../context/NavigationContext";
import { useToast } from "../context/ToastContext";
import { resetOnboarding } from "../utils/onboarding";

interface SettingsItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

function SettingsItem({ icon: Icon, title, description, onClick }: SettingsItemProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${onClick ? "cursor-pointer transition-colors hover:bg-white/[0.04]" : ""}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
        <Icon className="h-4 w-4 text-lumia-gold" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-lumia-ink">{title}</p>
        <p className="text-xs text-lumia-ink-muted">{description}</p>
      </div>
      {onClick && <ChevronRight className="h-4 w-4 text-lumia-ink-faint" aria-hidden="true" />}
    </div>
  );
}

/** Ajustes do app: privacidade, apresentação inicial e informações do produto. */
export function SettingsScreen() {
  const { navigate } = useNavigation();
  const { showToast } = useToast();

  function handleReviewOnboarding() {
    resetOnboarding();
    showToast("Você verá a apresentação inicial na próxima vez.", "success");
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
      <ScreenHeader eyebrow="Lumia" title="Ajustes" subtitle="Seu espaço, do seu jeito." />

      <GlassCard className="mt-6 flex flex-col divide-y divide-white/[0.06]">
        <SettingsItem
          icon={RefreshCcw}
          title="Rever apresentação inicial"
          description="Ver novamente as boas-vindas do Lumia."
          onClick={handleReviewOnboarding}
        />
        <SettingsItem
          icon={ShieldCheck}
          title="Privacidade"
          description="Todas as suas memórias ficam só neste dispositivo."
        />
        <SettingsItem
          icon={Heart}
          title="Sobre o Lumia"
          description="Um santuário pessoal para memórias importantes."
          onClick={() => navigate("welcome")}
        />
        <SettingsItem icon={Info} title="Versão" description="Etapa 6 — Refinamento e qualidade" />
      </GlassCard>
    </div>
  );
}
