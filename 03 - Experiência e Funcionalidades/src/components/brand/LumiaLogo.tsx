import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface LumiaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { container: 'w-8 h-8', icon: 'w-4 h-4' },
  md: { container: 'w-12 h-12', icon: 'w-6 h-6' },
  lg: { container: 'w-16 h-16', icon: 'w-8 h-8' },
  xl: { container: 'w-24 h-24', icon: 'w-12 h-12' },
};

export function LumiaLogo({
  size = 'md',
  animated = true,
  className,
}: LumiaLogoProps) {
  const content = (
    <>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20" />
      <svg
        className={cn('relative z-10 text-night-950', sizes[size].icon)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8 6 4 10 4 14a8 8 0 0016 0c0-4-4-8-8-12z" />
        <path d="M12 12c-1 1.5-2 3-2 4a2 2 0 004 0c0-1-1-2.5-2-4z" fill="currentColor" />
      </svg>
    </>
  );

  const baseClasses = cn(
    'relative rounded-2xl flex items-center justify-center',
    'bg-gradient-to-br from-lumia-500 via-lumia-400 to-lumia-300',
    'shadow-glow-md',
    sizes[size].container,
    className
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 } as any}
        className={baseClasses}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

export function LumiaWordmark({
  className,
  size = 'md',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <span
      className={cn(
        'font-display font-bold tracking-tight text-gradient-lumia',
        textSizes[size],
        className
      )}
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      Lumia
    </span>
  );
}
