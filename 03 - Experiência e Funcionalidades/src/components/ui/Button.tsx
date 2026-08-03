import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'glow';
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
    'bg-gradient-to-r from-lumia-500 to-lumia-400 text-night-950 font-semibold shadow-glow-sm hover:shadow-glow-md active:scale-[0.97]',
  secondary:
    'bg-surface-elevated text-text-primary border border-white/10 hover:border-white/20 hover:bg-white/10 active:scale-[0.97]',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 active:scale-[0.97]',
  outline:
    'bg-transparent border border-lumia-500/40 text-lumia-400 hover:bg-lumia-500/10 hover:border-lumia-500/60 active:scale-[0.97]',
  glow:
    'bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold shadow-glow-violet hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] active:scale-[0.97]',
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
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-250 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-lumia-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950',
          'disabled:opacity-50 disabled:pointer-events-none',
          'cursor-pointer select-none',
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
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
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
