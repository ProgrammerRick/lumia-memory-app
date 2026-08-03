import { Moon, Bell, Shield, HelpCircle, Heart, ChevronRight, Smartphone, Palette, Info } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animated/FadeIn';
import { LumiaLogo, LumiaWordmark } from '@/components/brand/LumiaLogo';
import { cn } from '@/utils/cn';

interface SettingItem {
  icon: typeof Moon;
  label: string;
  description?: string;
  value?: string;
  color: string;
}

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

const settingsGroups: SettingGroup[] = [
  {
    title: 'Aparência',
    items: [
      {
        icon: Moon,
        label: 'Tema escuro',
        description: 'Ativado',
        color: 'bg-violet-500/10 text-violet-400',
      },
      {
        icon: Palette,
        label: 'Cor de destaque',
        description: 'Âmbar',
        color: 'bg-lumia-500/10 text-lumia-400',
      },
    ],
  },
  {
    title: 'Notificações',
    items: [
      {
        icon: Bell,
        label: 'Lembretes',
        description: 'Desativado',
        color: 'bg-sky-500/10 text-sky-400',
      },
    ],
  },
  {
    title: 'Privacidade',
    items: [
      {
        icon: Shield,
        label: 'Proteção por senha',
        description: 'Desativado',
        color: 'bg-emerald-500/10 text-emerald-400',
      },
      {
        icon: Smartphone,
        label: 'Armazenamento',
        description: 'Apenas local',
        color: 'bg-blue-500/10 text-blue-400',
      },
    ],
  },
  {
    title: 'Sobre',
    items: [
      {
        icon: HelpCircle,
        label: 'Central de ajuda',
        color: 'bg-text-muted/10 text-text-muted',
      },
      {
        icon: Heart,
        label: 'Avaliar o Lumia',
        color: 'bg-rose-500/10 text-rose-400',
      },
      {
        icon: Info,
        label: 'Versão',
        value: '0.2.0',
        color: 'bg-text-muted/10 text-text-muted',
      },
    ],
  },
];

export function SettingsScreen() {
  return (
    <Container>
      <Header title="Ajustes" transparent />

      {/* Profile Area */}
      <FadeIn delay={0.1}>
        <Card variant="gradient" padding="lg" className="mt-4 mb-6">
          <div className="flex flex-col items-center text-center">
            <LumiaLogo size="lg" animated={false} className="mb-3" />
            <LumiaWordmark size="sm" />
            <p className="text-xs text-text-muted mt-2">
              Suas memórias, sempre com você
            </p>
          </div>
        </Card>
      </FadeIn>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <FadeIn key={group.title} delay={0.15 + groupIndex * 0.08}>
            <div>
              <h3 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 px-1">
                {group.title}
              </h3>
              <Card variant="default" padding="none">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer',
                        'hover:bg-white/[0.02] transition-colors',
                        itemIndex < group.items.length - 1 &&
                          'border-b border-white/[0.04]'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          item.color
                        )}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <span className="flex-1 text-sm text-text-primary text-left">
                        {item.label}
                      </span>
                      {item.value ? (
                        <span className="text-xs text-text-muted">
                          {item.value}
                        </span>
                      ) : item.description ? (
                        <>
                          <span className="text-xs text-text-muted">
                            {item.description}
                          </span>
                          <ChevronRight className="w-4 h-4 text-text-muted/50" />
                        </>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-text-muted/50" />
                      )}
                    </button>
                  );
                })}
              </Card>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Footer */}
      <FadeIn delay={0.6}>
        <div className="text-center py-8 mt-4">
          <p className="text-xs text-text-muted">
            Feito com <span className="text-rose-400">♥</span> para suas memórias
          </p>
          <p className="text-[10px] text-text-muted/50 mt-1">
            Lumia v0.2.0
          </p>
        </div>
      </FadeIn>
    </Container>
  );
}
