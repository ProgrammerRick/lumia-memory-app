import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Edit3, Trash2, Calendar, Tag, Smile } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { FadeIn } from '@/components/animated/FadeIn';
import { useMemories } from '@/contexts/MemoryContext';
import { getMoodById, getCategoryById, formatRelativeDate } from '@/lib/constants';
import { cn } from '@/utils/cn';

interface MemoryDetailScreenProps {
  memoryId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDeleted: () => void;
}

export function MemoryDetailScreen({ memoryId, onBack, onEdit, onDeleted }: MemoryDetailScreenProps) {
  const { getById, toggleFav, removeMemory } = useMemories();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const memory = useMemo(() => getById(memoryId), [memoryId, getById]);

  if (!memory) {
    return (
      <Container>
        <Header
          title="Memória"
          leftAction={
            <motion.button whileTap={{ scale: 0.9 }} onClick={onBack} className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          }
          transparent
        />
        <div className="flex items-center justify-center py-20">
          <p className="text-text-muted">Memória não encontrada</p>
        </div>
      </Container>
    );
  }

  const mood = getMoodById(memory.mood);
  const category = getCategoryById(memory.category);
  const formattedDate = new Date(memory.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 300));
    removeMemory(memoryId);
    setIsDeleting(false);
    setShowDeleteDialog(false);
    onDeleted();
  };

  return (
    <>
      <Container withNavSpace={false}>
        <Header
          leftAction={
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          }
          rightAction={
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFav(memoryId)}
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer',
                memory.favorite ? 'text-rose-400 bg-rose-500/10' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              )}
            >
              <Heart className={cn('w-5 h-5', memory.favorite && 'fill-current')} />
            </motion.button>
          }
          transparent
        />

        {/* Hero Section */}
        <FadeIn delay={0.05}>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative rounded-3xl overflow-hidden mb-6"
            style={{
              background: `linear-gradient(135deg, ${memory.color}33, ${memory.color}11, transparent)`,
            }}
          >
            <div className="flex flex-col items-center justify-center py-14 px-6">
              {/* Animated emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <span className="text-7xl block">{memory.emoji}</span>
              </motion.div>

              {/* Decorative rings */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/[0.04]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/[0.03]"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.05, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.15}>
          <h1
            className="text-2xl font-display font-bold text-text-primary mb-2 leading-snug"
          >
            {memory.title}
          </h1>
        </FadeIn>

        {/* Date */}
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-sm text-text-secondary capitalize">{formattedDate}</span>
            <span className="text-xs text-text-muted">· {formatRelativeDate(memory.date)}</span>
          </div>
        </FadeIn>

        {/* Meta Tags */}
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap gap-2 mb-6">
            {mood && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-elevated border border-white/[0.06]">
                <Smile className="w-3 h-3 text-text-muted" />
                <span className="text-xs text-text-secondary">{mood.emoji} {mood.label}</span>
              </div>
            )}
            {category && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-elevated border border-white/[0.06]">
                <Tag className="w-3 h-3 text-text-muted" />
                <span className="text-xs text-text-secondary">{category.emoji} {category.label}</span>
              </div>
            )}
            {memory.favorite && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span className="text-xs text-rose-300">Favorita</span>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Description */}
        {memory.description && (
          <FadeIn delay={0.3}>
            <Card variant="glass" padding="lg" className="mb-6">
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {memory.description}
              </p>
            </Card>
          </FadeIn>
        )}

        {/* Actions */}
        <FadeIn delay={0.35}>
          <div className="flex gap-3 pb-8">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              icon={<Edit3 className="w-4 h-4" />}
              onClick={() => onEdit(memoryId)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              size="md"
              fullWidth
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Excluir
            </Button>
          </div>
        </FadeIn>
      </Container>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Excluir memória?"
        message="Esta ação não pode ser desfeita. Esta memória será perdida para sempre."
        confirmLabel={isDeleting ? 'Excluindo...' : 'Excluir'}
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
