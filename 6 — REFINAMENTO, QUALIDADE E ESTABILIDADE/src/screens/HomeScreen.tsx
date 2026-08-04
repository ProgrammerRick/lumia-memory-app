import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { MemoryCard } from "../components/memories/MemoryCard";
import { MemoryCardSkeleton } from "../components/memories/MemoryCardSkeleton";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";

const RECENT_COUNT = 4;

/**
 * Tela inicial do Lumia.
 * Mostra um estado vazio elegante quando não há memórias, ou a contagem
 * total guardada, um atalho rápido para criar uma nova e as últimas
 * memórias registradas.
 *
 * Desde a Etapa 5, exibe um breve estado de carregamento (`MemoryCardSkeleton`)
 * enquanto os dados locais são preparados, evitando qualquer "piscada" para
 * o estado vazio.
 */
export function HomeScreen() {
  const { memories, isReady } = useMemories();
  const { navigate } = useNavigation();
  const recent = memories.slice(0, RECENT_COUNT);

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow="Seu espaço"
        title="Olá."
        subtitle={
          memories.length > 0
            ? `Você guarda ${memories.length} ${memories.length === 1 ? "memória" : "memórias"} aqui.`
            : "Este é o começo do seu álbum de memórias."
        }
        action={
          <Button
            variant="glass"
            className="!px-4 !py-2.5 !text-[13px]"
            icon={<Plus size={15} />}
            onClick={() => navigate("create")}
          >
            Nova
          </Button>
        }
      />

      {!isReady ? (
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8">
          <div className="flex flex-col gap-3">
            <div className="h-3 w-28 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="flex flex-col gap-3">
              <MemoryCardSkeleton />
              <MemoryCardSkeleton />
              <MemoryCardSkeleton />
            </div>
          </div>
        </div>
      ) : memories.length === 0 ? (
        <EmptyState
          icon={<Sparkles size={24} strokeWidth={1.75} />}
          title="Nenhuma memória ainda"
          description="Guarde a primeira foto, vídeo, áudio ou lembrança e comece seu álbum pessoal."
          action={
            <Button variant="primary" icon={<Plus size={16} />} onClick={() => navigate("create")}>
              Guardar memória
            </Button>
          }
        />
      ) : (
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8">
          <div className="flex flex-col gap-3">
            <p className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
              Últimas memórias
            </p>
            <div className="flex flex-col gap-3">
              {recent.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onClick={() => navigate("memory-detail", { memoryId: memory.id })}
                />
              ))}
            </div>
          </div>

          {memories.length > RECENT_COUNT && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={() => navigate("timeline")}
              className="mx-auto text-[13px] font-medium text-lumia-gold"
            >
              Ver toda a linha do tempo →
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
