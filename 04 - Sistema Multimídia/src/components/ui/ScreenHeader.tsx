import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScreenHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  leading?: ReactNode;
}

/**
 * Cabeçalho padrão das telas internas: rótulo pequeno + título grande
 * + subtítulo opcional, com entrada suave (fade + slide).
 *
 * `leading` foi adicionado na Etapa 3 para permitir um botão de voltar
 * antes do eyebrow (usado pela tela de detalhe da memória), sem afetar
 * as telas que não precisam dele.
 */
export function ScreenHeader({ eyebrow, title, subtitle, action, leading }: ScreenHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start justify-between gap-4 px-6 pb-8 pt-4"
    >
      <div>
        {leading}
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-gold/80">
            <span className="h-[3px] w-[3px] rounded-full bg-lumia-gold/70" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-[32px] leading-tight text-lumia-ink">{title}</h1>
        {subtitle && (
          <p className="mt-2 max-w-[280px] text-[15px] leading-relaxed text-lumia-ink-muted">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  );
}
