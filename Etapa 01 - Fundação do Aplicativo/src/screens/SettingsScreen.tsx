import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CloudOff,
  Crown,
  Info,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { useMemories } from "../hooks/useMemories";
import { staggerItem } from "../animations/variants";

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#726C8A]">
        {title}
      </p>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {children}
      </div>
    </div>
  );
}

function SettingsRow({
  icon,
  label,
  description,
  badge,
  onPress,
  danger,
}: {
  icon: ReactNode;
  label: string;
  description?: string;
  badge?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onPress}
      disabled={!onPress}
      className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3.5 text-left last:border-b-0 disabled:opacity-90"
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          danger ? "bg-[#E8879A]/15 text-[#E8879A]" : "bg-white/8 text-[#F5C177]"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`text-[14px] font-medium ${
            danger ? "text-[#E8879A]" : "text-[#F8F4EE]"
          }`}
        >
          {label}
        </p>
        {description && (
          <p className="mt-0.5 text-[12px] text-[#8A83A0]">{description}</p>
        )}
      </div>
      {badge && (
        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#B9A6E0]">
          {badge}
        </span>
      )}
    </button>
  );
}

export function SettingsScreen() {
  const { memories, clearAll } = useMemories();
  const [confirming, setConfirming] = useState(false);

  const handleClear = async () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    await clearAll();
    setConfirming(false);
  };

  return (
    <ScreenContainer className="pb-32 pt-14">
      <motion.div variants={staggerItem} initial="initial" animate="animate">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#F5C177]">
          Seu espaço
        </p>
        <h1
          className="mt-1 text-[28px] font-semibold text-[#F8F4EE]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Ajustes
        </h1>
      </motion.div>

      <div className="mt-6">
        <SettingsSection title="Armazenamento local">
          <SettingsRow
            icon={<CloudOff size={17} />}
            label="Dados guardados neste dispositivo"
            description={`${memories.length} ${
              memories.length === 1 ? "memória" : "memórias"
            } salvas offline`}
          />
          <SettingsRow
            icon={<Trash2 size={17} />}
            label={confirming ? "Toque novamente para confirmar" : "Apagar todas as memórias"}
            description="Essa ação não pode ser desfeita"
            onPress={handleClear}
            danger
          />
        </SettingsSection>

        <SettingsSection title="Em breve">
          <SettingsRow
            icon={<User size={17} />}
            label="Conta e backup na nuvem"
            description="Sincronize suas memórias entre aparelhos"
            badge="Em breve"
          />
          <SettingsRow
            icon={<Crown size={17} />}
            label="Lumia Premium"
            description="Recursos exclusivos para sua jornada"
            badge="Em breve"
          />
        </SettingsSection>

        <SettingsSection title="Sobre">
          <SettingsRow icon={<Info size={17} />} label="Versão do app" badge="0.1.0" />
          <SettingsRow
            icon={<Shield size={17} />}
            label="Privacidade"
            description="100% offline. Nada sai deste dispositivo."
          />
        </SettingsSection>
      </div>
    </ScreenContainer>
  );
}
