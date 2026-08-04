/** Placeholder de carregamento com a mesma silhueta do MemoryCard. */
export function MemoryCardSkeleton() {
  return (
    <div className="glass-panel flex animate-pulse gap-4 rounded-3xl p-4">
      <div className="h-20 w-20 shrink-0 rounded-2xl bg-white/[0.06]" />
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-3 w-16 rounded-full bg-white/[0.06]" />
        <div className="h-4 w-3/4 rounded-full bg-white/[0.06]" />
        <div className="h-3 w-1/2 rounded-full bg-white/[0.06]" />
      </div>
    </div>
  );
}
