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
        'mx-auto w-full max-w-lg',
        padded && 'px-5',
        withNavSpace && 'pb-28',
        className
      )}
    >
      {children}
    </div>
  );
}
