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
      transition={{ duration: 0.3 }}
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between px-5 py-3',
        !transparent && 'glass-strong',
        className
      )}
    >
      <div className="w-10 flex justify-start">{leftAction}</div>
      <div className="flex-1 text-center">
        {title && (
          <h1 className="text-sm font-semibold text-text-primary tracking-wide">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-[10px] text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="w-10 flex justify-end">{rightAction}</div>
    </motion.header>
  );
}
