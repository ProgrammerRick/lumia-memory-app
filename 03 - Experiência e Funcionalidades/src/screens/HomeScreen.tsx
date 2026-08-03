import { motion } from 'framer-motion';
import { Search, Bell, Plus, Sparkles, BookOpen } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MemoryCard } from '@/components/ui/MemoryCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { FadeIn } from '@/components/animated/FadeIn';
import { StaggerChildren, StaggerItem } from '@/components/animated/StaggerChildren';
import { LumiaLogo, LumiaWordmark } from '@/components/brand/LumiaLogo';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

// Sample memories for visual demonstration
const sampleMemories = [
  {
    id: '1',
    title: 'Pôr do sol na praia',
    date: '15 de Janeiro, 2025',
    description: 'Um momento mágico assistindo o sol se despedir do dia na praia.',
    mood: 'calm' as const,
    imageUrl: '/images/hero-memories.jpg',
  },
  {
    id: '2',
    title: 'Aniversário da família',
    date: '22 de Dezembro, 2024',
    description: 'Reunião especial com todos os que mais amo.',
    mood: 'love' as const,
  },
  {
    id: '3',
    title: 'Trilha na montanha',
    date: '10 de Novembro, 2024',
    description: 'Alcançamos o topo depois de horas de caminhada.',
    mood: 'adventure' as const,
  },
  {
    id: '4',
    title: 'Café da manhã perfeito',
    date: '5 de Outubro, 2024',
    description: 'Acordar cedo teve sua recompensa nesse dia.',
    mood: 'happy' as const,
  },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const hasMemories = true; // Show sample memories for visual demo

  return (
    <Container>
      {/* Custom Header */}
      <FadeIn delay={0} direction="down">
        <div className="flex items-center justify-between pt-4 pb-2 safe-top">
          <div className="flex items-center gap-3">
            <LumiaLogo size="sm" animated={false} />
            <LumiaWordmark size="sm" />
          </div>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all duration-200 cursor-pointer">
              <Search className="w-5 h-5" strokeWidth={1.8} />
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all duration-200 cursor-pointer relative">
              <Bell className="w-5 h-5" strokeWidth={1.8} />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-lumia-400" />
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Greeting Section */}
      <FadeIn delay={0.15} direction="up">
        <div className="mt-6 mb-6">
          <p className="text-sm text-text-muted mb-1">Olá! 👋</p>
          <h2
            className="text-2xl font-bold text-text-primary"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Suas memórias
          </h2>
        </div>
      </FadeIn>

      {/* Quick Stats Card */}
      <FadeIn delay={0.25} direction="up">
        <Card variant="gradient" padding="md" className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-text-muted mb-1">Total de memórias</p>
              <p className="text-3xl font-bold text-text-primary">
                {sampleMemories.length}
              </p>
              <p className="text-xs text-text-muted mt-1">
                <span className="text-lumia-400">+2</span> este mês
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl bg-lumia-500/10 border border-lumia-500/20 flex items-center justify-center"
            >
              <Sparkles className="w-7 h-7 text-lumia-400" />
            </motion.div>
          </div>
        </Card>
      </FadeIn>

      {/* Create New Memory CTA */}
      <FadeIn delay={0.35} direction="up">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onNavigate('create')}
          className="mb-8 p-4 rounded-2xl border border-dashed border-lumia-500/30 bg-lumia-500/5 flex items-center gap-4 cursor-pointer group transition-all duration-300 hover:border-lumia-500/50 hover:bg-lumia-500/10"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-lumia-500 to-lumia-400 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
            <Plus className="w-5 h-5 text-night-950" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
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
      <FadeIn delay={0.4} direction="up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text-primary">
            Recentes
          </h3>
          <button
            onClick={() => onNavigate('timeline')}
            className="text-xs text-lumia-400 font-medium hover:text-lumia-300 transition-colors cursor-pointer"
          >
            Ver todas
          </button>
        </div>
      </FadeIn>

      {hasMemories ? (
        <StaggerChildren staggerDelay={0.08} initialDelay={0.45}>
          <div className="grid grid-cols-2 gap-3">
            {sampleMemories.map((memory) => (
              <StaggerItem key={memory.id}>
                <MemoryCard
                  title={memory.title}
                  date={memory.date}
                  description={memory.description}
                  mood={memory.mood}
                  imageUrl={memory.imageUrl}
                />
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      ) : (
        <EmptyState
          icon={
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-violet-400" />
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
