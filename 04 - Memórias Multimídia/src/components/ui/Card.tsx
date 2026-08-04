import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

type CardVariant = 'default' | 'glass' | 'elevated' | 'gradient';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface-card border border-white/[0.06] shadow-card',
  glass: 'glass',
  elevated: 'bg-surface-elevated border border-white/[0.08] shadow-elevated',
  gradient:
    'bg-gradient-to-br from-violet-900/40 to-night-900/60 border border-violet-500/10 shadow-card',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-6 sm:p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, scale: 1.01 } : undefined}
      whileTap={hoverable ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'rounded-2xl overflow-hidden',
        variantStyles[variant],
        paddingStyles[padding],
        hoverable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
