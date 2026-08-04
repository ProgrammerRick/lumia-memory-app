import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ScreenHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

/** Cabeçalho padrão de tela: rótulo opcional, título serifado e subtítulo. */
export function ScreenHeader({ eyebrow, title, subtitle, leading, trailing, className }: ScreenHeaderProps) {
  return (
    <header className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex items-start gap-3">
        {leading}
        <div>
          {eyebrow && (
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-lumia-ink-faint">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-2xl leading-tight text-lumia-ink">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-lumia-ink-muted">{subtitle}</p>}
        </div>
      </div>
      {trailing}
    </header>
  );
}
