import { Filter, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animated/FadeIn';
import { StaggerChildren, StaggerItem } from '@/components/animated/StaggerChildren';
import { cn } from '@/utils/cn';

interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  month: string;
  description: string;
  mood: string;
  emoji: string;
}

const timelineData: Record<string, TimelineEntry[]> = {
  'Janeiro 2025': [
    {
      id: '1',
      title: 'Pôr do sol na praia',
      date: '15',
      month: 'Jan',
      description: 'Um momento mágico assistindo o sol se despedir.',
      mood: 'calm',
      emoji: '🌊',
    },
    {
      id: '2',
      title: 'Primeiro dia do ano',
      date: '01',
      month: 'Jan',
      description: 'Novos começos e muita esperança.',
      mood: 'happy',
      emoji: '✨',
    },
  ],
  'Dezembro 2024': [
    {
      id: '3',
      title: 'Natal em família',
      date: '25',
      month: 'Dez',
      description: 'A mesa cheia e o coração também.',
      mood: 'love',
      emoji: '🎄',
    },
    {
      id: '4',
      title: 'Aniversário da mamãe',
      date: '22',
      month: 'Dez',
      description: 'Reunião especial com todos os que mais amo.',
      mood: 'love',
      emoji: '❤️',
    },
  ],
  'Novembro 2024': [
    {
      id: '5',
      title: 'Trilha na montanha',
      date: '10',
      month: 'Nov',
      description: 'Alcançamos o topo depois de 4 horas.',
      mood: 'adventure',
      emoji: '🏔️',
    },
  ],
};

const moodLineColors: Record<string, string> = {
  calm: 'bg-sky-400',
  happy: 'bg-amber-400',
  love: 'bg-rose-400',
  adventure: 'bg-emerald-400',
};

export function TimelineScreen() {
  return (
    <Container>
      <Header
        title="Timeline"
        rightAction={
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer">
            <Filter className="w-4 h-4" />
          </button>
        }
        transparent
      />

      {/* Month Filter Pills */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 mt-3 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {['Todos', 'Jan', 'Dez', 'Nov', 'Out'].map((month, i) => (
            <button
              key={month}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer',
                i === 0
                  ? 'bg-lumia-500 text-night-950'
                  : 'bg-surface-elevated text-text-muted border border-white/[0.06] hover:border-white/[0.12]'
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Timeline */}
      <div className="relative">
        {Object.entries(timelineData).map(([monthYear, entries], groupIndex) => (
          <div key={monthYear} className="mb-8">
            {/* Month Header */}
            <FadeIn delay={0.15 + groupIndex * 0.1}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {monthYear}
                </h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-text-muted">
                  {entries.length} {entries.length === 1 ? 'memória' : 'memórias'}
                </span>
              </div>
            </FadeIn>

            {/* Timeline Entries */}
            <StaggerChildren staggerDelay={0.08} initialDelay={0.2 + groupIndex * 0.1}>
              <div className="space-y-3 pl-4">
                {entries.map((entry) => (
                  <StaggerItem key={entry.id}>
                    <div className="flex gap-3">
                      {/* Timeline line and dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'w-2.5 h-2.5 rounded-full flex-shrink-0 mt-4',
                            moodLineColors[entry.mood] || 'bg-text-muted'
                          )}
                        />
                        <div className="w-px flex-1 bg-white/[0.06] mt-1" />
                      </div>

                      {/* Entry Card */}
                      <Card
                        variant="default"
                        padding="sm"
                        hoverable
                        className="flex-1 mb-1"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-surface-glass border border-white/[0.06] flex items-center justify-center text-lg flex-shrink-0">
                            {entry.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-semibold text-text-primary truncate">
                                {entry.title}
                              </h4>
                              <span className="text-[10px] text-text-muted flex-shrink-0">
                                {entry.date} {entry.month}
                              </span>
                            </div>
                            <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>
          </div>
        ))}
      </div>
    </Container>
  );
}
