import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, BookOpen, Heart, TrendingUp } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MemoryCard } from '@/components/ui/MemoryCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { FadeIn } from '@/components/animated/FadeIn';
import { StaggerChildren, StaggerItem } from '@/components/animated/StaggerChildren';
import { LumiaLogo } from '@/components/brand/LumiaLogo';
import { useMemories } from '@/contexts/MemoryContext';
import { getDailyQuote, getMemoryStats, getMemoriesOnThisDay } from '@/lib/storage';
import { getGreeting, getMoodById } from '@/lib/constants';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  onOpenMemory: (id: string) => void;
}

export function HomeScreen({ onNavigate, onOpenMemory }: HomeScreenProps) {
  const { memories, toggleFav } = useMemories();
  const stats = useMemo(() => getMemoryStats(), [memories]);
  const quote = useMemo(() => getDailyQuote(), []);
  const onThisDay = useMemo(() => getMemoriesOnThisDay(), [memories]);
  const recentMemories = useMemo(() => memories.slice(0, 4), [memories]);
  const favoriteMemory = useMemo(() => memories.find((m) => m.favorite), [memories]);
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <Container>
      {/* Custom Header */}
      <FadeIn>
        <div className="flex items-center justify-between py-4">
          <LumiaLogo size="sm" />
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate('timeline')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </FadeIn>

      {/* Greeting Section */}
      <FadeIn delay={0.1}>
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-text-primary">
            {greeting}! 👋
          </h1>
          <p className="text-sm text-text-secondary mt-1">Suas memórias</p>
        </div>
      </FadeIn>

      {/* Daily Emotional Quote — Creative Feature #1 */}
      <FadeIn delay={0.15}>
        <Card variant="gradient" padding="md" className="mb-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Sparkles className="w-4 h-4 text-lumia-400" />
            </div>
            <div>
              <p className="text-sm text-text-primary italic leading-relaxed font-display">
                "{quote.text}"
              </p>
              <p className="text-xs text-text-muted mt-2">— {quote.author}</p>
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* On This Day — Creative Feature #2 */}
      {onThisDay.length > 0 && (
        <FadeIn delay={0.2}>
          <Card variant="glass" padding="md" className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📅</span>
              <h3 className="text-sm font-semibold text-lumia-400">Nesta data...</h3>
            </div>
            {onThisDay.map((memory) => (
              <motion.div
                key={memory.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenMemory(memory.id)}
                className="flex items-center gap-3 py-2 cursor-pointer hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
              >
                <span className="text-xl">{memory.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{memory.title}</p>
                  <p className="text-xs text-text-muted">
                    {new Date(memory.date).getFullYear()}
                  </p>
                </div>
              </motion.div>
            ))}
          </Card>
        </FadeIn>
      )}

      {/* Quick Stats Card */}
      {stats.total > 0 && (
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card variant="glass" padding="sm" className="text-center">
              <p className="text-xl font-bold text-text-primary">{stats.total}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Memórias</p>
            </Card>
            <Card variant="glass" padding="sm" className="text-center">
              <p className="text-xl font-bold text-lumia-400">{stats.thisMonth}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Este mês</p>
            </Card>
            <Card variant="glass" padding="sm" className="text-center">
              <p className="text-xl font-bold text-rose-400">{stats.favorites}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Favoritas</p>
            </Card>
          </div>
        </FadeIn>
      )}

      {/* Highlighted Favorite — Creative Feature #3 */}
      {favoriteMemory && (
        <FadeIn delay={0.25}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Memória em destaque
              </h3>
            </div>
            <Card
              variant="elevated"
              padding="none"
              hoverable
              onClick={() => onOpenMemory(favoriteMemory.id)}
            >
              <div className="flex items-center gap-4 p-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${favoriteMemory.color}33, ${favoriteMemory.color}11)`,
                  }}
                >
                  <span className="text-2xl">{favoriteMemory.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-text-primary truncate">
                    {favoriteMemory.title}
                  </h4>
                  {favoriteMemory.description && (
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                      {favoriteMemory.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-text-muted">
                      {new Date(favoriteMemory.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    {stats.topMood && (
                      <span className="text-[10px] text-text-muted flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {getMoodById(stats.topMood as any)?.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </FadeIn>
      )}

      {/* Create New Memory CTA */}
      <FadeIn delay={0.3}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('create')}
          className="mb-8 p-4 rounded-2xl border border-dashed border-lumia-500/30 bg-lumia-500/5 flex items-center gap-4 cursor-pointer group transition-all duration-300 hover:border-lumia-500/50 hover:bg-lumia-500/10"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-lumia-500 to-lumia-400 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow">
            <Plus className="w-5 h-5 text-night-950" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              Criar nova memória
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Registre um momento especial
            </p>
          </div>
        </motion.div>
      </FadeIn>

      {/* Recent Memories Section */}
      <FadeIn delay={0.35}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-primary">
            Recentes
          </h2>
          {memories.length > 4 && (
            <button
              onClick={() => onNavigate('timeline')}
              className="text-xs text-lumia-400 font-medium hover:text-lumia-300 transition-colors cursor-pointer"
            >
              Ver todas
            </button>
          )}
        </div>
      </FadeIn>

      {memories.length > 0 ? (
        <StaggerChildren staggerDelay={0.08} initialDelay={0.4} className="grid grid-cols-2 gap-3">
          {recentMemories.map((memory) => (
            <StaggerItem key={memory.id}>
              <MemoryCard
                memory={memory}
                compact
                onClick={() => onOpenMemory(memory.id)}
                onToggleFavorite={() => toggleFav(memory.id)}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      ) : (
        <EmptyState
          icon={
            <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-text-muted" />
            </div>
          }
          title="Nenhuma memória ainda"
          description="Comece registrando seu primeiro momento especial"
          action={
            <Button
              variant="primary"
              onClick={() => onNavigate('create')}
              icon={<Plus className="w-4 h-4" />}
            >
              Criar memória
            </Button>
          }
        />
      )}
    </Container>
  );
}
