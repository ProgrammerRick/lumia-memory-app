import { motion } from "framer-motion";

/**
 * Placeholder de carregamento com a mesma silhueta do `MemoryCard`.
 *
 * Adicionado na Etapa 5 (Experiência de Uso) para dar uma sensação de
 * carregamento elegante nas telas que dependem de dados locais, sem
 * introduzir nenhuma cor, raio ou espaçamento fora do Design System já
 * existente — reaproveita exatamente as mesmas dimensões do `MemoryCard`.
 */
export function MemoryCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-panel flex gap-3.5 overflow-hidden rounded-3xl p-3"
      aria-hidden
    >
      <div className="h-20 w-20 shrink-0 animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
        <div className="h-2.5 w-16 animate-pulse rounded-full bg-white/[0.06]" />
        <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />
        <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-white/[0.06]" />
      </div>
    </motion.div>
  );
}
