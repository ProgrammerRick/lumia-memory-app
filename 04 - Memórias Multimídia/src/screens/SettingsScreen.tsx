import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Shield,
  Info,
  Heart,
  Trash2,
  Download,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { FadeIn } from '@/components/animated/FadeIn';
import { StaggerChildren, StaggerItem } from '@/components/animated/StaggerChildren';
import { LumiaLogo, LumiaWordmark } from '@/components/brand/LumiaLogo';
import { useMemories } from '@/contexts/MemoryContext';
import { getMemoryStats } from '@/lib/storage';

export function SettingsScreen() {
  const { memories, refreshMemories } = useMemories();
  const stats = useMemo(() => getMemoryStats(), [memories]);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  const handleExport = () => {
    const data = JSON.stringify(memories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumia-memorias-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAll = () => {
    localStorage.removeItem('lumia_memories');
    refreshMemories();
    setShowDeleteAll(false);
  };

  interface SettingItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    description?: string;
    iconColor: string;
    iconBg: string;
    action?: () => void;
    trailing?: React.ReactNode;
  }

  const settingsGroups: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Dados',
      items: [
        {
          icon: Download,
          label: 'Exportar memórias',
          description: `${stats.total} memórias salvas`,
          iconColor: 'text-emerald-400',
          iconBg: 'bg-emerald-500/10',
          action: handleExport,
        },
        {
          icon: Trash2,
          label: 'Apagar todas as memórias',
          description: 'Esta ação não pode ser desfeita',
          iconColor: 'text-red-400',
          iconBg: 'bg-red-500/10',
          action: () => setShowDeleteAll(true),
        },
      ],
    },
    {
      title: 'Aparência',
      items: [
        {
          icon: Palette,
          label: 'Tema escuro',
          description: 'Ativo por padrão',
          iconColor: 'text-violet-400',
          iconBg: 'bg-violet-500/10',
          trailing: (
            <div className="w-10 h-6 rounded-full bg-lumia-500/30 border border-lumia-500/40 flex items-center justify-end px-0.5">
              <div className="w-5 h-5 rounded-full bg-lumia-400 shadow-glow-sm" />
            </div>
          ),
        },
      ],
    },
    {
      title: 'Privacidade',
      items: [
        {
          icon: Shield,
          label: 'Seus dados são locais',
          description: 'Nenhum dado é enviado para a internet',
          iconColor: 'text-sky-400',
          iconBg: 'bg-sky-500/10',
        },
      ],
    },
    {
      title: 'Sobre',
      items: [
        {
          icon: Info,
          label: 'Lumia Memory App',
          description: 'Versão 0.3',
          iconColor: 'text-lumia-400',
          iconBg: 'bg-lumia-500/10',
        },
        {
          icon: Heart,
          label: 'Feito com amor',
          description: 'Para preservar suas memórias',
          iconColor: 'text-rose-400',
          iconBg: 'bg-rose-500/10',
        },
      ],
    },
  ];

  return (
    <Container>
      <Header title="Ajustes" transparent />

      {/* App Identity */}
      <FadeIn delay={0.05}>
        <div className="flex flex-col items-center py-6 mb-4">
          <LumiaLogo size="lg" className="mb-3" />
          <LumiaWordmark size="md" className="mb-1" />
          <p className="text-xs text-text-muted flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Suas memórias, para sempre
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <Card variant="glass" padding="md" className="mb-6">
          <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
            <div className="text-center px-2">
              <p className="text-lg font-bold text-text-primary">{stats.total}</p>
              <p className="text-[10px] text-text-muted">Memórias</p>
            </div>
            <div className="text-center px-2">
              <p className="text-lg font-bold text-lumia-400">{stats.favorites}</p>
              <p className="text-[10px] text-text-muted">Favoritas</p>
            </div>
            <div className="text-center px-2">
              <p className="text-lg font-bold text-violet-400">{stats.thisMonth}</p>
              <p className="text-[10px] text-text-muted">Este mês</p>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Settings Groups */}
      <StaggerChildren staggerDelay={0.06} initialDelay={0.15} className="space-y-6">
        {settingsGroups.map((group) => (
          <StaggerItem key={group.title}>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-1">
              {group.title}
            </h3>
            <Card variant="default" padding="none">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    whileTap={item.action ? { backgroundColor: 'rgba(255,255,255,0.03)' } : undefined}
                    onClick={item.action}
                    className={`flex items-center gap-3 px-4 py-3.5 ${
                      i > 0 ? 'border-t border-white/[0.04]' : ''
                    } ${item.action ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                      {item.description && (
                        <p className="text-[11px] text-text-muted mt-0.5">{item.description}</p>
                      )}
                    </div>
                    {'trailing' in item && item.trailing ? (
                      item.trailing
                    ) : item.action ? (
                      <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                    ) : null}
                  </motion.div>
                );
              })}
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Footer */}
      <FadeIn delay={0.5}>
        <p className="text-center text-[10px] text-text-muted/50 mt-8 mb-4">
          Lumia Memory App v0.3 · Todos os dados armazenados localmente
        </p>
      </FadeIn>

      <ConfirmDialog
        isOpen={showDeleteAll}
        title="Apagar todas as memórias?"
        message="Esta ação é irreversível. Todas as suas memórias serão permanentemente excluídas."
        confirmLabel="Apagar tudo"
        variant="danger"
        onConfirm={handleDeleteAll}
        onCancel={() => setShowDeleteAll(false)}
      />
    </Container>
  );
}
