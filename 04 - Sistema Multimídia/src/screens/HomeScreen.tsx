import { ImageOff, Plus, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { IconButton } from "../components/ui/IconButton";
import { Button } from "../components/ui/Button";
import { MemoryCard } from "../components/memories/MemoryCard";
import { useNavigation } from "../context/NavigationContext";
import { useMemories } from "../context/MemoriesContext";

function useGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Boa madrugada";
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

const RECENT_COUNT = 4;

/**
 * Tela Home — ponto de partida diário do usuário.
 *
 * Sem memórias: mostra um estado vazio elegante com atalho para criar a
 * primeira memória. Com memórias: mostra a contagem total e as últimas
 * memórias guardadas, com acesso rápido para criar uma nova.
 */
export function HomeScreen() {
  const greeting = useGreeting();
  const { navigate } = useNavigation();
  const { memories } = useMemories();

  const recent = memories.slice(0, RECENT_COUNT);
  const hasMemories = memories.length > 0;

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow={greeting}
        title="Suas memórias"
        subtitle={
          hasMemories
            ? `${memories.length} ${memories.length === 1 ? "memória guardada" : "memórias guardadas"}`
            : "Tudo o que você guardar vai aparecer aqui."
        }
        action={
          <IconButton onClick={() => navigate("settings")} aria-label="Ajustes">
            <Settings size={19} />
          </IconButton>
        }
      />

      {!hasMemories && (
        <EmptyState
          icon={<ImageOff size={26} />}
          title="Ainda não há memórias"
          description="Quando você criar sua primeira memória, ela vai brilhar bem aqui."
          action={
            <Button
              variant="primary"
              icon={<Plus size={16} />}
              onClick={() => navigate("create")}
            >
              Criar primeira memória
            </Button>
          }
        />
      )}

      {hasMemories && (
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              variant="glass"
              fullWidth
              icon={<Plus size={17} />}
              onClick={() => navigate("create")}
            >
              Guardar um novo momento
            </Button>
          </motion.div>

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
            <button
              onClick={() => navigate("timeline")}
              className="self-center text-[13px] font-medium text-lumia-gold/90 transition-colors hover:text-lumia-gold"
            >
              Ver linha do tempo completa
            </button>
          )}
        </div>
      )}
    </div>
  );
}
