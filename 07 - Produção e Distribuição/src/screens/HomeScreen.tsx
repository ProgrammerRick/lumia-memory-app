import { Sparkles, PlusCircle } from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { MemoryCard } from "../components/memories/MemoryCard";
import { MemoryCardSkeleton } from "../components/memories/MemoryCardSkeleton";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";

/** Tela inicial: saudação, resumo rápido e memórias recentes. */
export function HomeScreen() {
  const { memories, isReady } = useMemories();
  const { navigate } = useNavigation();
  const recentMemories = memories.slice(0, 5);

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
      <ScreenHeader
        eyebrow="Lumia"
        title="Suas memórias"
        subtitle="Um lugar quieto para tudo o que você não quer esquecer."
        leading={<Logo size="sm" animated={false} />}
      />

      <GlassCard className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-lumia-ink-faint">Guardadas até hoje</p>
          <p className="mt-1 font-serif text-3xl text-lumia-ink">{memories.length}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lumia-gold/10">
          <Sparkles className="h-5 w-5 text-lumia-gold" aria-hidden="true" />
        </div>
      </GlassCard>

      <Button className="mt-4 w-full" onClick={() => navigate("create")}>
        <PlusCircle className="h-4 w-4" aria-hidden="true" />
        Guardar uma nova memória
      </Button>

      <div className="mt-8 flex-1">
        <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
          Recentes
        </h2>

        {!isReady ? (
          <div className="flex flex-col gap-3">
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
          </div>
        ) : recentMemories.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Nenhuma memória ainda"
            description="Guarde sua primeira lembrança e ela aparecerá aqui, sempre à mão."
            action={
              <Button variant="glass" onClick={() => navigate("create")}>
                Criar minha primeira memória
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {recentMemories.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={index}
                onClick={() => navigate("memory-detail", { memoryId: memory.id })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
