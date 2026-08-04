import { motion } from "framer-motion";
import { Clock, Plus } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { MemoryCard } from "../components/memories/MemoryCard";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { groupMemoriesByMonth } from "../utils/date";

/**
 * Linha do tempo completa — todas as memórias guardadas, agrupadas por
 * mês/ano (mais recentes primeiro), com um marcador visual de linha do
 * tempo ao lado de cada cartão.
 */
export function TimelineScreen() {
  const { memories } = useMemories();
  const { navigate } = useNavigation();
  const groups = groupMemoriesByMonth(memories);

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader eyebrow="Sua história" title="Linha do tempo" subtitle="Todos os seus momentos, em ordem." />

      {memories.length === 0 ? (
        <EmptyState
          icon={<Clock size={24} strokeWidth={1.75} />}
          title="Sua linha do tempo está vazia"
          description="Cada memória guardada vai aparecer aqui, organizada por mês."
          action={
            <Button variant="primary" icon={<Plus size={16} />} onClick={() => navigate("create")}>
              Guardar memória
            </Button>
          }
        />
      ) : (
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 pb-8">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * groupIndex, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <p className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
                {group.label}
              </p>
              <div className="relative flex flex-col gap-3 border-l border-white/[0.08] pl-4">
                {group.memories.map((memory, index) => (
                  <div key={memory.id} className="relative">
                    <span className="absolute -left-[21px] top-6 h-2 w-2 rounded-full bg-lumia-gold shadow-[0_0_8px_rgba(232,181,115,0.7)]" />
                    <MemoryCard
                      memory={memory}
                      index={index}
                      onClick={() => navigate("memory-detail", { memoryId: memory.id })}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
