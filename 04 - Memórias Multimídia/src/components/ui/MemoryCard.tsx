import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Memory } from '@/types/memory';

interface MemoryCardProps {
  memory: Memory;
  onClick?: () => void;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  className?: string;
  compact?: boolean;
}

const moodGradients: Record<string, string> = {
  happy: 'from-amber-500/20 to-orange-500/10',
  love: 'from-rose-500/20 to-pink-500/10',
  calm: 'from-sky-500/20 to-blue-500/10',
  adventure: 'from-emerald-500/20 to-teal-500/10',
  nostalgic: 'from-violet-500/20 to-purple-500/10',
  grateful: 'from-lumia-500/20 to-amber-500/10',
};

export function MemoryCard({
  memory,
  onClick,
  onToggleFavorite,
  className,
  compact = false,
}: MemoryCardProps) {
  const formattedDate = new Date(memory.date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const gradient = moodGradients[memory.mood] || moodGradients.calm;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative rounded-2xl overflow-hidden cursor-pointer group',
        'bg-surface-card border border-white/[0.06]',
        'hover:border-white/[0.12] hover:shadow-elevated transition-all duration-300',
        className
      )}
      onClick={onClick}
    >
      {/* Gradient Header */}
      <div
        className={cn(
          'relative bg-gradient-to-br',
          gradient,
          compact ? 'h-20' : 'h-28',
          'flex items-center justify-center'
        )}
        style={memory.color ? {
          background: `linear-gradient(135deg, ${memory.color}22, ${memory.color}11)`,
        } : undefined}
      >
        <motion.span
          className={cn(compact ? 'text-3xl' : 'text-4xl')}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          {memory.emoji}
        </motion.span>
        
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(e);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all"
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-all duration-300',
                memory.favorite
                  ? 'fill-rose-400 text-rose-400 scale-110'
                  : 'text-white/60 hover:text-white'
              )}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className={cn(compact ? 'p-3' : 'p-4')}>
        <h3 className={cn(
          'font-semibold text-text-primary truncate',
          compact ? 'text-sm' : 'text-base'
        )}>
          {memory.title}
        </h3>

        {!compact && memory.description && (
          <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
            {memory.description}
          </p>
        )}

        <div className="flex items-center gap-1.5 mt-2">
          <Calendar className="w-3 h-3 text-text-muted" />
          <span className="text-[11px] text-text-muted">{formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
