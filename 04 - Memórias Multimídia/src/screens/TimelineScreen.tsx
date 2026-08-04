import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Search, Heart, X } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animated/FadeIn';
import { StaggerChildren, StaggerItem } from '@/components/animated/StaggerChildren';
import { useMemories } from '@/contexts/MemoryContext';
import { getMoodById, formatRelativeDate, categories } from '@/lib/constants';
import { cn } from '@/utils/cn';
import type { Memory, CategoryType } from '@/types/memory';

interface TimelineScreenProps {
  onNavigate: (tab: string) => void;
  onOpenMemory: (id: string) => void;
}

type FilterType = 'all' | 'favorites' | CategoryType;

function groupMemoriesByMonth(memories: Memory[]): Record<string, Memory[]> {
  const groups: Record<string, Memory[]> = {};
  
  memories.forEach((memory) => {
    const date = new Date(memory.date);
    const key = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    if (!groups[capitalizedKey]) groups[capitalizedKey] = [];
    groups[capitalizedKey].push(memory);
  });

  return groups;
}

export function TimelineScreen({ onNavigate, onOpenMemory }: TimelineScreenProps) {
  const { memories } = useMemories();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredMemories = useMemo(() => {
    let result = [...memories];

    // Apply filter
    if (activeFilter === 'favorites') {
      result = result.filter((m) => m.favorite);
    } else if (activeFilter !== 'all') {
      result = result.filter((m) => m.category === activeFilter);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    // Sort by date descending
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [memories, activeFilter, searchQuery]);

  const groupedMemories = useMemo(() => groupMemoriesByMonth(filteredMemories), [filteredMemories]);

  const filters: { id: FilterType; label: string; emoji?: string }[] = [
    { id: 'all', label: 'Todas' },
    { id: 'favorites', label: 'Favoritas', emoji: '❤️' },
    ...categories.map((c) => ({ id: c.id as FilterType, label: c.label, emoji: c.emoji })),
  ];

  return (
    <Container>
      <Header
        title="Timeline"
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSearch(!showSearch)}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer",
              showSearch ? "text-lumia-400 bg-lumia-500/10" : "text-text-muted hover:text-text-primary hover:bg-white/5"
            )}
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </motion.button>
        }
        transparent
      />

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <input
              type="text"
              placeholder="Buscar memórias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full bg-surface-elevated border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-lumia-500/40 focus:ring-1 focus:ring-lumia-500/20 transition-all"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none -mx-5 px-5">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0',
                activeFilter === filter.id
                  ? 'bg-lumia-500/15 text-lumia-400 border border-lumia-500/30'
                  : 'bg-surface-elevated text-text-muted border border-white/[0.06] hover:border-white/10'
              )}
            >
              {filter.emoji && <span className="text-sm">{filter.emoji}</span>}
              {filter.label}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* Timeline Content */}
      {filteredMemories.length === 0 ? (
        <EmptyState
          icon={
            <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center">
              <Clock className="w-8 h-8 text-text-muted" />
            </div>
          }
          title={
            activeFilter !== 'all' || searchQuery
              ? 'Nenhuma memória encontrada'
              : 'Sua timeline está vazia'
          }
          description={
            activeFilter !== 'all' || searchQuery
              ? 'Tente alterar os filtros ou a busca'
              : 'Crie sua primeira memória e ela aparecerá aqui'
          }
          action={
            !searchQuery && activeFilter === 'all' ? (
              <Button
                variant="primary"
                onClick={() => onNavigate('create')}
              >
                Criar memória
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedMemories).map(([monthYear, monthMemories], groupIndex) => (
            <FadeIn key={monthYear} delay={groupIndex * 0.05}>
              {/* Month Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-lumia-400 animate-glow-pulse" />
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{monthYear}</h3>
                  <p className="text-[10px] text-text-muted">
                    {monthMemories.length} {monthMemories.length === 1 ? 'memória' : 'memórias'}
                  </p>
                </div>
              </div>

              {/* Timeline Entries */}
              <StaggerChildren staggerDelay={0.06} className="space-y-3 ml-1">
                {monthMemories.map((memory) => {
                  const mood = getMoodById(memory.mood);
                  
                  return (
                    <StaggerItem key={memory.id}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOpenMemory(memory.id)}
                        className="relative flex gap-3 cursor-pointer group"
                      >
                        {/* Timeline line and dot */}
                        <div className="flex flex-col items-center pt-1">
                          <div
                            className="w-3 h-3 rounded-full border-2 shrink-0 transition-all duration-300 group-hover:scale-125"
                            style={{
                              borderColor: memory.color || mood?.color || '#FFAA3E',
                              backgroundColor: `${memory.color || mood?.color || '#FFAA3E'}33`,
                            }}
                          />
                          <div className="w-px flex-1 bg-white/[0.06] mt-1" />
                        </div>

                        {/* Entry Card */}
                        <div className="flex-1 pb-4">
                          <div className="bg-surface-card border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.12] transition-all duration-300 group-hover:shadow-card">
                            <div className="flex items-start gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                                style={{
                                  background: `linear-gradient(135deg, ${memory.color || '#FFAA3E'}22, ${memory.color || '#FFAA3E'}11)`,
                                }}
                              >
                                {memory.emoji}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="text-sm font-semibold text-text-primary truncate">
                                    {memory.title}
                                  </h4>
                                  {memory.favorite && (
                                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 shrink-0" />
                                  )}
                                </div>
                                <p className="text-[11px] text-text-muted mt-0.5">
                                  {new Date(memory.date).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                  {' · '}
                                  {formatRelativeDate(memory.date)}
                                </p>
                              </div>
                            </div>
                            
                            {memory.description && (
                              <p className="text-xs text-text-muted mt-2.5 line-clamp-2 leading-relaxed ml-[52px]">
                                {memory.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </FadeIn>
          ))}
        </div>
      )}
    </Container>
  );
}
