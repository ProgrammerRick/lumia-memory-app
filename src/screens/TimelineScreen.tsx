import { Clock } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import { MemoryCard } from "../components/memories/MemoryCard";
import { MemoryCardSkeleton } from "../components/memories/MemoryCardSkeleton";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { groupMemoriesByMonth } from "../utils/date";

/** Linha do tempo completa, com memórias agrupadas por mês/ano. */
export function TimelineScreen() {
  const { memories, isReady } = useMemories();
  const { navigate } = useNavigation();
  const groups = groupMemoriesByMonth(memories);

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
      <ScreenHeader
        eyebrow="Linha do tempo"
        title="Sua história"
        subtitle="Cada momento guardado, em ordem, do mais recente ao mais antigo."
      />

      <div className="mt-8 flex-1">
        {!isReady ? (
          <div className="flex flex-col gap-3">
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
          </div>
        ) : groups.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="Sua linha do tempo está vazia"
            description="Assim que você guardar memórias, elas aparecerão aqui organizadas por mês."
            action={
              <Button variant="glass" onClick={() => navigate("create")}>
                Guardar uma memória
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-8">
            {groups.map((group) => (
              <div key={group.key}>
                <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
                  {group.label}
                </h2>
                <div className="flex flex-col gap-3">
                  {group.memories.map((memory, index) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      index={index}
                      onClick={() => navigate("memory-detail", { memoryId: memory.id })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
