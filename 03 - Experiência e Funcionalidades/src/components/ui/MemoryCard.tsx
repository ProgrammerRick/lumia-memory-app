import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MemoryCardProps {
  title: string;
  date: string;
  description?: string;
  imageUrl?: string;
  mood?: 'happy' | 'love' | 'calm' | 'adventure';
  className?: string;
  onClick?: () => void;
}

const moodColors = {
  happy: 'from-amber-500/20 to-orange-500/10',
  love: 'from-rose-500/20 to-pink-500/10',
  calm: 'from-sky-500/20 to-blue-500/10',
  adventure: 'from-emerald-500/20 to-teal-500/10',
};

const moodEmojis = {
  happy: '☀️',
  love: '❤️',
  calm: '🌊',
  adventure: '🌿',
};

export function MemoryCard({
  title,
  date,
  description,
  imageUrl,
  mood = 'calm',
  className,
  onClick,
}: MemoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 } as any}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl overflow-hidden cursor-pointer',
        'bg-surface-card border border-white/[0.06]',
        'shadow-card hover:shadow-elevated transition-shadow duration-300',
        className
      )}
    >
      {/* Image or Gradient Header */}
      {imageUrl ? (
        <div className="relative h-36 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
        </div>
      ) : (
        <div
          className={cn(
            'h-24 bg-gradient-to-br',
            moodColors[mood],
            'flex items-center justify-center'
          )}
        >
          <span className="text-3xl">{moodEmojis[mood]}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-semibold text-text-primary line-clamp-1 flex-1">
            {title}
          </h3>
          <Heart className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        </div>
        {description && (
          <p className="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex items-center gap-1.5 text-text-muted">
          <Calendar className="w-3 h-3" strokeWidth={1.5} />
          <span className="text-[11px]">{date}</span>
        </div>
      </div>
    </motion.div>
  );
}
