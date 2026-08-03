import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
  transparent = false,
  className,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'sticky top-0 z-50 safe-top',
        'flex items-center justify-between px-4 py-3',
        !transparent && 'glass-strong',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-[40px]">
        {leftAction}
      </div>
      <div className="flex-1 text-center">
        {title && (
          <h1 className="text-base font-semibold text-text-primary truncate">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3 min-w-[40px] justify-end">
        {rightAction}
      </div>
    </motion.header>
  );
}
