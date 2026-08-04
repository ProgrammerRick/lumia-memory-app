import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'glow' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-lumia-500 to-lumia-400 text-night-950 font-semibold shadow-glow-sm hover:shadow-glow-md',
  secondary:
    'bg-surface-elevated text-text-primary border border-white/10 hover:border-white/20 hover:bg-white/10',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
  outline:
    'bg-transparent border border-lumia-500/40 text-lumia-400 hover:bg-lumia-500/10 hover:border-lumia-500/60',
  glow:
    'bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold shadow-glow-violet hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-6 text-sm rounded-xl gap-2',
  lg: 'h-13 px-8 text-base rounded-2xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconRight,
      loading,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-lumia-400/50',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="w-4 h-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="opacity-75"
            />
          </svg>
        ) : (
          icon
        )}
        {children}
        {iconRight}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
