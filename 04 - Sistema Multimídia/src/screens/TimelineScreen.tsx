import { motion } from "framer-motion";
import { History } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { MemoryCard } from "../components/memories/MemoryCard";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { groupMemoriesByMonth } from "../utils/date";

/**
 * Tela Timeline — linha do tempo cronológica real das memórias guardadas,
 * agrupadas por mês/ano, da mais recente para a mais antiga.
 */
export function TimelineScreen() {
  const { memories } = useMemories();
  const { navigate } = useNavigation();
  const groups = groupMemoriesByMonth(memories);

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow="Sua jornada"
        title="Linha do tempo"
        subtitle="Cada memória, um instante guardado no tempo."
      />

      {memories.length === 0 && (
        <EmptyState
          icon={<History size={26} />}
          title="Sua linha do tempo está esperando"
          description="O primeiro momento que você guardar vai marcar o início da sua história aqui."
        />
      )}

      {memories.length > 0 && (
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 pb-10">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: groupIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <p className="px-1 text-[12px] font-medium capitalize tracking-[0.1em] text-lumia-gold/80">
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
