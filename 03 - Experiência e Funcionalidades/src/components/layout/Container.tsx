import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  withNavSpace?: boolean;
}

export function Container({
  children,
  className,
  padded = true,
  withNavSpace = true,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'min-h-screen w-full max-w-lg mx-auto',
        padded && 'px-4',
        withNavSpace && 'pb-24',
        className
      )}
    >
      {children}
    </div>
  );
}
