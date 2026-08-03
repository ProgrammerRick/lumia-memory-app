import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { ScreenContainer } from "../components/ScreenContainer";
import { MemoryCard } from "../components/MemoryCard";
import { EmptyState } from "../components/EmptyState";
import { useMemories } from "../hooks/useMemories";
import { getYear } from "../utils/date";
import { staggerContainer, staggerItem } from "../animations/variants";

export function TimelineScreen() {
  const { memories, isLoading, removeMemory } = useMemories();

  const groups = memories.reduce<Record<string, typeof memories>>(
    (acc, memory) => {
      const year = String(getYear(memory.occurredAt));
      acc[year] = acc[year] ? [...acc[year], memory] : [memory];
      return acc;
    },
    {},
  );
  const years = Object.keys(groups).sort((a, b) => Number(b) - Number(a));

  return (
    <ScreenContainer className="pb-32 pt-14">
      <motion.div variants={staggerItem} initial="initial" animate="animate">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#F5C177]">
          Sua jornada
        </p>
        <h1
          className="mt-1 text-[28px] font-semibold text-[#F8F4EE]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Linha do tempo
        </h1>
      </motion.div>

      {years.length === 0 && !isLoading ? (
        <EmptyState
          icon={<Clock size={26} />}
          title="Sua linha do tempo está vazia"
          description="Cada memória que você guardar aparecerá aqui, organizada no tempo."
        />
      ) : (
        <div className="mt-6">
          {years.map((year) => (
            <div key={year} className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="text-[20px] font-semibold text-[#F8F4EE]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {year}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {groups[year].map((memory) => (
                  <MemoryCard
                    key={memory.id}
                    memory={memory}
                    onDelete={removeMemory}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      )}
    </ScreenContainer>
  );
}
