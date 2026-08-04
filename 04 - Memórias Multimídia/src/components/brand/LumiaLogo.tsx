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
    <svg
      className={sizes[size].icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L12 6" />
      <path d="M12 18L12 22" />
      <path d="M4.93 4.93L7.76 7.76" />
      <path d="M16.24 16.24L19.07 19.07" />
      <path d="M2 12L6 12" />
      <path d="M18 12L22 12" />
      <path d="M4.93 19.07L7.76 16.24" />
      <path d="M16.24 7.76L19.07 4.93" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );

  const baseClasses = cn(
    'relative rounded-2xl flex items-center justify-center text-night-950',
    'bg-gradient-to-br from-lumia-500 via-lumia-400 to-lumia-300',
    'shadow-glow-md',
    sizes[size].container,
    className
  );

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
        'font-display font-bold text-gradient-lumia',
        textSizes[size],
        className
      )}
    >
      Lumia
    </span>
  );
}
